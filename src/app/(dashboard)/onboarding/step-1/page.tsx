import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Step1Form from "./Step1Form";

export default async function Step1Basics() {
    const supabase = await createClient();

    // Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    // Fetch Profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('name, location, genres, tagline')
        .eq('id', user.id)
        .single();
    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white mb-2">The Basics</h1>
                <p className="text-slate-400">Let's start with your core identity. This is what promoters will see first.</p>
            </div>
            <Step1Form profile={profile} />
        </div>
    );
}
