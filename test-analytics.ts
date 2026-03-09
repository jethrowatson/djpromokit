import { createClient } from '@supabase/supabase-js';

async function test() {
    console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("KEY exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Get a profile ID
    const { data: profile } = await supabaseAdmin.from('profiles').select('id').limit(1).single();
    if (!profile) {
        console.log("No profile found.");
        return;
    }
    console.log("Testing with profile:", profile.id);

    const { error } = await supabaseAdmin.from('analytics').insert({
        profile_id: profile.id,
        event_type: 'page_view',
        source: 'direct',
        event_data: null
    });

    if (error) {
        console.error("Error inserting:", error);
    } else {
        console.log("Insert successful!");

        // Let's verify we can select it
        const { data: analytics } = await supabaseAdmin.from('analytics').select('*').eq('profile_id', profile.id);
        console.log("Analytics rows:", analytics?.length);
    }
}

test();
