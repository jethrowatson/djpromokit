'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveDashboardBio(shortBio: string, longBio: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase
        .from('profiles')
        .update({
            short_bio: shortBio || null,
            long_bio: longBio || null,
        })
        .eq('id', user.id);

    if (error) {
        console.error('Failed to save dashboard bio:', error);
        throw new Error('Failed to save data. Please try again.');
    }

    revalidatePath('/dashboard', 'layout');
    revalidatePath('/[username]', 'page');
}

export async function toggleSyncGigs(enabled: boolean) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase
        .from('profiles')
        .update({ sync_gigs_enabled: enabled })
        .eq('id', user.id);

    if (error) {
        console.error('Failed to toggle SYNCgigs:', error);
        throw new Error('Failed to save data. Please try again.');
    }

    // If turning it on, export the full DJ Profile architecture to SYNCgigs
    if (enabled) {
        // Fetch exhaustive profile data
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        const { data: socials } = await supabase.from('socials').select('*').eq('profile_id', user.id);
        const { data: media } = await supabase.from('media').select('*').eq('profile_id', user.id);

        if (profile) {
            const fullExportPayload = {
                syncEnabled: true,
                djData: {
                    ...profile, // username, full_name, bio, location, genres, avatar_url, etc.
                    socials: socials || [],
                    media: media || []
                }
            };

            const webhookUrl = process.env.SYNC_WEBHOOK_URL || (process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/sync` : 'http://localhost:3000/api/webhooks/sync');
            try {
                await fetch(webhookUrl, {
                    method: 'POST',
                    body: JSON.stringify(fullExportPayload),
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (e) {
                console.log("SYNC Webhook ping failed safely.", e);
            }
        }
    }

    revalidatePath('/dashboard', 'layout');
    return { success: true };
}
