import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EPKContent, { EPKProfileData } from "@/components/epk/EPKContent";
import { Metadata, ResolvingMetadata } from "next";
import { trackEvent } from "@/app/actions/analytics";

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

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export default async function EPKProfilePage(props: { params: Promise<{ username: string }>, searchParams: Promise<{ preview?: string, ref?: string }> }) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const isPreview = searchParams.preview === 'true';
    const decodedUsername = decodeURIComponent(params.username);

    // Client for standard auth checks
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Admin Client to bypass RLS for draft previews via email links
    const supabaseAdmin = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: profile, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('username', decodedUsername)
        .single();

    if (error || !profile) {
        return notFound();
    }

    const isOwner = user?.id === profile.id;
    const isLocked = !profile.is_published && !isOwner;

    const { data: mediaItems } = await supabaseAdmin
        .from('media')
        .select('*')
        .eq('profile_id', profile.id);

    const { data: socialLink } = await supabaseAdmin
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
        id: profile.id,
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

    // Track Analytics Page View asynchronously (fire and forget)
    if (!isPreview && profile.is_published) {
        let domainSource = 'direct';

        // 1. Manually specified ref (e.g. ?ref=newsletter) takes absolute precedence
        if (searchParams.ref) {
            domainSource = searchParams.ref;
        } else {
            // 2. Otherwise try to pluck the exact domain they came from out of the HTTP Headers
            const { headers } = await import('next/headers');
            const reqHeaders = await headers();
            const referer = reqHeaders.get('referer');

            if (referer) {
                try {
                    const url = new URL(referer);
                    // e.g. "l.instagram.com" -> "instagram.com"
                    domainSource = url.hostname.replace(/^www\./, '').replace(/^l\./, '');
                } catch (e) {
                    console.log("[Analytics] Could not parse referer URL:", referer);
                }
            }
        }

        await trackEvent(profile.id, 'page_view', domainSource);
    }

    return (
        <div className="relative">
            <EPKContent profile={profileData} isDraftMode={isPreview || isLocked} />
            {isLocked && (
                <div className="fixed inset-0 z-[9999] bg-slate-950/85 flex flex-col items-center justify-center p-4">
                    <div className="bg-slate-800 border border-purple-500/20 shadow-2xl rounded-2xl p-8 max-w-md w-full text-center animate-slide-up md:-translate-y-8">
                        <div className="w-16 h-16 bg-purple-900/40 border border-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🔒</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Profile Draft Mode</h2>
                        <p className="text-slate-300 mb-8 text-sm leading-relaxed">You are viewing an unpublished profile link. If you are the owner, simply unlock your custom URL right now to share it with promoters.</p>
                        <a href={`/api/checkout/direct?username=${profile.username}`} className="w-full flex items-center justify-center py-4 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors text-white font-bold shadow-[0_0_20px_-5px_#8b5cf6] text-lg">
                            Publish & Unlock (£5.99)
                        </a>
                        <p className="text-slate-500 text-xs mt-4">One-time transparent fee. No subscriptions ever.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
