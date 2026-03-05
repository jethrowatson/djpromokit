'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveFullProfile(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const name = formData.get('name') as string;
    const location = formData.get('location') as string;
    const tagline = formData.get('tagline') as string;
    const short_bio = formData.get('shortBio') as string;
    const long_bio = formData.get('longBio') as string;

    const booking_type = formData.get('bookingType') as 'form' | 'email';
    const public_email = formData.get('publicEmail') as string;
    const agent_name = formData.get('agentName') as string;
    const fee_range = formData.get('feeRange') as string;
    const availability_notes = formData.get('availabilityNotes') as string;

    const { error: profileError } = await supabase
        .from('profiles')
        .update({
            name,
            location,
            tagline: tagline || null,
            short_bio: short_bio || null,
            long_bio: long_bio || null,
            booking_type,
            public_email: public_email || null,
            agent_name: agent_name || null,
            fee_range: fee_range || null,
            availability_notes: availability_notes || null,
        })
        .eq('id', user.id);

    if (profileError) return { success: false, error: profileError.message };

    // Mixes
    const mixUrl = formData.get('mixUrl') as string;
    await supabase.from('media').delete().match({ profile_id: user.id, type: 'featured_mix' });

    if (mixUrl) {
        const { error: mixError } = await supabase
            .from('media')
            .insert({ profile_id: user.id, type: 'featured_mix', url: mixUrl });

        if (mixError) console.error('Mix Save Error:', mixError);
    }

    // Socials
    const platforms = ['instagram', 'soundcloud', 'mixcloud', 'youtube', 'spotify', 'ra'];
    const socialsToInsert = platforms.map(platform => {
        const url = formData.get(platform) as string;
        if (url) return { profile_id: user.id, platform, url };
        return null;
    }).filter(Boolean);

    // Delete old
    await supabase.from('social_links').delete().eq('profile_id', user.id);

    // Insert new
    if (socialsToInsert.length > 0) {
        // @ts-ignore
        const { error: socialError } = await supabase.from('social_links').insert(socialsToInsert);
        if (socialError) console.error('Socials Save Error:', socialError);
    }

    revalidatePath('/dashboard/edit');
    revalidatePath('/dashboard');
    revalidatePath(`/epk/[username]`, 'page');

    return { success: true };
}
