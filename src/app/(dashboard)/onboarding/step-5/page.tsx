import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Step5Form from "./Step5Form";

export default async function Step5Socials() {
    const supabase = await createClient();

    // Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const { data: profile } = await supabase.from('profiles').select('id').eq('id', user.id).single();

    let existingSocials: Record<string, string> = {};
    if (profile) {
        const { data: links } = await supabase.from('social_links').select('platform, url').eq('profile_id', profile.id);
        if (links) {
            links.forEach(link => {
                existingSocials[link.platform] = link.url;
            });
        }
    }
    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white mb-2">Socials & Links</h1>
                <p className="text-slate-400">Connect your fans and promoters to the rest of your presence online.</p>
            </div>
            <Step5Form existingSocials={existingSocials} />
        </div>
    );
}
