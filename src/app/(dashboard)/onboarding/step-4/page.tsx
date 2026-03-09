import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Step4Client from "./Step4Client";

export default async function Step4Bio() {
    const supabase = await createClient();

    // Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    // Fetch Profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('name, location, genres, short_bio, long_bio')
        .eq('id', user.id)
        .single();

    return <Step4Client profile={profile} />;
}
