import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendBookingInquiryEmail({
    to,
    djName,
    senderName,
    senderEmail,
    date,
    location,
    eventType,
    offer,
    message
}: {
    to: string;
    djName: string;
    senderName: string;
    senderEmail: string;
    date: string;
    location: string;
    eventType: string;
    offer: string;
    message: string;
}) {
    if (!resend) {
        console.warn("RESEND_API_KEY is not set. Email not sent.");
        return { success: false, error: 'Resend API Key missing' };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'DJpromokit Bookings <bookings@updates.djpromokit.com>',
            to,
            subject: `New Booking Inquiry for ${djName} - ${date}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Booking Inquiry via DJpromokit</h2>
          <p><strong>${senderName}</strong> (${senderEmail}) sent you a booking request.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; width: 30%;"><strong>Event Date</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Location</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${location}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Event Type</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${eventType}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Initial Offer</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${offer || 'Not specified'}</td>
            </tr>
          </table>

          <div style="margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #8b5cf6;">
            <p style="margin-top: 0; color: #666; font-size: 14px;"><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 40px; text-align: center;">
            <a href="mailto:${senderEmail}" style="background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reply to ${senderName}</a>
          </div>
        </div>
      `
        });

        if (error) {
            console.error('Error sending email via Resend:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Unexpected error sending email:', error);
        return { success: false, error };
    }
}
