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
    
    // We send Email 1 if account is older than 1 HOUR.
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
    
    // We send Email 2 if the previous email was sent at least 23 HOURS ago.
    const twentyThreeHoursAgo = new Date(now.getTime() - 23 * 60 * 60 * 1000).toISOString();

    // We send Email 3 if the previous email was sent at least 48 HOURS ago (72 hours relative to signup).
    const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString();

    try {
        let sentCount = 0;

        // --- 1 HOUR EMAILS (Wave 1) ---
        // Backfills all historic missing accounts safely
        const { data: hr1Profiles } = await supabase
            .from('profiles')
            .select('id, name, username')
            .eq('is_published', false)
            .eq('email_1hr_sent', false)
            .lt('created_at', oneHourAgo)
            .limit(40); // Batch limit to prevent Vercel 60s timeout

        if (hr1Profiles) {
            for (const p of hr1Profiles) {
                const { data: { user } } = await supabase.auth.admin.getUserById(p.id);
                if (user?.email) {
                    const res = await sendAbandonedCart1HourEmail(user.email, p.username, p.name || 'DJ');
                    if (res.success) {
                        await supabase.from('profiles').update({ 
                            email_1hr_sent: true,
                            last_abandoned_email_at: new Date().toISOString()
                        }).eq('id', p.id);
                        sentCount++;
                    }
                }
            }
        }

        // --- 1 DAY EMAILS (Wave 2) ---
        const { data: day1Profiles } = await supabase
            .from('profiles')
            .select('id, name, username')
            .eq('is_published', false)
            .eq('email_1hr_sent', true)
            .eq('email_1day_sent', false)
            .not('last_abandoned_email_at', 'is', null)
            .lt('last_abandoned_email_at', twentyThreeHoursAgo)
            .limit(40);

        if (day1Profiles) {
            for (const p of day1Profiles) {
                const { data: { user } } = await supabase.auth.admin.getUserById(p.id);
                if (user?.email) {
                    const res = await sendAbandonedCart1DayEmail(user.email, p.username, p.name || 'DJ');
                    if (res.success) {
                        await supabase.from('profiles').update({ 
                            email_1day_sent: true,
                            last_abandoned_email_at: new Date().toISOString()
                        }).eq('id', p.id);
                        sentCount++;
                    }
                }
            }
        }

        // --- 3 DAY EMAILS (Wave 3) ---
        const { data: day3Profiles } = await supabase
            .from('profiles')
            .select('id, name, username')
            .eq('is_published', false)
            .eq('email_1day_sent', true)
            .eq('email_3day_sent', false)
            .not('last_abandoned_email_at', 'is', null)
            .lt('last_abandoned_email_at', fortyEightHoursAgo)
            .limit(40);

        if (day3Profiles) {
            for (const p of day3Profiles) {
                const { data: { user } } = await supabase.auth.admin.getUserById(p.id);
                if (user?.email) {
                    const res = await sendAbandonedCart3DayEmail(user.email, p.username, p.name || 'DJ');
                    if (res.success) {
                        await supabase.from('profiles').update({ 
                            email_3day_sent: true,
                            last_abandoned_email_at: new Date().toISOString() 
                        }).eq('id', p.id);
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
