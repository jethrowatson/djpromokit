import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, ArrowRight, PlayCircle, Info } from "lucide-react";
import { redirect } from "next/navigation";
import { saveStep2Mix } from "./actions";
import MixEmbed from "@/components/ui/MixEmbed";
import Link from "next/link";
import Step2Form from "./Step2Form";

export default async function Step2Mix() {
    const supabase = await createClient();

    // Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    // Fetch Profile Profile ID and then Featured Mix URL
    const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

    let existingMixUrl = '';
    if (profile) {
        const { data: mixData } = await supabase
            .from('media')
            .select('url')
            .eq('profile_id', profile.id)
            .eq('type', 'featured_mix')
            .single();

        if (mixData) {
            existingMixUrl = mixData.url;
        }
    }

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white mb-2">Your Best Mix</h1>
                <p className="text-slate-400">Paste a link to your best mix. We'll embed it right at the top of your EPK.</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border-cyan-500/20 bg-cyan-900/10 mb-8 flex items-start gap-3">
                <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-sm text-cyan-100">
                    Right now, we support links from <strong>SoundCloud, Mixcloud, and YouTube</strong>. The player will be auto-generated.
                </p>
            </div>

            <Step2Form existingMixUrl={existingMixUrl} />
        </div>
    );
}
