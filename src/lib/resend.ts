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

export async function sendAdminSignupAlert({
  email,
  djName,
  username
}: {
  email: string;
  djName: string;
  username: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set. Admin alert skipped.");
    return { success: false, error: 'Resend API Key missing' };
  }

  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@djpromokit.com';
    const { data, error } = await resend.emails.send({
      from: 'DJpromokit System <system@updates.djpromokit.com>',
      to: adminEmail,
      subject: `🎉 New DJ Signup: ${djName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New User Registration</h2>
          <p>A new DJ has just created an account on DJ Promo Kit!</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; width: 30%;"><strong>DJ Name</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${djName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Username</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${username}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
          </table>

          <div style="margin-top: 30px;">
            <a href="https://djpromokit.com/${username}" style="background-color: #8b5cf6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">View Profile</a>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Error sending admin alert via Resend:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error sending admin alert:', error);
    return { success: false, error };
  }
}

export async function sendAdminPurchaseAlert({
  profileId,
  amount,
  currency = 'GBP'
}: {
  profileId: string;
  amount: number | null;
  currency?: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set. Purchase alert skipped.");
    return { success: false, error: 'Resend API Key missing' };
  }

  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@djpromokit.com';
    const formattedAmount = amount ? new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(amount / 100) : '£10.99';

    const { data, error } = await resend.emails.send({
      from: 'DJpromokit Sales <sales@updates.djpromokit.com>',
      to: adminEmail,
      subject: `💰 New Sale: ${formattedAmount}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 40px; border-radius: 12px;">
          <h2 style="color: #0f172a; margin-top: 0;">Cha-ching! 💸</h2>
          <p style="color: #334155; font-size: 16px;">A DJ has just paid to publish their profile on DJ Promo Kit.</p>
          
          <div style="background-color: white; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 24px 0;">
            <p style="margin: 0; color: #64748b; font-size: 14px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em;">Revenue</p>
            <p style="margin: 8px 0 0 0; color: #10b981; font-size: 32px; font-weight: 800;">${formattedAmount}</p>
          </div>

          <p style="color: #64748b; font-size: 14px;"><strong>Profile ID:</strong> ${profileId}</p>

          <div style="margin-top: 32px;">
            <a href="https://dashboard.stripe.com/" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View in Stripe</a>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Error sending admin purchase alert via Resend:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error sending admin purchase alert:', error);
    return { success: false, error };
  }
}

export async function sendGeneralContactEmail({
  name,
  email,
  message
}: {
  name: string;
  email: string;
  message: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set. General contact email skipped.");
    return { success: false, error: 'Resend API Key missing' };
  }

  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@djpromokit.com';
    const { data, error } = await resend.emails.send({
      from: 'DJpromokit Website <contact@updates.djpromokit.com>',
      to: adminEmail,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 40px; border-radius: 12px;">
          <h2 style="color: #0f172a; margin-top: 0;">New Website Inquiry</h2>
          <p style="color: #475569; font-size: 16px;">Someone has submitted a message via the DJ Promo Kit contact page.</p>
          
          <div style="background-color: white; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 24px 0;">
            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px;"><strong>From:</strong> ${name} (<a href="mailto:${email}" style="color: #4f46e5;">${email}</a>)</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p style="margin: 0; color: #334155; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <div style="margin-top: 32px; text-align: center;">
            <a href="mailto:${email}" style="background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reply to ${name}</a>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Error sending general contact email via Resend:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error sending general contact email:', error);
    return { success: false, error };
  }
}
