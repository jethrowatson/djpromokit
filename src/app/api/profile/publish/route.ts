import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
            apiVersion: '2025-02-24.acacia' as any,
        });

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Fetch user's profile to pass ID and check if already published
        const { data: profile } = await supabase
            .from('profiles')
            .select('id, is_published')
            .eq('id', user.id)
            .single();

        if (!profile) {
            return new NextResponse('Profile not found', { status: 404 });
        }

        if (profile.is_published) {
            return new NextResponse('Profile already published', { status: 400 });
        }

        // Create Stripe Checkout Session
        const storeUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: 'payment',
            client_reference_id: profile.id, // We'll use this in the webhook to mark the profile as published
            customer_email: user.email,
            line_items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: 'DJpromokit Publishing Fee',
                            description: 'One-time fee to permanently publish your EPK.',
                        },
                        unit_amount: 599, // £5.99
                    },
                    quantity: 1,
                },
            ],
            success_url: `${storeUrl}/dashboard?payment=success`,
            cancel_url: `${storeUrl}/dashboard?payment=canceled`,
        });

        return NextResponse.json({
            url: checkoutSession.url,
            sessionId: checkoutSession.id
        });

    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
