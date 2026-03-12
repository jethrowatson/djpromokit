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

    const { data: profile } = await supabase.from('profiles').select('id').eq('id', user.id).single();
    if (!profile) throw new Error('Profile not found');

    const instagram = formData.get('instagram') as string;
    const soundcloud = formData.get('soundcloud') as string;
    const mixcloud = formData.get('mixcloud') as string;
    const youtube = formData.get('youtube') as string;
    const spotify = formData.get('spotify') as string;
    const resident_advisor = formData.get('ra') as string;

    const socialData = {
        profile_id: profile.id,
        instagram: instagram || null,
        soundcloud: soundcloud || null,
        mixcloud: mixcloud || null,
        youtube: youtube || null,
        spotify: spotify || null,
        resident_advisor: resident_advisor || null,
    };

    // First delete existing socials
    await supabase.from('social_links').delete().eq('profile_id', profile.id);

    // Insert new single row
    if (instagram || soundcloud || mixcloud || youtube || spotify || resident_advisor) {
        const { error } = await supabase.from('social_links').insert(socialData);
        if (error) {
            console.error('Failed to save Step 5 data:', error);
            throw new Error('Failed to save data. Please try again.');
        }
    }

    await supabase.from('profiles').update({ onboarding_step: 6 }).eq('id', user.id);

    revalidatePath('/dashboard', 'layout');
    redirect('/dashboard');
}
