'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { sendAdminSignupAlert } from '@/lib/resend'
import { z } from 'zod';
import { scrapeResidentAdvisor } from '@/lib/scraper';

export async function continueToSecureSignup(formData: FormData) {
    const email = formData.get('email') as string;
    const profileUrl = formData.get('profileUrl') as string;

    const emailSchema = z.string().email('Please enter a valid email address.');
    const parsedEmail = emailSchema.safeParse(email);

    if (!parsedEmail.success) {
        redirect('/signup?error=' + encodeURIComponent(parsedEmail.error.issues[0].message));
    }

    // Capture the lead asynchronously using the Admin client (bypasses RLS)
    try {
        const adminClient = createSupabaseClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        await adminClient.from('leads').insert({ email, profile_url: profileUrl });
    } catch (e) {
        console.error('Failed to capture lead:', e);
    }

    // Pass the collected data forward via URL parameters
    const params = new URLSearchParams();
    params.set('email', email);
    if (profileUrl) params.set('profileUrl', profileUrl);

    redirect(`/signup/secure?${params.toString()}`);
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const passedDjName = formData.get('djName') as string || ''
    const profileUrl = formData.get('profileUrl') as string || ''

    // 1. Fallback Generation
    const djName = passedDjName || email.split('@')[0] || 'New DJ';
    let baseUsername = djName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
    if (!baseUsername) baseUsername = `dj-${Math.random().toString(36).substring(2, 7)}`;
    
    // Quick Collision Check
    let username = baseUsername;
    const { data: existingUser } = await supabase.from('profiles').select('username').eq('username', username).maybeSingle();
    if (existingUser) {
        username = `${baseUsername}-${Math.random().toString(36).substring(2, 6)}`;
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
                full_name: djName,
            }
        }
    })

    if (error) {
        const params = new URLSearchParams();
        params.set('error', error.message);
        params.set('email', email);
        if (profileUrl) params.set('profileUrl', profileUrl);
        redirect(`/signup/secure?${params.toString()}`);
    }

    // 3. Automated Profile Import (Scraping & Socials)
    if (profileUrl && data?.user?.id) {
        try {
            // Check if it's an RA URL which we can deeply scrape
            if (profileUrl.includes('ra.co/dj/')) {
                const scrapedData = await scrapeResidentAdvisor(profileUrl);
                
                if (scrapedData.avatarUrl) {
                    await supabase.from('profiles').update({ avatar_url: scrapedData.avatarUrl }).eq('id', data.user.id);
                }

                await supabase.from('djs').upsert({
                    id: data.user.id,
                    slug: username,
                    stage_name: scrapedData.djName || djName,
                    bio: scrapedData.bio || '',
                    location: scrapedData.location || 'Unknown Location',
                    avatar_url: scrapedData.avatarUrl || null
                });

                // Save RA as social link
                await supabase.from('social_links').upsert({ profile_id: data.user.id, resident_advisor: profileUrl });
            } else {
                // For generic URLs, just seed the social links table with their chosen url based on regex.
                const slPayload: any = { profile_id: data.user.id };
                if (profileUrl.includes('instagram.com')) slPayload.instagram = profileUrl;
                else if (profileUrl.includes('soundcloud.com')) slPayload.soundcloud = profileUrl;
                else if (profileUrl.includes('mixcloud.com')) slPayload.mixcloud = profileUrl;
                else if (profileUrl.includes('youtube.com')) slPayload.youtube = profileUrl;
                else if (profileUrl.includes('spotify.com')) slPayload.spotify = profileUrl;

                await supabase.from('social_links').upsert(slPayload);
                
                // create the djs stub
                await supabase.from('djs').upsert({
                    id: data.user.id,
                    slug: username,
                    stage_name: djName,
                    bio: '',
                    location: 'Unknown Location',
                });
            }
        } catch (scrapeError) {
            console.error('[Signup Action] Scraper failed, but user was created:', scrapeError);
        }
    } else if (data?.user?.id) {
        // Create basic djs stub if no URL was provided at all
        await supabase.from('djs').upsert({
            id: data.user.id,
            slug: username,
            stage_name: djName,
            bio: '',
            location: 'Unknown Location',
        });
    }

    // Fire non-blocking email alert to admin
    sendAdminSignupAlert({ email, djName, username }).catch(console.error);

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}
