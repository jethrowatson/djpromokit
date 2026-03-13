import { NextResponse } from 'next/server';
import { sendAdminSignupAlert } from '@/lib/resend';

export async function POST(req: Request) {
    try {
        const payload = await req.json();

        // Check if this is a Supabase insert on profiles
        if (payload.type === 'INSERT' && payload.table === 'profiles') {
            const record = payload.record;

            // Extract what we can from the profiles insert payload
            // Google auth users might have their email in public_email by auto-healer
            const djName = record.name || 'New DJ';
            const username = record.username || 'unknown';
            const email = record.public_email || 'No Public Email (Auth Only)';
            
            // Only fire if the environment has resend configured
            const result = await sendAdminSignupAlert({
                email,
                djName,
                username
            });

            if (!result.success) {
               console.error("Webhook triggered Resend alert but it failed.", result.error);
            }

            return NextResponse.json({ success: true, processed: true });
        }

        return NextResponse.json({ ignored: true, reason: "Not an INSERT on profiles" });
    } catch (error: any) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
