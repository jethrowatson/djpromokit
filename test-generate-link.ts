import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function test() {
    console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
        type: 'magiclink',
        email: 'jethro@bodega.blue',
        options: {
            redirectTo: 'https://syncgigs.co.uk/auth/callback'
        }
    });
    console.log("Error:", error);
    if (data?.properties?.action_link) {
        console.log("Raw Action Link:", data.properties.action_link);
    }
}

test();
