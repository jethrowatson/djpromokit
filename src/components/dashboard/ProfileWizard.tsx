import { createClient } from "@/lib/supabase/server";
import Step1Form from "@/app/(dashboard)/onboarding/step-1/Step1Form";
import Step2Form from "@/app/(dashboard)/onboarding/step-2/Step2Form";
import ImageUpload from "@/components/ui/ImageUpload";
import { saveProfileAvatar, addPressShot, removePressShot, completeStep3 } from "@/app/(dashboard)/onboarding/step-3/actions";
import Step4Client from "@/app/(dashboard)/onboarding/step-4/Step4Client";
import Step5Form from "@/app/(dashboard)/onboarding/step-5/Step5Form";
import BookingForm from "@/app/(dashboard)/onboarding/step-6/BookingForm";
import EPKContent, { EPKProfileData } from "@/components/epk/EPKContent";
import CheckoutButton from "@/components/ui/CheckoutButton";
import { finishOnboarding } from "@/app/(dashboard)/onboarding/step-7/actions";
import { Eye, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";


export default async function ProfileWizard({ profile, user }: { profile: any, user: any }) {
    const supabase = await createClient();
    const currentStep = profile.onboarding_step || 1;

    // Fetch related media/socials if needed for the current step to avoid massive prop drilling
    let pressShots: any[] = [];
    let featuredMixes: any[] = [];
    let socialLink: any = null;

    if (currentStep >= 2) {
        const { data: media } = await supabase.from('media').select('*').eq('profile_id', profile.id);
        if (media) {
            pressShots = media.filter(m => m.type === 'press_shot');
            featuredMixes = media.filter(m => m.type === 'featured_mix');
        }
    }
    if (currentStep >= 5) {
        const { data: sl } = await supabase.from('social_links').select('*').eq('profile_id', profile.id).maybeSingle();
        socialLink = sl;
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="mb-4">
                            <h2 className="text-2xl font-extrabold text-white">Basic Profile Info</h2>
                            <p className="text-slate-400">Let's start with the essentials. What do people call you, and what do you play?</p>
                        </div>
                        <Step1Form profile={{
                            name: profile.name,
                            location: profile.location,
                            genres: profile.genres || [],
                            tagline: profile.tagline
                        }} />
                    </div>
                );
            case 2:
                // Note: Step2Form takes initialMixes
                const mixes = featuredMixes.map(m => ({ title: m.title || 'Mix', url: m.url }));
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="mb-4">
                            <h2 className="text-2xl font-extrabold text-white">Featured Mixes</h2>
                            <p className="text-slate-400">Add a Mixcloud, Soundcloud, or YouTube link to showcase your sound.</p>
                        </div>
                        <Step2Form existingMixUrl={mixes.length > 0 ? mixes[0].url : ''} />
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="mb-4">
                            <h2 className="text-2xl font-extrabold text-white">Profile Photos</h2>
                            <p className="text-slate-400">Upload your main avatar and optional press shots for promoters.</p>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Profile Photo</h3>
                                <div className="flex items-center gap-6">
                                    <ImageUpload type="avatar" bucket="avatars" currentImageUrl={profile.avatar_url} onUploadComplete={saveProfileAvatar} />
                                </div>
                            </div>
                            <hr className="border-white/5" />
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Press Shots (Optional)</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {pressShots.map((shot) => (
                                        <ImageUpload key={shot.id} type="press_shot" bucket="press_shots" currentImageUrl={shot.url} onDelete={async () => { await removePressShot(shot.id); }} onUploadComplete={async () => {}} />
                                    ))}
                                    {pressShots.length < 5 && (
                                        <ImageUpload type="press_shot" bucket="press_shots" onUploadComplete={addPressShot} />
                                    )}
                                </div>
                            </div>
                            <form action={completeStep3} className="flex gap-3 justify-end pt-4 border-t border-white/5">
                                <button type="submit" className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">Skip</button>
                                <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-purple-500 transition-all hover-glow">
                                    Save and Continue <ArrowRight className="ml-2 w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="mb-4">
                            <h2 className="text-2xl font-extrabold text-white">Biography</h2>
                            <p className="text-slate-400">Our AI can write a professional biography for you based on a few bullet points, or you can write your own.</p>
                        </div>
                        <Step4Client profile={profile} />
                    </div>
                );
            case 5:
                const socialsRecord = {
                    instagram: socialLink?.instagram,
                    soundcloud: socialLink?.soundcloud,
                    mixcloud: socialLink?.mixcloud,
                    youtube: socialLink?.youtube,
                    spotify: socialLink?.spotify,
                    resident_advisor: socialLink?.resident_advisor
                };
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="mb-4">
                            <h2 className="text-2xl font-extrabold text-white">Social Links</h2>
                            <p className="text-slate-400">Connect your profiles so promoters can verify your audience size.</p>
                        </div>
                        <Step5Form existingSocials={socialsRecord as any} />
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="mb-4">
                            <h2 className="text-2xl font-extrabold text-white">Booking Preferences</h2>
                            <p className="text-slate-400">How should promoters contact you?</p>
                        </div>
                        <BookingForm defaults={{
                            bookingType: profile.booking_type || 'form',
                            publicEmail: profile.public_email || '',
                            agentName: profile.agent_name || '',
                            feeRange: profile.fee_range || '',
                            availNotes: profile.availability_notes || ''
                        }} />
                    </div>
                );
            case 7:
                const pData: EPKProfileData = {
                    id: profile.id, username: profile.username, name: profile.name, location: profile.location,
                    genres: profile.genres || [], tagline: profile.tagline, shortBio: profile.short_bio, longBio: profile.long_bio,
                    bookingType: profile.booking_type || 'form', publicEmail: profile.public_email, avatar: profile.avatar_url,
                    pressShots: pressShots.map(p => p.url), mixes: featuredMixes.map(m => ({ title: m.title || 'Mix', url: m.url })),
                    socials: socialLink || {}, isPublished: profile.is_published
                };
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="mb-4 text-center">
                            <h2 className="text-3xl font-extrabold text-white mb-2">You're ready.</h2>
                            <p className="text-slate-400">Preview your EPK and publish it to the world.</p>
                        </div>

                        <div className="glass-panel p-2 rounded-3xl border-white/10 mb-8 relative group overflow-hidden bg-slate-950">
                            <div className="w-full h-[500px] overflow-hidden rounded-2xl relative pointer-events-none">
                                <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50">
                                    <EPKContent profile={pData} isDraftMode={true} />
                                </div>
                            </div>
                            <div className="absolute top-6 right-6 z-30">
                                <Link href={`/${profile.username}?preview=true`} target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/80 backdrop-blur text-white text-sm font-bold border border-white/10 hover:bg-slate-800 transition-colors pointer-events-auto shadow-2xl">
                                    <Eye className="w-4 h-4" /> Full Screen Preview
                                </Link>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 rounded-xl p-6 border border-white/5 shadow-inner mb-6">
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
                            <p className="text-slate-300 text-sm mb-6">Pay once. Keep it live forever. Unlock the PDF export and auto-sync with SYNCgigs.co.uk.</p>
                            <div className="flex flex-col items-center gap-4">
                                <CheckoutButton />
                                <form action={finishOnboarding}>
                                    <button type="submit" className="text-sm font-bold text-slate-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0">
                                        I'll do this later, take me to dashboard
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-3xl mx-auto my-12 relative animate-fade-in bg-slate-900 border border-purple-500/30 shadow-2xl shadow-purple-900/20 rounded-3xl overflow-hidden glass-panel z-50">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500" style={{ width: `${(currentStep / 7) * 100}%` }}></div>
            </div>
            
            <div className="p-8 sm:p-12">
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                    <span className="text-purple-400 font-bold tracking-widest uppercase text-xs">Profile Wizard</span>
                    <span className="text-slate-500 text-sm">Step {currentStep} of 7</span>
                </div>
                {renderStepContent()}
            </div>
        </div>
    );
}
