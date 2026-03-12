'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { sendAdminSignupAlert } from '@/lib/resend'
import { z } from 'zod';
import { scrapeResidentAdvisor } from '@/lib/scraper';

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const rawUsername = formData.get('username') as string || ''
    const username = rawUsername.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-')
    const djName = formData.get('djName') as string
    const raUrl = formData.get('raUrl') as string

    const emailSchema = z.string().email('Please enter a valid email address.');
    const parsedEmail = emailSchema.safeParse(email);

    if (!parsedEmail.success) {
        redirect('/signup?error=' + encodeURIComponent(parsedEmail.error.issues[0].message));
    }

    const { data: existingUser, error: queryError } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single()

    if (existingUser) {
        redirect('/signup?error=' + encodeURIComponent('That username is already taken. Please choose another.'))
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
                full_name: djName,
            }
        }
    })

    if (error) {
        redirect('/signup?error=' + encodeURIComponent(error.message))
    }

    // Scrape Resident Advisor if provided, and silently upsert their data
    if (raUrl && data?.user?.id) {
        try {
            const scrapedData = await scrapeResidentAdvisor(raUrl);
            
            // Auto-populate the profiles table (avatar)
            if (scrapedData.avatarUrl) {
                await supabase.from('profiles').update({ avatar_url: scrapedData.avatarUrl }).eq('id', data.user.id);
            }

            // Auto-populate the djs metadata table
            await supabase.from('djs').upsert({
                id: data.user.id,
                slug: username,
                stage_name: scrapedData.djName || djName,
                bio: scrapedData.bio || '',
                location: scrapedData.location || 'Unknown Location',
                avatar_url: scrapedData.avatarUrl || null
            });
        } catch (scrapeError) {
            console.error('[Signup Action] Scraper failed, but user was created:', scrapeError);
        }
    }

    // Fire non-blocking email alert to admin
    sendAdminSignupAlert({ email, djName, username }).catch(console.error);

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}
