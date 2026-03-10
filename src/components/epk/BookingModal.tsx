'use client';

import { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    djName: string;
    djUsername: string;
}

export default function BookingModal({ isOpen, onClose, djName, djUsername }: BookingModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const data = {
            djName,
            djUsername,
            senderName: formData.get('senderName'),
            senderEmail: formData.get('senderEmail'),
            date: formData.get('date'),
            location: formData.get('location'),
            eventType: formData.get('eventType'),
            offer: formData.get('offer'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to send request');
            }

            // Fire Meta Pixel tracking event
            if (typeof window !== 'undefined' && (window as any).fbq) {
                (window as any).fbq('track', 'Contact');
            }

            setStatus('success');
            // Auto close after 3 seconds on success
            setTimeout(() => {
                onClose();
                setStatus('idle');
            }, 3000);

        } catch (error: any) {
            console.error("Booking submission error:", error);
            setStatus('error');
            setErrorMessage(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-900 border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-900 absolute top-0 left-0 right-0 z-10 shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-white">Book {djName}</h2>
                        <p className="text-sm text-slate-400 mt-1">Send a direct inquiry to their team.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto mt-[88px]">
                    {status === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center animate-slide-up">
                            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6">
                                <Send className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Request Sent!</h3>
                            <p className="text-slate-400">
                                Your booking inquiry has been forwarded directly to {djName}. They will be in touch shortly.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {status === 'error' && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Your Name / Agent <span className="text-red-400">*</span></label>
                                    <input required type="text" name="senderName" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address <span className="text-red-400">*</span></label>
                                    <input required type="email" name="senderEmail" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all" placeholder="john@agency.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Event Date <span className="text-red-400">*</span></label>
                                    <input required type="date" name="date" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all [color-scheme:dark]" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Location / Venue <span className="text-red-400">*</span></label>
                                    <input required type="text" name="location" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all" placeholder="City or Venue Name" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Event Type <span className="text-red-400">*</span></label>
                                    <select required name="eventType" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all appearance-none cursor-pointer">
                                        <option value="">Select Type...</option>
                                        <option value="Club Night">Club Night</option>
                                        <option value="Festival">Festival</option>
                                        <option value="Private Event">Private Event</option>
                                        <option value="Corporate">Corporate</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Offer Amount (Optional)</label>
                                    <input type="text" name="offer" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all" placeholder="$ / £ / €" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Message / Details <span className="text-red-400">*</span></label>
                                <textarea required name="message" rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all resize-none" placeholder="Provide any additional details about the event, set time, logistics, etc."></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center py-4 rounded-xl bg-purple-600 text-white font-bold text-lg hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/50 disabled:opacity-50 mt-4"
                            >
                                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Send Request'}
                            </button>
                            <p className="text-xs text-center text-slate-500 mt-3">Information is sent securely via DJ Promo Kit.</p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
