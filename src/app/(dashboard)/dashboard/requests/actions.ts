'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateRequestStatus(formData: FormData) {
    const supabase = await createClient();
    const requestId = formData.get('requestId') as string;
    const status = formData.get('status') as string;

    // Verify user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    // Update status in database
    const { error } = await supabase
        .from('booking_requests')
        .update({ status })
        .eq('id', requestId);

    if (error) {
        console.error('Failed to update booking status:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/dashboard/requests');
    return { success: true };
}

export async function updateRequestDateTime(formData: FormData) {
    const supabase = await createClient();
    const requestId = formData.get('requestId') as string;
    const eventDate = formData.get('eventDate') as string;
    const eventTime = formData.get('eventTime') as string;

    // Verify user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    // Update datetime in database
    const { error } = await supabase
        .from('booking_requests')
        .update({
            event_date: eventDate,
            event_time: eventTime || null
        })
        .eq('id', requestId);

    if (error) {
        console.error('Failed to update booking datetime:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/dashboard/requests');
    return { success: true };
}
