"use server";

import { createClient } from '@supabase/supabase-js';
export type AnalyticsEventType = 'page_view' | 'booking_click' | 'link_click' | 'mix_play' | 'download_asset';
export async function trackEvent(
    profileId: string,
    eventType: AnalyticsEventType,
    source?: string,
    eventData?: any
) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

        // Use regular supabase-js client to prevent cookies/headers errors in fire-and-forget contexts
        const supabase = createClient(supabaseUrl, supabaseKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        });

        console.log(`[Analytics] Tracking ${eventType} for ${profileId} via ${source}`);

        const { error } = await supabase.from('analytics').insert({
            profile_id: profileId,
            event_type: eventType,
            source: source || 'direct',
            event_data: eventData || null
        });

        if (error) {
            console.error('[Analytics] Insert Error:', JSON.stringify(error));
        } else {
            console.log(`[Analytics] Successfully tracked ${eventType}`);
        }
    } catch (e) {
        console.error('[Analytics] Exception:', e);
    }
}
