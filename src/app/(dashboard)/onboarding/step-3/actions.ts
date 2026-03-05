'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveProfileAvatar(avatarUrl: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', user.id);

    if (error) return { success: false, error: error.message };

    revalidatePath('/onboarding/step-3');
    revalidatePath('/dashboard');
    return { success: true };
}

export async function addPressShot(pressShotUrl: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const { data: profile } = await supabase.from('profiles').select('id').eq('id', user.id).single();
    if (!profile) return { success: false, error: 'Profile not found' };

    const { error } = await supabase
        .from('media')
        .insert({
            profile_id: profile.id,
            type: 'press_shot',
            url: pressShotUrl
        });

    if (error) return { success: false, error: error.message };

    revalidatePath('/onboarding/step-3');
    return { success: true };
}

export async function removePressShot(mediaId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    // Ideally, we delete the physical file from Supabase Storage here too if needed,
    // but deleting the DB record is enough to remove it from the UI.
    const { error } = await supabase
        .from('media')
        .delete()
        .eq('id', mediaId);

    if (error) return { success: false, error: error.message };

    revalidatePath('/onboarding/step-3');
    return { success: true };
}
