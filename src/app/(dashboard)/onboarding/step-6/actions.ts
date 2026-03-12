'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function saveStep6Booking(formData: FormData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }

    const bookingType = formData.get('bookingType') as 'email' | 'form';
    const publicEmail = formData.get('public-email') as string;
    const agentName = formData.get('agent-name') as string;
    const feeRange = formData.get('fee-range') as string;
    const availNotes = formData.get('avail-notes') as string;

    const { error } = await supabase
        .from('profiles')
        .update({
            booking_type: bookingType,
            public_email: bookingType === 'email' ? (publicEmail || null) : null,
            agent_name: agentName || null,
            fee_range: feeRange || null,
            availability_notes: availNotes || null,
        })
        .eq('id', user.id);

    if (error) {
        console.error('Failed to save Step 6 data:', error);
        throw new Error('Failed to save data. Please try again.');
    }

    await supabase.from('profiles').update({ onboarding_step: 7 }).eq('id', user.id);

    revalidatePath('/dashboard', 'layout');
    redirect('/dashboard');
}
