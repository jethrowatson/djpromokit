import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(req: Request) {
    const url = new URL(req.url);
    const username = url.searchParams.get('username');

    if (!username) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('id, public_email, is_published')
        .eq('username', username)
        .single();

    if (!profile) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // If already published, just send them to their public profile
    if (profile.is_published) {
        return NextResponse.redirect(new URL(`/${username}`, req.url));
    }

    // Resolve the internal auth email for receipt
    const { data: { user } } = await supabaseAdmin.auth.admin.getUserById(profile.id);
    const customerEmail = user?.email || profile.public_email || undefined;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: 'DJ Promo Kit - Lifetime Publish',
                            description: 'Publish your EPK publicly and unlock PDF generations forever. No subscriptions.',
                        },
                        unit_amount: 599, 
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${url.origin}/dashboard?success=true`,
            cancel_url: `${url.origin}/${username}`, // Return to the locked preview if they cancel
            customer_email: customerEmail,
            client_reference_id: profile.id, // CRITICAL: This links the webhook back to the user without a cookie!
            metadata: {
                userId: profile.id
            }
        });

        if (session.url) {
            return NextResponse.redirect(session.url);
        }
    } catch (e) {
        console.error("Stripe direct checkout routing error", e);
    }

    // Fallback if Stripe errors
    return NextResponse.redirect(new URL(`/${username}`, req.url));
}
