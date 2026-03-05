import { NextResponse } from 'next/server';
import { sendBookingInquiryEmail } from '@/lib/resend';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const contactSchema = z.object({
    djName: z.string(),
    djUsername: z.string(),
    senderName: z.string().min(2),
    senderEmail: z.string().email(),
    date: z.string(),
    location: z.string(),
    eventType: z.string(),
    offer: z.string().optional(),
    message: z.string().min(10)
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = contactSchema.parse(body);

        // 1. Insert into Supabase `booking_requests` table using the Service Role Key
        // We use the admin client here because the form submitter is unauthenticated
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        // We need to look up the DJ's profile ID and email based on their username.
        const { data: profileData, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('id, public_email')
            .eq('username', data.djUsername)
            .single();

        if (!profileData) {
            console.error('DJ Profile not found for username:', data.djUsername);
            return NextResponse.json({ error: 'DJ Profile not found' }, { status: 404 });
        }

        const profileId = profileData.id;
        let targetEmail = profileData.public_email;

        // If they don't have a public email set, look up their login email securely via the admin auth client
        if (!targetEmail) {
            const { data: { user }, error: authError } = await supabaseAdmin.auth.admin.getUserById(profileId);
            if (user?.email) {
                targetEmail = user.email;
            } else {
                console.error("Could not find a valid email for DJ id:", profileId);
            }
        }

        const { error: insertError } = await supabaseAdmin
            .from('booking_requests')
            .insert({
                profile_id: profileId,
                sender_name: data.senderName,
                sender_email: data.senderEmail,
                event_date: data.date,
                location: data.location,
                event_type: data.eventType,
                offer: data.offer || null,
                message: data.message
            });

        if (insertError) {
            console.error('Failed to insert booking request to DB:', insertError);
            return NextResponse.json({ error: 'Failed to save booking request.' }, { status: 500 });
        }

        if (!targetEmail) {
            // If the DJ has no email on file, return success because we saved it to the DB at least.
            return NextResponse.json({ success: true, message: 'Message saved to dashboard only.' });
        }

        // 2. Send email via Resend
        const result = await sendBookingInquiryEmail({ ...data, to: targetEmail, offer: data.offer || '' });

        if (!result.success) {
            console.warn('Booking saved to DB, but failed to send email notification:', result.error);
            return NextResponse.json({ success: true, message: 'Message saved to dashboard.' });
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid request data', details: error.issues }, { status: 400 });
        }
        console.error('API Contact Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
