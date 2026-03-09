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

    // 1. Fetch Existing Profile (prevent overwrite)
    const { data: existingProfile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

    // 2. Generate slug only if there is no existing username
    let finalUsername = existingProfile?.username;

    if (!finalUsername) {
        // Fallback to metadata username or newly generated DJ Name slug
        const metadataUsername = user.user_metadata?.username;
        const slugifiedDjName = djName ? djName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-') : '';

        let rawCandidate = metadataUsername || slugifiedDjName || `dj_${user.id.substring(0, 6)}`;
        let candidateUsername = rawCandidate.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');

        // 3. Prevent Collisions for newly generated slugs
        const { data: collisionCheck } = await supabase
            .from('profiles')
            .select('username')
            .eq('username', candidateUsername)
            .maybeSingle();

        if (collisionCheck) {
            finalUsername = `${candidateUsername}${user.id.substring(0, 4)}`;
        } else {
            finalUsername = candidateUsername;
        }
    }

    const { error } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            username: finalUsername,
            name: djName,
            location: location,
            genres: [primaryGenre, secondaryGenre].filter(Boolean),
            tagline: tagline || null,
        });

    if (error) {
        console.error('Failed to save Step 1 data:', error);
        throw new Error('Failed to save data. Please try again.');
    }

    revalidatePath('/onboarding/step-[n]', 'layout');
    redirect('/onboarding/step-2');
}
