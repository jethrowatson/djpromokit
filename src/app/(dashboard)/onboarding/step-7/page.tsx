import Link from "next/link";
import { ArrowLeft, Lock, Eye, CreditCard } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import EPKContent, { EPKProfileData } from "@/components/epk/EPKContent";
import CheckoutButton from "@/components/ui/CheckoutButton";

export default async function Step7Preview() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (!profile) {
        // Fallback to step-1 if no profile exists
        redirect('/onboarding/step-1');
    }

    const { data: mediaItems } = await supabase
        .from('media')
        .select('*')
        .eq('profile_id', profile.id);

    const { data: socialLink } = await supabase
        .from('social_links')
        .select('*')
        .eq('profile_id', profile.id)
        .maybeSingle();

    let pressShots: string[] = [];
    let mixes: { title: string; url: string }[] = [];

    if (mediaItems) {
        mediaItems.forEach(item => {
            if (item.type === 'press_shot' && item.url) {
                pressShots.push(item.url);
            }
            if (item.type === 'featured_mix' && item.url) {
                mixes.push({ title: item.title || 'Mix', url: item.url });
            }
        });
    }

    const socials: Record<string, string> = {};
    if (socialLink) {
        if (socialLink.instagram) socials.instagram = socialLink.instagram;
        if (socialLink.soundcloud) socials.soundcloud = socialLink.soundcloud;
        if (socialLink.mixcloud) socials.mixcloud = socialLink.mixcloud;
        if (socialLink.youtube) socials.youtube = socialLink.youtube;
        if (socialLink.spotify) socials.spotify = socialLink.spotify;
        if (socialLink.resident_advisor) socials.ra = socialLink.resident_advisor;
    }

    const profileData: EPKProfileData = {
        username: profile.username,
        name: profile.name,
        location: profile.location,
        genres: profile.genres || [],
        tagline: profile.tagline,
        shortBio: profile.short_bio,
        longBio: profile.long_bio,
        bookingType: profile.booking_type || 'form',
        publicEmail: profile.public_email,
        avatar: profile.avatar_url,
        pressShots,
        mixes,
        socials,
        isPublished: profile.is_published
    };

    return (
        <div className="animate-fade-in">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-white mb-2">You're ready.</h1>
                <p className="text-slate-400">Preview your EPK and publish it to the world.</p>
            </div>

            {/* Live Rendered EPK Preview Card */}
            <div className="glass-panel p-2 rounded-3xl border-white/10 mb-8 relative group overflow-hidden bg-slate-950">
                <div className="w-full h-[500px] overflow-hidden rounded-2xl relative pointer-events-none">
                    {/* Scale down the EPK content so it looks like a mini preview */}
                    <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50">
                        <EPKContent profile={profileData} isDraftMode={true} />
                    </div>
                </div>

                <div className="absolute top-6 right-6 z-30">
                    <Link
                        href={`/${profile.username}?preview=true`}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/80 backdrop-blur text-white text-sm font-bold border border-white/10 hover:bg-slate-800 transition-colors pointer-events-auto shadow-2xl"
                    >
                        <Eye className="w-4 h-4" /> Full Screen Preview
                    </Link>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-slate-900/50 rounded-xl p-6 border border-white/5 shadow-inner">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-slate-400" /> Your Private Link
                    </h3>
                    <div className="flex bg-slate-900 rounded-lg p-3 border border-slate-700">
                        <span className="text-slate-500 font-mono truncate">djpromokit.com/{profile.username}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">This link is disabled until you publish your EPK.</p>
                </div>

                <div className="bg-purple-900/10 rounded-xl p-6 border border-purple-500/20 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Publish for £10.99</h3>
                    <p className="text-slate-300 text-sm mb-6">
                        Pay once. Keep it live forever. Unlock the PDF export and auto-sync with SYNCdj.co.uk.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <CheckoutButton />

                        <Link href="/dashboard" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
                            I'll do this later, take me to dashboard
                        </Link>
                    </div>
                </div>

                <div className="pt-4 flex justify-start">
                    <Link
                        href="/onboarding/step-6"
                        className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Back to Booking
                    </Link>
                </div>
            </div>
        </div>
    );
}
