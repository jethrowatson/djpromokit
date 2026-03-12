import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProfileEditor from "@/components/dashboard/ProfileEditor";

export default async function EditProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (!profile) redirect('/dashboard');

    const { data: media } = await supabase
        .from('media')
        .select('*')
        .eq('profile_id', user.id)
        .order('created_at', { ascending: true });

    const pressShots = media ? media.filter(m => m.type === 'press_shot') : [];
    const featuredMixes = media ? media.filter(m => m.type === 'featured_mix') : [];

    const { data: socialLink } = await supabase
        .from('social_links')
        .select('*')
        .eq('profile_id', user.id)
        .maybeSingle();

    return (
        <div className="max-w-6xl mx-auto animate-fade-in relative">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white mb-2">Edit Profile</h1>
                <p className="text-slate-400">Manage the content that appears on your public EPK.</p>
            </div>
            
            <ProfileEditor 
                profile={profile} 
                pressShots={pressShots} 
                featuredMixes={featuredMixes} 
                socialLink={socialLink || {}} 
            />
        </div>
    );
}
