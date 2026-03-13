'use client';

import { useState } from 'react';
import { Save, Loader2, CreditCard } from 'lucide-react';
import { updateAccountSettings } from './actions';
import CheckoutButton from '@/components/ui/CheckoutButton';

export default function AccountSettingsForm({ user, profile }: { user: any, profile: any }) {
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');

        const formData = new FormData(e.currentTarget);

        // Simple client-side validation for password match
        const newPassword = formData.get('newPassword') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                setMessage("New passwords do not match.");
                setIsSaving(false);
                return;
            }
            if (newPassword.length < 6) {
                setMessage("Password must be at least 6 characters.");
                setIsSaving(false);
                return;
            }
        }

        const result = await updateAccountSettings(formData);

        setIsSaving(false);
        if (result.success) {
            setMessage(result.message || 'Settings updated successfully!');
            // clear password fields
            (document.getElementById('newPassword') as HTMLInputElement).value = '';
            (document.getElementById('confirmPassword') as HTMLInputElement).value = '';
        } else {
            setMessage(result.error || 'Failed to update settings.');
        }
    };

    return (
        <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
                {message && (
                    <div className={`p-4 rounded-lg border ${message.includes('success') ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-red-500/10 border-red-500 text-red-400'}`}>
                        {message}
                    </div>
                )}

                <div className="glass-panel p-6 rounded-2xl border-white/5 space-y-6">
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Profile Link</h2>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Username (Public URL)</label>
                        <div className="flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-slate-700 bg-slate-800 text-slate-400 sm:text-sm">
                                djpromokit.com/
                            </span>
                            <input type="text" name="username" defaultValue={profile.username} required className="flex-1 min-w-0 block w-full px-4 py-3 rounded-none rounded-r-lg bg-slate-900 border border-slate-700 text-white focus:border-purple-500 outline-none sm:text-sm" />
                        </div>
                        <p className="mt-2 text-xs text-slate-500">Changing this will instantly break your previous links.</p>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border-white/5 space-y-6">
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Security</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                        <input type="email" name="email" defaultValue={user.email} required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" />
                    </div>

                    <div className="pt-4 border-t border-white/5 space-y-4">
                        <p className="text-sm text-slate-400">Leave blank to keep your current password.</p>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">New Password <span className="text-slate-500">(Min 6 chars)</span></label>
                            <input type="password" id="newPassword" name="newPassword" placeholder="••••••••" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="••••••••" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center justify-center px-6 py-3 rounded-lg bg-slate-100 text-slate-900 font-bold hover:bg-white transition-colors disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                        Save Settings
                    </button>
                </div>
            </form>

            <div className="glass-panel p-6 rounded-2xl border-purple-500/20 bg-purple-900/10 space-y-4 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/10 blur-[30px]"></div>
                <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2 relative z-10 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-purple-400" /> Billing Status
                </h2>

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        {profile.is_published ? (
                            <p className="font-bold text-emerald-400">Lifetime Access Active</p>
                        ) : (
                            <p className="font-bold text-slate-300">Free Draft Mode</p>
                        )}
                        <p className="text-sm text-slate-400">Pay <del className="text-red-400/50 decoration-red-500 mr-1">£10.99</del><strong className="text-white">£5.99</strong> once to unlock lifetime publishing and PDF downloads.</p>
                    </div>

                    {!profile.is_published && (
                        <CheckoutButton
                            text="Upgrade Now"
                            className="whitespace-nowrap flex items-center justify-center px-6 py-3 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/50 disabled:opacity-50"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
