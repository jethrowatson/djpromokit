'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function finishOnboarding() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    await supabase.from('profiles').update({ is_onboarded: true }).eq('id', user.id);
    
    revalidatePath('/dashboard', 'layout');
    redirect('/dashboard');
}
