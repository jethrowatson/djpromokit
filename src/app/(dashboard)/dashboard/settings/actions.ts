'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateAccountSettings(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const newPassword = formData.get('newPassword') as string;

    try {
        // 1. Update Username (in profiles)
        if (username) {
            const { error: profileError } = await supabase
                .from('profiles')
                .update({ username })
                .eq('id', user.id);

            if (profileError) {
                // Handle unique constraint violation gracefully
                if (profileError.code === '23505') {
                    return { success: false, error: 'That username is already taken.' };
                }
                throw profileError;
            }
        }

        // 2. Update Auth User (Email / Password)
        const updateData: any = {};
        if (email && email !== user.email) updateData.email = email;
        if (newPassword && newPassword.length >= 6) updateData.password = newPassword;

        if (Object.keys(updateData).length > 0) {
            const { error: authError } = await supabase.auth.updateUser(updateData);
            if (authError) throw authError;
        }

        revalidatePath('/dashboard');
        revalidatePath('/dashboard/settings');
        return { success: true, message: 'Settings updated successfully. If you changed your email, check your new inbox to confirm it.' };
    } catch (e: any) {
        return { success: false, error: e.message || 'An error occurred updating settings.' };
    }
}
