'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { sendAdminSignupAlert } from '@/lib/resend'

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const username = formData.get('username') as string
    const djName = formData.get('djName') as string

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
