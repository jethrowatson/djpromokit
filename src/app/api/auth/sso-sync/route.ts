import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import jwt from 'jsonwebtoken';

export async function GET() {
    try {
        // 1. Authenticate the user's current session on DJ Promo Kit
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            console.error('[SSO] Unauthorized request');
            return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL || 'https://djpromokit.com'));
        }

        // 2. We use a custom, shared AES/HMAC secret to securely pass the DJ's identity 
        // between the two entirely separate databases. 
        // Both Vercel projects must have this exact same environment variable string!
        const SYNC_SECRET = process.env.SYNCGIGS_BRIDGE_SECRET;

        if (!SYNC_SECRET) {
            console.error('[SSO] Missing SYNCGIGS_BRIDGE_SECRET. Cannot cryptographically sign handoff.');
            return NextResponse.redirect('https://syncgigs.co.uk');
        }

        // 3. Generate the SSO Token Payload
        // We include the user ID and email so SYNCgigs knows exactly who just arrived.
        // It expires in 60 seconds to prevent replay attacks if a link is copied.
        const ssoPayload = {
            sub: user.id,
            email: user.email,
            aud: 'syncgigs_sso',
        };

        const token = jwt.sign(ssoPayload, SYNC_SECRET, { expiresIn: 60 });

        // 4. Redirect strictly to the SYNCgigs Client Catch endpoint with the explicit token param
        const syncgigsCallbackUrl = process.env.NODE_ENV === 'development' 
            ? 'http://localhost:3000/auth/sso' 
            : 'https://syncgigs.co.uk/auth/sso'; 

        const directLink = `${syncgigsCallbackUrl}?token=${token}`;

        return NextResponse.redirect(directLink);

    } catch (error) {
        console.error('[SSO] Unexpected error during SSO handoff', error);
        return NextResponse.redirect('https://syncgigs.co.uk');
    }
}
