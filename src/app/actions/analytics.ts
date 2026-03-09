"use server";

import { createClient } from '@supabase/supabase-js';

export type AnalyticsEventType = 'page_view' | 'booking_click' | 'link_click' | 'mix_play';

export async function trackEvent(
    profileId: string,
    eventType: AnalyticsEventType,
    source?: string,
    eventData?: any
) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        // Fire and forget insertion to the analytics table
        const { error } = await supabaseAdmin.from('analytics').insert({
            profile_id: profileId,
            event_type: eventType,
            source: source || 'direct',
            event_data: eventData || null
        });

        if (error) {
            console.error('[Analytics] Failed to track event:', error);
        }
    } catch (e) {
        console.error('[Analytics] Exception tracking event:', e);
    }
}
