'use client';

import { useState } from 'react';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { saveFullProfile } from './actions';
import ImageUpload from '@/components/ui/ImageUpload';
import { saveProfileAvatar, addPressShot, removePressShot } from '@/app/(dashboard)/onboarding/step-3/actions';

interface EditProfileFormProps {
    profile: any;
    media: any[];
    socials: Record<string, string>;
}

export default function EditProfileForm({ profile, media, socials }: EditProfileFormProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');

        const formData = new FormData(e.currentTarget);
        const result = await saveFullProfile(formData);

        setIsSaving(false);
        if (result.success) {
            setMessage('Profile saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } else {
            setMessage(result.error || 'Failed to save profile.');
        }
    };

    const pressShots = media.filter(m => m.type === 'press_shot');
    const featuredMixes = media.filter(m => m.type === 'featured_mix').map(m => m.url);

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto pb-24 animate-fade-in relative">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-white">Edit Profile</h1>
                        <p className="text-slate-400">Update your EPK information</p>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isSaving}
                    className="hidden sm:inline-flex items-center justify-center px-6 py-3 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-500 transition-colors disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                    Save Changes
                </button>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg border ${message.includes('success') ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-red-500/10 border-red-500 text-red-400'}`}>
                    {message}
                </div>
            )}

            <div className="space-y-8">
                {/* 1. Basics */}
                <section className="glass-panel p-6 rounded-2xl border-white/5 space-y-6">
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Basics</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">DJ Name</label>
                            <input type="text" name="name" defaultValue={profile.name} required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                            <input type="text" name="location" defaultValue={profile.location} required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Tagline (Optional)</label>
                        <input type="text" name="tagline" defaultValue={profile.tagline || ''} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" />
                    </div>
                </section>

                {/* 2. Photos */}
                <section className="glass-panel p-6 rounded-2xl border-white/5 space-y-6">
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Photos & Media</h2>
                    <div className="flex flex-col sm:flex-row gap-8">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-4">Profile Avatar</label>
                            <ImageUpload
                                type="avatar"
                                bucket="avatars"
                                currentImageUrl={profile.avatar_url}
                                onUploadComplete={async (url) => { await saveProfileAvatar(url); }}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-slate-300 mb-4">Press Shots (Up to 5)</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {pressShots.map((shot: any) => (
                                    <ImageUpload
                                        key={shot.id}
                                        type="press_shot"
                                        bucket="press_shots"
                                        currentImageUrl={shot.url}
                                        onUploadComplete={() => { }}
                                        onDelete={async () => { await removePressShot(shot.id); }}
                                    />
                                ))}
                                {pressShots.length < 5 && (
                                    <ImageUpload
                                        type="press_shot"
                                        bucket="press_shots"
                                        onUploadComplete={async (url) => { await addPressShot(url); }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 mt-6 border-t border-white/5 space-y-4">
                        <label className="block text-sm font-medium text-slate-300">Featured Mix URLs (Soundcloud/YouTube/Mixcloud)</label>
                        <p className="text-xs text-slate-500 mb-2">Add up to 3 featured mixes to showcase on your EPK.</p>

                        <input type="url" name="mixUrl1" defaultValue={featuredMixes[0] || ''} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" placeholder="Mix 1 URL" />
                        <input type="url" name="mixUrl2" defaultValue={featuredMixes[1] || ''} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" placeholder="Mix 2 URL (Optional)" />
                        <input type="url" name="mixUrl3" defaultValue={featuredMixes[2] || ''} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" placeholder="Mix 3 URL (Optional)" />
                    </div>
                </section>

                {/* 3. Bio */}
                <section className="glass-panel p-6 rounded-2xl border-white/5 space-y-6">
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Biography</h2>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Short Bio / Highlights</label>
                        <textarea name="shortBio" defaultValue={profile.short_bio || ''} rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Full Long Bio</label>
                        <textarea name="longBio" defaultValue={profile.long_bio || ''} rows={6} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none"></textarea>
                    </div>
                </section>

                {/* 4. Socials */}
                <section className="glass-panel p-6 rounded-2xl border-white/5 space-y-6">
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Social Links</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {['instagram', 'soundcloud', 'youtube', 'mixcloud', 'spotify', 'ra'].map((platform) => (
                            <div key={platform}>
                                <label className="block text-sm font-medium text-slate-300 mb-1 capitalize">
                                    {platform === 'ra' ? 'Resident Advisor' : platform}
                                </label>
                                <input type="url" name={platform} defaultValue={socials[platform] || ''} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Booking */}
                <section className="glass-panel p-6 rounded-2xl border-white/5 space-y-6">
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Booking & Contact</h2>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Contact Method</label>
                        <select name="bookingType" defaultValue={profile.booking_type || 'form'} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none">
                            <option value="form">Internal Booking Form (Requests go to Dashboard)</option>
                            <option value="email">Direct Mailto Link</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Public Contact Email</label>
                        <input type="email" name="publicEmail" defaultValue={profile.public_email || ''} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Agent/Manager Name <span className="text-slate-500 font-normal">(Optional)</span></label>
                            <input type="text" name="agentName" defaultValue={profile.agent_name || ''} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Rough Fee Range <span className="text-slate-500 font-normal">(Hidden)</span></label>
                            <select name="feeRange" defaultValue={profile.fee_range || ''} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none">
                                <option value="" disabled>Select range</option>
                                <option value="1">£100 - £250</option>
                                <option value="2">£250 - £500</option>
                                <option value="3">£500 - £1000</option>
                                <option value="4">£1000+</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Availability Notes <span className="text-slate-500 font-normal">(Optional)</span></label>
                        <textarea name="availabilityNotes" defaultValue={profile.availability_notes || ''} rows={2} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" placeholder="Available weekends only."></textarea>
                    </div>
                </section>
            </div>

            {/* Mobile Sticky Save Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950 border-t border-slate-800 sm:hidden z-50">
                <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-500 transition-colors disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                    Save Changes
                </button>
            </div>
        </form>
    );
}
