import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, ArrowRight, PlayCircle, Info } from "lucide-react";
import { redirect } from "next/navigation";
import { saveStep2Mix } from "./actions";
import MixEmbed from "@/components/ui/MixEmbed";
import Link from "next/link";

export default async function Step2Mix() {
    const supabase = await createClient();

    // Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    // Fetch Profile Profile ID and then Featured Mix URL
    const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
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

            <form action={saveStep2Mix} className="space-y-6">
                <div>
                    <label htmlFor="mix-link" className="block text-sm font-medium text-slate-300">
                        Mix Link <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <PlayCircle className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            type="url"
                            name="mixLink"
                            id="mixLink"
                            defaultValue={existingMixUrl}
                            className="block w-full pl-10 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm py-3 transition-colors"
                            placeholder="https://soundcloud.com/djmarcus/summer-mix-2024"
                        />
                    </div>
                </div>

                {existingMixUrl && (
                    <div className="mt-6">
                        <span className="text-sm text-slate-500 mb-4 block font-bold uppercase tracking-wider">Current Embed</span>
                        <div className="animate-fade-in shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10">
                            <MixEmbed url={existingMixUrl} />
                        </div>
                    </div>
                )}

                <div className="pt-8 flex justify-between items-center border-t border-white/5">
                    <Link
                        href="/onboarding/step-1"
                        className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Back
                    </Link>
                    <div className="flex gap-3">
                        <Link
                            href="/onboarding/step-3"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                        >
                            Skip
                        </Link>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all hover-glow"
                        >
                            Save and Continue
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
