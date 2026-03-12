'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function saveStep2Mix(formData: FormData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }

    const mixUrl = formData.get('mixLink') as string;

    if (mixUrl) {
        // Validate URL
        const parsedUrl = z.string().url('Please enter a valid URL.').safeParse(mixUrl);
        if (!parsedUrl.success) {
            throw new Error(parsedUrl.error.issues[0].message);
        }
        // Find existing media record or create a new one
        const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single();

        if (profile) {
            // Upsert the featured mix into the media table.
            const { error } = await supabase
                .from('media')
                .upsert(
                    { profile_id: profile.id, type: 'featured_mix', url: mixUrl },
                    { onConflict: 'profile_id,type' }
                );

            if (error) {
                console.error('Failed to save Step 2 mix:', error);
                throw new Error('Failed to save data. Please try again.');
            }
        }
    }

    await supabase.from('profiles').update({ onboarding_step: 3 }).eq('id', user.id);

    revalidatePath('/dashboard', 'layout');
    redirect('/dashboard');
}
