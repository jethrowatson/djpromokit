'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { sendAdminSignupAlert } from '@/lib/resend'
import { z } from 'zod';
import { scrapeResidentAdvisor } from '@/lib/scraper';



export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const emailSchema = z.string().email('Please enter a valid email address.');
    const parsedEmail = emailSchema.safeParse(email);

    if (!parsedEmail.success) {
        redirect('/signup?error=' + encodeURIComponent(parsedEmail.error.issues[0].message));
    }

    // 1. Fallback Generation
    const djName = email.split('@')[0] || 'New DJ';
    let baseUsername = djName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
    if (!baseUsername) baseUsername = `dj-${Math.random().toString(36).substring(2, 7)}`;
    
    // Quick Collision Check
    let username = baseUsername;
    const { data: existingUser } = await supabase.from('profiles').select('username').eq('username', username).maybeSingle();
    if (existingUser) {
        username = `${baseUsername}-${Math.random().toString(36).substring(2, 6)}`;
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
        redirect('/signup?error=' + encodeURIComponent(error.message));
    }

    // Explicitly create the profiles and djs stubs to prevent dashboard redirect loops
    // (Often handles cases where trigger functions might lag or fail)
    if (data.user) {
        try {
            const adminClient = createSupabaseClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY!
            );
            
            await adminClient.from('profiles').upsert({
                id: data.user.id,
                username: username,
                name: djName,
                location: 'Unknown Location'
            }, { onConflict: 'id' }).select().single();

            await adminClient.from('djs').upsert({
                id: data.user.id,
                slug: username,
                stage_name: djName,
                bio: '',
                location: 'Unknown Location',
            }, { onConflict: 'id' });

        } catch (e) {
            console.error('Failed to manually hydrate profile:', e);
        }
    }

    // Fire non-blocking email alert to admin
    sendAdminSignupAlert({ email, djName, username }).catch(console.error);

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}
