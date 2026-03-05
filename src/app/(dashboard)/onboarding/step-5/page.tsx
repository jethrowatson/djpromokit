import Link from "next/link";
import { ArrowLeft, ArrowRight, Instagram, Youtube, Link as LinkIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { saveStep5Socials } from "./actions";

export default async function Step5Socials() {
    const supabase = await createClient();

    // Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const { data: profile } = await supabase.from('profiles').select('id').eq('user_id', user.id).single();

    let existingSocials: Record<string, string> = {};
    if (profile) {
        const { data: links } = await supabase.from('social_links').select('platform, url').eq('profile_id', profile.id);
        if (links) {
            links.forEach(link => {
                existingSocials[link.platform] = link.url;
            });
        }
    }
    const socials = [
        { id: "instagram", label: "Instagram", placeholder: "instagram.com/djmarcus", icon: <Instagram className="h-5 w-5 text-slate-500" /> },
        { id: "soundcloud", label: "SoundCloud", placeholder: "soundcloud.com/djmarcus", icon: <LinkIcon className="h-5 w-5 text-slate-500" /> },
        { id: "mixcloud", label: "Mixcloud", placeholder: "mixcloud.com/djmarcus", icon: <LinkIcon className="h-5 w-5 text-slate-500" /> },
        { id: "youtube", label: "YouTube", placeholder: "youtube.com/@djmarcus", icon: <Youtube className="h-5 w-5 text-slate-500" /> },
        { id: "spotify", label: "Spotify Artist", placeholder: "open.spotify.com/artist/...", icon: <LinkIcon className="h-5 w-5 text-slate-500" /> },
        { id: "ra", label: "Resident Advisor", placeholder: "ra.co/dj/marcus", icon: <LinkIcon className="h-5 w-5 text-slate-500" /> },
    ];

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white mb-2">Socials & Links</h1>
                <p className="text-slate-400">Connect your fans and promoters to the rest of your presence online.</p>
            </div>

            <form action={saveStep5Socials} className="space-y-4">
                <p className="text-sm text-slate-500 mb-6">All fields are optional, just fill in the ones you use.</p>

                {socials.map((social) => (
                    <div key={social.id}>
                        <label htmlFor={social.id} className="block text-sm font-medium text-slate-300">
                            {social.label}
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {social.icon}
                            </div>
                            <input
                                type="text"
                                name={social.id}
                                id={social.id}
                                defaultValue={existingSocials[social.id] || ''}
                                className="block w-full pl-10 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm py-3 transition-colors"
                                placeholder={social.placeholder}
                            />
                        </div>
                    </div>
                ))}

                <div className="pt-8 flex justify-between items-center border-t border-white/5 mt-8">
                    <Link
                        href="/onboarding/step-4"
                        className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Back
                    </Link>
                    <div className="flex gap-3">
                        <Link
                            href="/onboarding/step-6"
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
