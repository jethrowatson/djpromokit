const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        let val = match[2].trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        env[match[1].trim()] = val;
    }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in environment");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    const { data: profiles, error } = await supabase.from('profiles').select('id, username');

    if (error) {
        console.error("Error fetching profiles:", error);
        process.exit(1);
    }

    let count = 0;
    for (const profile of profiles) {
        if (!profile.username) continue;

        const newUsername = profile.username
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-]/g, '')
            .replace(/\-+/g, '-');

        if (newUsername !== profile.username) {
            console.log(`Migrating: "${profile.username}" -> "${newUsername}"`);
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ username: newUsername })
                .eq('id', profile.id);

            if (updateError) {
                console.error(`Failed to update ${profile.username}:`, updateError);
            } else {
                count++;
            }
        }
    }

    console.log(`Successfully migrated ${count} usernames.`);
}

run();
