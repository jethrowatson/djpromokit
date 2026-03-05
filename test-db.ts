import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function testQuery(username: string) {
    const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('id, public_email, users!inner(email)')
        .eq('username', username)
        .single();

    console.log("Query Result:");
    console.log("Data:", data);
    console.log("Error:", error);
}

testQuery('dj_xxxx'); // Replace with actual known username if possible
