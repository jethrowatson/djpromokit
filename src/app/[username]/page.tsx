import { createClient, createAdminClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EPKContent, { EPKProfileData } from "@/components/epk/EPKContent";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
    props: { params: Promise<{ username: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const params = await props.params;

    // Metadata doesn't need admin client since we only want to index published profiles anyway
    const supabase = await createClient();
    const { data: profile } = await supabase
        .from('profiles')
        .select('name, tagline, short_bio, avatar_url, location')
        .eq('username', params.username)
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

    const supabase = await createClient();

    let profileData: any = null;
    let mediaData: any[] | null = null;
    let socialData: any = null;

    if (isPreview) {
        // PREVIEW MODE LOGIC:
        // We first check who the current authenticated user is. Because Server Components
        // sometimes lose exact cookie synchronicity on Vercel edge/serverless depending on caching headers,
        // we use an admin client to fetch the user profile if they request preview, but ONLY serve it
        // if they are actually the owner of that profile.

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return notFound(); // Cannot preview if not logged in

        const adminDb = await createAdminClient();

        const { data: profile } = await adminDb
            .from('profiles')
            .select('*')
            .eq('username', params.username)
            .single();

        // If the profile doesn't exist or the logged-in user does not own it, block access.
        if (!profile || profile.id !== user.id) {
            return notFound();
        }

        profileData = profile;

        const [{ data: mData }, { data: sData }] = await Promise.all([
            adminDb.from('media').select('*').eq('profile_id', profile.id),
            adminDb.from('social_links').select('*').eq('profile_id', profile.id).maybeSingle()
        ]);
        mediaData = mData;
        socialData = sData;

    } else {
        // PUBLIC MODE LOGIC (Standard RLS applies):

        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('username', params.username)
            .single();

        if (error || !profile) return notFound();

        profileData = profile;

        const [{ data: mData }, { data: sData }] = await Promise.all([
            supabase.from('media').select('*').eq('profile_id', profile.id),
            supabase.from('social_links').select('*').eq('profile_id', profile.id).maybeSingle()
        ]);
        mediaData = mData;
        socialData = sData;
    }

    let pressShots: string[] = [];
    let mixes: { title: string; url: string }[] = [];

    if (mediaData) {
        mediaData.forEach(item => {
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
    if (socialData) {
        if (socialData.instagram) socials.instagram = socialData.instagram;
        if (socialData.soundcloud) socials.soundcloud = socialData.soundcloud;
        if (socialData.mixcloud) socials.mixcloud = socialData.mixcloud;
        if (socialData.youtube) socials.youtube = socialData.youtube;
        if (socialData.spotify) socials.spotify = socialData.spotify;
        if (socialData.resident_advisor) socials.ra = socialData.resident_advisor;
    }

    const finalProfileData: EPKProfileData = {
        username: profileData.username,
        name: profileData.name,
        location: profileData.location,
        genres: profileData.genres || [],
        tagline: profileData.tagline,
        shortBio: profileData.short_bio,
        longBio: profileData.long_bio,
        bookingType: profileData.booking_type || 'form',
        publicEmail: profileData.public_email,
        avatar: profileData.avatar_url,
        pressShots,
        mixes,
        socials,
        isPublished: profileData.is_published
    };

    return (
        <EPKContent profile={finalProfileData} isDraftMode={isPreview} />
    );
}
