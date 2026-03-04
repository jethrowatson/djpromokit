import { NextResponse } from 'next/server';
import { sendBookingInquiryEmail } from '@/lib/resend';
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

        const result = await sendBookingInquiryEmail({ ...data, offer: data.offer || '' });

        if (!result.success) {
            return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid request data', details: error.errors }, { status: 400 });
        }
        console.error('API Contact Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
