'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function saveStep4Bio(formData: FormData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }

    const shortBio = formData.get('shortBio') as string;
    const longBio = formData.get('longBio') as string;

    const { error } = await supabase
        .from('profiles')
        .update({
            short_bio: shortBio || null,
            long_bio: longBio || null,
        })
        .eq('id', user.id);

    if (error) {
        console.error('Failed to save Step 4 data:', error);
        throw new Error('Failed to save data. Please try again.');
    }

    revalidatePath('/onboarding/step-[n]', 'layout');
    redirect('/onboarding/step-5');
}
