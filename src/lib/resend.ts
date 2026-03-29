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
    const formattedAmount = amount ? new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(amount / 100) : '£5.99';

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

export async function sendAbandonedCart1HourEmail(email: string, username: string, djName: string) {
  if (!resend) return { success: false, error: 'Resend API Key missing' };
  try {
    const { data, error } = await resend.emails.send({
      from: 'DJpromokit <team@updates.djpromokit.com>',
      to: email,
      subject: `Your EPK is ready to go live! 🚀`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 40px; border-radius: 12px; text-align: center;">
          <h2 style="color: #0f172a; margin-top: 0;">Hey ${djName}!</h2>
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">Your DJ Promo Kit is set up and looking great, but it's currently still in <strong>Draft Mode</strong>.</p>
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">To start sending it to promoters and attaching your custom <code>djpromokit.com/${username}</code> URL to your Instagram bio, you'll need to publish your profile.</p>
          
          <div style="background-color: white; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 24px 0;">
            <p style="margin: 0; color: #64748b; font-size: 14px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em;">Lifetime Access</p>
            <p style="margin: 8px 0 0 0; color: #8b5cf6; font-size: 32px; font-weight: 800;">£5.99 <span style="font-size: 14px; font-weight: 400; color: #64748b; text-decoration: line-through;">£10.99</span></p>
            <p style="margin: 8px 0 0 0; color: #64748b; font-size: 14px;">One-time payment. No subscriptions ever.</p>
          </div>

          <div style="margin-top: 32px;">
            <a href="https://djpromokit.com/api/checkout/direct?username=${username}" style="background-color: #8b5cf6; color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; display: inline-block; font-size: 16px;">Publish Profile Now</a>
          </div>
        </div>
      `
    });
    return error ? { success: false, error } : { success: true, data };
  } catch (error) { return { success: false, error }; }
}

export async function sendAbandonedCart1DayEmail(email: string, username: string, djName: string) {
  if (!resend) return { success: false, error: 'Resend API Key missing' };
  try {
    const { data, error } = await resend.emails.send({
      from: 'DJpromokit <team@updates.djpromokit.com>',
      to: email,
      subject: `Why top DJs use DJ Promo Kit 🎧`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 12px; border: 1px solid #e2e8f0;">
          <h2 style="color: #0f172a; margin-top: 0;">Get your name out there, ${djName}</h2>
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">Still thinking about taking your profile live? When you publish your DJ Promo Kit today, here's what you instantly unlock:</p>
          
          <ul style="color: #334155; font-size: 16px; line-height: 1.6; margin: 24px 0;">
            <li style="margin-bottom: 12px;"><strong>A beautifully formatted A4 PDF press kit</strong> that updates automatically as you change your photos or bio.</li>
            <li style="margin-bottom: 12px;"><strong>A blazing-fast custom URL</strong> to attach to your Instagram, Linktree, or Soundcloud.</li>
            <li style="margin-bottom: 12px;"><strong>A central hub</strong> for all your music, mixes, and booking inquiries.</li>
          </ul>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 24px 0; text-align: center;">
            <p style="margin: 0; color: #0f172a; font-size: 16px; font-weight: 600;">Pay £5.99 once, use it forever.</p>
          </div>

          <div style="margin-top: 32px; text-align: center;">
            <a href="https://djpromokit.com/api/checkout/direct?username=${username}" style="background-color: #0f172a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">Unlock Your EPK</a>
          </div>
        </div>
      `
    });
    return error ? { success: false, error } : { success: true, data };
  } catch (error) { return { success: false, error }; }
}

export async function sendAbandonedCart3DayEmail(email: string, username: string, djName: string) {
  if (!resend) return { success: false, error: 'Resend API Key missing' };
  try {
    const { data, error } = await resend.emails.send({
      from: 'DJpromokit <team@updates.djpromokit.com>',
      to: email,
      subject: `Don't leave your profile in draft mode 📥`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #fffbeb; padding: 40px; border-radius: 12px; border: 1px solid #fde68a;">
          <h2 style="color: #92400e; margin-top: 0; text-align: center;">Final Reminder: Your Draft EPK ⚠️</h2>
          <p style="color: #92400e; font-size: 16px; line-height: 1.6; text-align: center;">Hey ${djName}, it looks like your EPK is still in draft mode.</p>
          
          <p style="color: #92400e; font-size: 16px; line-height: 1.6; text-align: center;">For less than the price of a fancy coffee, you can secure your custom URL forever and immediately unlock A4 PDF exports to send to booking agents. Stop struggling with 15 different links and get a professional kit.</p>

          <div style="margin-top: 32px; text-align: center;">
            <a href="https://djpromokit.com/api/checkout/direct?username=${username}" style="background-color: #d97706; color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; display: inline-block; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(217, 119, 6, 0.2);">Publish for £5.99 Today</a>
          </div>
        </div>
      `
    });
    return error ? { success: false, error } : { success: true, data };
  } catch (error) { return { success: false, error }; }
}

