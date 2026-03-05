import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ImageUpload from "@/components/ui/ImageUpload";
import { saveProfileAvatar, addPressShot, removePressShot } from "./actions";

export default async function Step3Photos() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const { data: profile } = await supabase
        .from('profiles')
        .select('id, avatar_url')
        .eq('id', user.id)
        .single();

    let pressShots: any[] = [];
    if (profile) {
        const { data } = await supabase
            .from('media')
            .select('*')
            .eq('profile_id', profile.id)
            .eq('type', 'press_shot');
        if (data) pressShots = data;
    }
    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white mb-2">Photos</h1>
                <p className="text-slate-400">High-quality photos make the difference between looking like a hobbyist and a pro.</p>
            </div>

            <div className="space-y-8">
                {/* Profile Image */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Profile Photo <span className="text-red-400">*</span></h3>
                    <p className="text-sm text-slate-400 mb-4">This will be the main image on your EPK.</p>

                    <div className="flex items-center gap-6">
                        <ImageUpload
                            type="avatar"
                            bucket="avatars"
                            currentImageUrl={profile?.avatar_url}
                            onUploadComplete={saveProfileAvatar}
                        />
                        <div className="flex-1">
                            <p className="text-xs text-slate-500 mt-2">Square, max 5MB. JPG or PNG. The image is saved automatically upon selection.</p>
                        </div>
                    </div>
                </div>

                <hr className="border-white/5" />

                {/* Press Shots */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Press Shots <span className="text-slate-500 font-normal text-sm">(Optional)</span></h3>
                    <p className="text-sm text-slate-400 mb-4">Promoters will be able to download these in high-res for their flyers.</p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {pressShots.map((shot) => (
                            <ImageUpload
                                key={shot.id}
                                type="press_shot"
                                bucket="press_shots"
                                currentImageUrl={shot.url}
                                onUploadComplete={async () => { }} // No-op as it's already uploaded
                                onDelete={async () => {
                                    await removePressShot(shot.id);
                                }}
                            />
                        ))}

                        {/* Add button placeholder - Only show if less than 5 */}
                        {pressShots.length < 5 && (
                            <ImageUpload
                                type="press_shot"
                                bucket="press_shots"
                                onUploadComplete={addPressShot}
                            />
                        )}

                        {/* Empty Space filler for aesthetic if no shots */}
                        {pressShots.length === 0 && (
                            <div className="aspect-[4/3] rounded-xl border-2 border-dashed border-slate-700/50 bg-slate-900/30 flex flex-col items-center justify-center"></div>
                        )}
                    </div>
                    <p className="text-xs text-slate-500 mt-3">You can upload up to 5 additional images.</p>
                </div>

                <div className="pt-8 flex justify-between items-center border-t border-white/5">
                    <Link
                        href="/onboarding/step-2"
                        className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Back
                    </Link>
                    <div className="flex gap-3">
                        <Link
                            href="/onboarding/step-4"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                        >
                            Skip
                        </Link>
                        <Link
                            href="/onboarding/step-4"
                            className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all hover-glow"
                        >
                            Save and Continue
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
