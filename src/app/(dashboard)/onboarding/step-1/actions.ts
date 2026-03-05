'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function saveStep1Basics(formData: FormData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }

    const djName = formData.get('djName') as string;
    const location = formData.get('location') as string;
    const primaryGenre = formData.get('primaryGenre') as string;
    const secondaryGenre = formData.get('secondaryGenre') as string;
    const tagline = formData.get('tagline') as string;

    const { error } = await supabase
        .from('profiles')
        .update({
            name: djName,
            location: location,
            genres: [primaryGenre, secondaryGenre].filter(Boolean),
            tagline: tagline || null,
        })
        .eq('id', user.id);

    if (error) {
        console.error('Failed to save Step 1 data:', error);
        throw new Error('Failed to save data. Please try again.');
    }

    revalidatePath('/onboarding/step-[n]', 'layout');
    redirect('/onboarding/step-2');
}
