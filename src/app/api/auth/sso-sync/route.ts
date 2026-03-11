import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

export async function GET() {
    try {
        // 1. Authenticate the user's current session on DJ Promo Kit
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user || !user.email) {
            console.error('[SSO] Unauthorized request');
            return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL || 'https://djpromokit.com'));
        }

        // 2. Initialize the Supabase Admin Client
        // We use the Service Role Key here because we are securely generating a Magic Link 
        // behind the scenes without needing the user's actual password.
        const supabaseAdmin = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // 3. Generate a one-time magic link directed to the SYNCgigs callback URL
        const syncgigsCallbackUrl = process.env.NODE_ENV === 'development' 
            ? 'http://localhost:3000/auth/sso' 
            : 'https://syncgigs.co.uk/auth/sso'; // Client component that handles Implicit Flow hash tokens

        const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
            type: 'magiclink',
            email: user.email,
            options: {
                redirectTo: syncgigsCallbackUrl
            }
        });

        if (linkError || !linkData.properties?.action_link) {
            console.error('[SSO] Failed to generate admin magic link', linkError);
            // Fallback to plain URL if SSO fails
            return NextResponse.redirect('https://SYNCgigs.co.uk');
        }

        // 4. Force the redirect_to parameter into the verify endpoint payload
        // Supabase generateLink often natively omits the redirectTo option in the final string, causing fallback to SITE_URL.
        let actionLink = linkData.properties.action_link;
        if (!actionLink.includes('redirect_to=')) {
            actionLink = `${actionLink}&redirect_to=${encodeURIComponent(syncgigsCallbackUrl)}`;
        }

        // 5. Redirect the user's browser directly to the Supabase verification endpoint payload
        // This will securely log them in and bounce them to SYNCgigs.co.uk
        return NextResponse.redirect(actionLink);

    } catch (error) {
        console.error('[SSO] Unexpected error during SSO handoff', error);
        return NextResponse.redirect('https://SYNCgigs.co.uk');
    }
}
