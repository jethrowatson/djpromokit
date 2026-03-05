import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EPKContent, { EPKProfileData } from "@/components/epk/EPKContent";

export default async function EPKProfilePage(props: { params: Promise<{ username: string }>, searchParams: Promise<{ preview?: string }> }) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const isPreview = searchParams.preview === 'true';

    const supabase = await createClient();

    // In a production app you'd want a big consolidated query/RPC, but we can do a few fetches here.
    // Notice that if preview is NOT true, RLS blocks us from viewing if is_published is false.
    // If preview IS true, RLS allows the owner to view it.
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', params.username)
        .single();

    if (error || !profile) {
        return notFound();
    }

    const { data: mediaItems } = await supabase
        .from('media')
        .select('*')
        .eq('profile_id', profile.id);

    const { data: socialLinks } = await supabase
        .from('social_links')
        .select('*')
        .eq('profile_id', profile.id);

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

    // Map social links array to object
    const socials: Record<string, string> = {};
    if (socialLinks) {
        socialLinks.forEach(link => {
            if (link.url) socials[link.platform] = link.url;
        });
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
        <EPKContent profile={profileData} isDraftMode={isPreview} />
    );
}
