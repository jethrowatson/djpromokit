import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { sendAdminPurchaseAlert } from '@/lib/resend';

// Webhook body is read directly from req.text() in App Router

export async function POST(req: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2025-02-24.acacia' as any,
    });
    const payload = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            payload,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Using the client reference id as the DJ's profile ID, with a fallback to metadata
        const profileId = session.client_reference_id || session.metadata?.userId;

        if (profileId) {
            // Initialize a Supabase client with the service role key to bypass RLS
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
            const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
            const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

            try {
                // 1. Mark profile as published and onboarded
                const { error: profileError } = await supabaseAdmin
                    .from('profiles')
                    .update({ is_published: true, is_onboarded: true })
                    .eq('id', profileId);

                if (profileError) {
                    console.error('Error updating profile with is_onboarded:', profileError);
                    
                    // Fallback: try updating just is_published in case is_onboarded column is missing in production
                    console.log('Attempting fallback update (is_published only)...');
                    const { error: fallbackError } = await supabaseAdmin
                        .from('profiles')
                        .update({ is_published: true })
                        .eq('id', profileId);

                    if (fallbackError) {
                        console.error('Fallback error updating profile:', fallbackError);
                        return new NextResponse('Database error', { status: 500 });
                    }
                }

                // 2. Record payment
                const { error: paymentError } = await supabaseAdmin
                    .from('payments')
                    .insert({
                        profile_id: profileId,
                        stripe_session_id: session.id,
                        stripe_payment_intent_id: session.payment_intent as string || null,
                        amount: session.amount_total,
                        status: 'completed'
                    });

                if (paymentError) {
                    console.error('Error logging payment:', paymentError);
                    // We don't return 500 here since the profile is already published we don't want Stripe retrying
                } else {
                    // Fire non-blocking email alert to admin
                    sendAdminPurchaseAlert({
                        profileId,
                        amount: session.amount_total,
                        currency: session.currency || 'GBP'
                    }).catch(console.error);
                }
            } catch (err) {
                console.error('Unexpected error during webhook database operations:', err);
                return new NextResponse('Internal server error', { status: 500 });
            }
        } else {
            console.error('Webhook received checkout.session.completed but no profileId could be extracted');
            // Return 200 so Stripe doesn't continually retry a malformed session we can't process
        }
    }

    return new NextResponse('Success', { status: 200 });
}
