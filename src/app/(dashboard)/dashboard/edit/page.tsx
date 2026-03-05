import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import EditProfileForm from "./EditProfileForm";

export default async function EditProfilePage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (!profile) {
        redirect('/onboarding/step-1');
    }

    const { data: mediaItems } = await supabase
        .from('media')
        .select('*')
        .eq('profile_id', profile.id)
        .order('created_at', { ascending: true });

    const { data: socialLinks } = await supabase
        .from('social_links')
        .select('*')
        .eq('profile_id', profile.id);

    const socials: Record<string, string> = {};
    if (socialLinks) {
        socialLinks.forEach(link => {
            if (link.url) socials[link.platform] = link.url;
        });
    }

    return (
        <div className="pt-8">
            <EditProfileForm
                profile={profile}
                media={mediaItems || []}
                socials={socials}
            />
        </div>
    );
}
