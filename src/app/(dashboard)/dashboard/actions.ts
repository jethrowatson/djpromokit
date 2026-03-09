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
