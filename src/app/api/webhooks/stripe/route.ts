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

        // Using the client reference id as the DJ's profile ID
        const profileId = session.client_reference_id;

        if (profileId) {
            // Initialize a Supabase client with the service role key to bypass RLS
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
            const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
            const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

            // 1. Mark profile as published
            const { error: profileError } = await supabaseAdmin
                .from('profiles')
                .update({ is_published: true })
                .eq('id', profileId);

            if (profileError) {
                console.error('Error updating profile:', profileError);
                return new NextResponse('Database error', { status: 500 });
            }

            // 2. Record payment
            const { error: paymentError } = await supabaseAdmin
                .from('payments')
                .insert({
                    profile_id: profileId,
                    stripe_session_id: session.id,
                    stripe_payment_intent_id: session.payment_intent as string,
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
        }
    }

    return new NextResponse('Success', { status: 200 });
}
