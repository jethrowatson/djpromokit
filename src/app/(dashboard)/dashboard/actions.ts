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

    // If turning it on, ping the webhook stub to simulate the integration link
    if (enabled) {
        const { data: profile } = await supabase.from('profiles').select('username').eq('id', user.id).single();
        if (profile) {
            const webhookUrl = process.env.SYNC_WEBHOOK_URL || (process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/sync` : 'http://localhost:3000/api/webhooks/sync');
            try {
                await fetch(webhookUrl, {
                    method: 'POST',
                    body: JSON.stringify({ username: profile.username, syncEnabled: true }),
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (e) {
                console.log("Mock Webhook ping failed safely.");
            }
        }
    }

    revalidatePath('/dashboard', 'layout');
    return { success: true };
}
