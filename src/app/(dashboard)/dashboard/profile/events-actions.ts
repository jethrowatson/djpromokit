'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addUpcomingEvent(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: 'Unauthorized' };
    }

    const venue = formData.get('venue') as string;
    const date = formData.get('date') as string;
    const details = formData.get('details') as string;
    const rawTicketUrl = (formData.get('ticketUrl') as string || '').trim();

    if (!venue || !date) {
        return { success: false, error: 'Venue name and date are required.' };
    }

    let ticketUrl = rawTicketUrl;
    if (ticketUrl && !ticketUrl.startsWith('http://') && !ticketUrl.startsWith('https://')) {
        ticketUrl = `https://${ticketUrl}`;
    }

    // Try inserting with ticket_url
    const insertPayload: any = {
        profile_id: user.id,
        venue: venue.trim(),
        date,
        details: details?.trim() || null,
        is_upcoming: true,
        ticket_url: ticketUrl || null
    };

    const { data, error } = await supabase
        .from('gig_history')
        .insert(insertPayload)
        .select()
        .single();

    if (error) {
        console.error('Error inserting gig with ticket_url, attempting fallback:', error);
        // Fallback: If ticket_url column is not yet present on remote DB
        const fallbackPayload = {
            profile_id: user.id,
            venue: venue.trim(),
            date,
            details: details?.trim() || null,
            is_upcoming: true
        };

        const { error: fallbackError } = await supabase
            .from('gig_history')
            .insert(fallbackPayload);

        if (fallbackError) {
            console.error('Failed to add event fallback:', fallbackError);
            return { success: false, error: fallbackError.message };
        }
    }

    revalidatePath('/dashboard/profile');
    revalidatePath('/[username]', 'page');

    return { success: true };
}

export async function deleteUpcomingEvent(eventId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: 'Unauthorized' };
    }

    const { error } = await supabase
        .from('gig_history')
        .delete()
        .eq('id', eventId)
        .eq('profile_id', user.id);

    if (error) {
        console.error('Failed to delete event:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/dashboard/profile');
    revalidatePath('/[username]', 'page');

    return { success: true };
}
