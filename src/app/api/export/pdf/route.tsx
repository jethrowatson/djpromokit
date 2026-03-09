import { NextResponse } from 'next/server';
import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { renderToStream } from '@react-pdf/renderer';
import { EPKDocument } from '@/components/pdf/EPKDocument';
import { EPKProfileData } from '@/components/epk/EPKContent';

// GET /api/export/pdf
// Generates a true vector PDF press kit for the authenticated user
export async function GET(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Fetch user data
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (!profile) {
            return new NextResponse("Profile not found", { status: 404 });
        }

        const [{ data: mediaItems }, { data: socialLink }] = await Promise.all([
            supabase.from('media').select('*').eq('profile_id', profile.id),
            supabase.from('social_links').select('*').eq('profile_id', profile.id).maybeSingle()
        ]);

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

        // Render PDF Stream
        const stream = await renderToStream(<EPKDocument profile={profileData} /> as any);

        // We convert the stream to a readable stream for Next.js
        const readableStream = new ReadableStream({
            start(controller) {
                stream.on('data', (chunk) => controller.enqueue(chunk));
                stream.on('end', () => controller.close());
                stream.on('error', (err) => controller.error(err));
            }
        });

        const filename = `${profile.username || 'dj-promokit'}-epk.pdf`;

        return new NextResponse(readableStream as any, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`
            }
        });

    } catch (error) {
        console.error("PDF Generation failed:", error);
        return NextResponse.json({ error: "Generation failed" }, { status: 500 });
    }
}
