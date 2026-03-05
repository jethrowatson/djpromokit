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

    const { data: socialLink } = await supabase
        .from('social_links')
        .select('*')
        .eq('profile_id', profile.id)
        .maybeSingle();

    const socials: Record<string, string> = {};
    if (socialLink) {
        if (socialLink.instagram) socials.instagram = socialLink.instagram;
        if (socialLink.soundcloud) socials.soundcloud = socialLink.soundcloud;
        if (socialLink.mixcloud) socials.mixcloud = socialLink.mixcloud;
        if (socialLink.youtube) socials.youtube = socialLink.youtube;
        if (socialLink.spotify) socials.spotify = socialLink.spotify;
        if (socialLink.resident_advisor) socials.ra = socialLink.resident_advisor;
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
