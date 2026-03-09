import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EPKContent, { EPKProfileData } from "@/components/epk/EPKContent";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
    props: { params: Promise<{ username: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const params = await props.params;
    const decodedUsername = decodeURIComponent(params.username);

    const supabase = await createClient();
    const { data: profile } = await supabase
        .from('profiles')
        .select('name, tagline, short_bio, avatar_url, location')
        .eq('username', decodedUsername)
        .single();

    if (!profile) {
        return {
            title: 'Profile Not Found | DJ Promo Kit',
        };
    }

    const title = `${profile.name} | DJ Promo Kit`;
    const description = profile.short_bio || profile.tagline || `Check out ${profile.name}'s official DJ Promo Kit from ${profile.location || 'their location'}.`;
    const images = profile.avatar_url ? [{ url: profile.avatar_url, width: 800, height: 600, alt: profile.name }] : [];

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://djpromokit.com/${params.username}`,
            type: 'profile',
            images,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: profile.avatar_url ? [profile.avatar_url] : [],
        }
    };
}

export const dynamic = 'force-dynamic';

export default async function EPKProfilePage(props: { params: Promise<{ username: string }>, searchParams: Promise<{ preview?: string }> }) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const isPreview = searchParams.preview === 'true';
    const decodedUsername = decodeURIComponent(params.username);

    const supabase = await createClient();

    // In a production app you'd want a big consolidated query/RPC, but we can do a few fetches here.
    // Notice that if preview is NOT true, RLS blocks us from viewing if is_published is false.
    // If preview IS true, RLS allows the owner to view it.
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', decodedUsername)
        .single();

    if (error || !profile) {
        return notFound();
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

    // Map social links array to object
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
        <EPKContent profile={profileData} isDraftMode={isPreview} />
    );
}
