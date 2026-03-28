import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { 
  sendAbandonedCart1HourEmail,
  sendAbandonedCart1DayEmail,
  sendAbandonedCart3DayEmail 
} from '@/lib/resend';

export const maxDuration = 60; // Allows up to 60s execution
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    // Basic verification against accidental/malicious public hits
    const authHeader = req.headers.get('Authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    // Must use Admin Service Role to access profile user emails outside RLS
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const now = new Date();
    
    // Calculate time windows exactly
    // 1 Hour Cohort (between 1 and 2 hours ago)
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString();

    // 1 Day Cohort (between 24 and 48 hours ago)
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString();

    // 3 Day Cohort (between 72 and 96 hours ago)
    const threeDaysAgo = new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString();
    const fourDaysAgo = new Date(now.getTime() - 96 * 60 * 60 * 1000).toISOString();

    try {
        let sentCount = 0;

        // --- 1 HOUR EMAILS ---
        const { data: hr1Profiles } = await supabase
            .from('profiles')
            .select('id, name, username')
            .eq('is_published', false)
            .eq('email_1hr_sent', false)
            .lt('created_at', oneHourAgo)
            .gt('created_at', twoHoursAgo);

        if (hr1Profiles) {
            for (const p of hr1Profiles) {
                const { data: { user } } = await supabase.auth.admin.getUserById(p.id);
                if (user?.email) {
                    const res = await sendAbandonedCart1HourEmail(user.email, p.username, p.name || 'DJ');
                    if (res.success) {
                        await supabase.from('profiles').update({ email_1hr_sent: true }).eq('id', p.id);
                        sentCount++;
                    }
                }
            }
        }

        // --- 1 DAY EMAILS ---
        const { data: day1Profiles } = await supabase
            .from('profiles')
            .select('id, name, username')
            .eq('is_published', false)
            .eq('email_1day_sent', false)
            .lt('created_at', oneDayAgo)
            .gt('created_at', twoDaysAgo);

        if (day1Profiles) {
            for (const p of day1Profiles) {
                const { data: { user } } = await supabase.auth.admin.getUserById(p.id);
                if (user?.email) {
                    const res = await sendAbandonedCart1DayEmail(user.email, p.username, p.name || 'DJ');
                    if (res.success) {
                        await supabase.from('profiles').update({ email_1day_sent: true }).eq('id', p.id);
                        sentCount++;
                    }
                }
            }
        }

        // --- 3 DAY EMAILS ---
        const { data: day3Profiles } = await supabase
            .from('profiles')
            .select('id, name, username')
            .eq('is_published', false)
            .eq('email_3day_sent', false)
            .lt('created_at', threeDaysAgo)
            .gt('created_at', fourDaysAgo);

        if (day3Profiles) {
            for (const p of day3Profiles) {
                const { data: { user } } = await supabase.auth.admin.getUserById(p.id);
                if (user?.email) {
                    const res = await sendAbandonedCart3DayEmail(user.email, p.username, p.name || 'DJ');
                    if (res.success) {
                        await supabase.from('profiles').update({ email_3day_sent: true }).eq('id', p.id);
                        sentCount++;
                    }
                }
            }
        }

        return NextResponse.json({ success: true, emailsDispatched: sentCount });
    } catch (e: any) {
        console.error("Cron execution error", e);
        return NextResponse.json({ error: "Failed to process abandoned cart cron", details: e.message }, { status: 500 });
    }
}
