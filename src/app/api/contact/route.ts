import { NextResponse } from 'next/server';
import { sendBookingInquiryEmail } from '@/lib/resend';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const contactSchema = z.object({
    djName: z.string(),
    to: z.string().email(),
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

        // We need to look up the DJ's profile ID based on the email we are sending to or their username
        // Since the contact form currently just has the target email (`to`), we'll use that
        const { data: profileData, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('id')
            .eq('public_email', data.to)
            .single();

        let profileId = null;
        if (profileData) {
            profileId = profileData.id;
        } else {
            // Fallback: search by user email if public_email isn't set
            const { data: fallbackData } = await supabaseAdmin
                .from('profiles')
                .select('id, users!inner(email)')
                .eq('users.email', data.to)
                .single();

            if (fallbackData) profileId = fallbackData.id;
        }

        if (profileId) {
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
                // We log the error but still attempt to send the email so the DJ doesn't miss the lead completely
            }
        } else {
            console.error('Could not find a profile ID for the target email:', data.to);
        }

        // 2. Send email via Resend
        const result = await sendBookingInquiryEmail({ ...data, offer: data.offer || '' });

        if (!result.success) {
            return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
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
