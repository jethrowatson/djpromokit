'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { sendAdminSignupAlert } from '@/lib/resend'

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const rawUsername = formData.get('username') as string || ''
    const username = rawUsername.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-')
    const djName = formData.get('djName') as string

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

    // Fire non-blocking email alert to admin
    sendAdminSignupAlert({ email, djName, username }).catch(console.error);

    revalidatePath('/', 'layout')
    redirect('/onboarding/step-1')
}
