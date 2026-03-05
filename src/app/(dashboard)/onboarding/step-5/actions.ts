'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function saveStep5Socials(formData: FormData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase.from('profiles').select('id').eq('user_id', user.id).single();
    if (!profile) throw new Error('Profile not found');

    const platforms = ['instagram', 'soundcloud', 'mixcloud', 'youtube', 'spotify', 'ra'];
    const socialLinksToInsert = [];

    for (const platform of platforms) {
        const url = formData.get(platform) as string;
        if (url) {
            socialLinksToInsert.push({
                profile_id: profile.id,
                platform,
                url
            });
        }
    }

    // First delete existing socials
    await supabase.from('social_links').delete().eq('profile_id', profile.id);

    // Then insert new ones if any exist
    if (socialLinksToInsert.length > 0) {
        const { error } = await supabase.from('social_links').insert(socialLinksToInsert);
        if (error) {
            console.error('Failed to save Step 5 data:', error);
            throw new Error('Failed to save data. Please try again.');
        }
    }

    revalidatePath('/onboarding/step-[n]', 'layout');
    redirect('/onboarding/step-6');
}
