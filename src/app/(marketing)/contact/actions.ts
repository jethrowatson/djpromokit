'use server'

import { z } from 'zod'
import { sendGeneralContactEmail } from '@/lib/resend'

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters")
})

export type ContactState = {
    success: boolean
    message?: string
    errors?: {
        name?: string[]
        email?: string[]
        message?: string[]
    }
}

export async function submitContactForm(prevState: ContactState, formData: FormData): Promise<ContactState> {
    const validatedFields = contactSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    })

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please fix the errors in the form.'
        }
    }

    // Attempt to send the email via Resend
    const result = await sendGeneralContactEmail(validatedFields.data);

    if (!result.success) {
        return {
            success: false,
            message: 'Something went wrong sending your message. Please try again later.'
        }
    }

    return {
        success: true,
        message: 'Thanks for reaching out! We will get back to you shortly.'
    }
}
