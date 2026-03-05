import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase URL or Service Key. Make sure they are set in your environment.");
    process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function publishLatestProfile() {
    console.log("Fetching profiles...");
    const { data: profiles, error: fetchError } = await supabaseAdmin
        .from('profiles')
        .select('id, username, is_published')
        .order('created_at', { ascending: false })
        .limit(1);

    if (fetchError) {
        console.error("Error fetching profiles:", fetchError);
        return;
    }

    if (!profiles || profiles.length === 0) {
        console.log("No profiles found to publish.");
        return;
    }

    const latestProfile = profiles[0];
    console.log(`Setting profile '${latestProfile.username}' to published...`);

    const { error: updateError } = await supabaseAdmin
        .from('profiles')
        .update({ is_published: true })
        .eq('id', latestProfile.id);

    if (updateError) {
        console.error("Failed to publish profile:", updateError);
    } else {
        console.log(`Success! Profile '${latestProfile.username}' is now published and active.`);
    }
}

publishLatestProfile();
