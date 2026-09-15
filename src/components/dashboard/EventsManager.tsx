'use client';

import React, { useState, useTransition } from 'react';
import { Calendar, MapPin, Ticket, Trash2, Plus, ExternalLink, Loader2, CalendarDays } from 'lucide-react';
import { addUpcomingEvent, deleteUpcomingEvent } from '@/app/(dashboard)/dashboard/profile/events-actions';

export interface GigItem {
    id: string;
    venue: string;
    date: string;
    details?: string | null;
    ticket_url?: string | null;
    is_upcoming?: boolean;
}

export default function EventsManager({ initialGigs = [] }: { initialGigs: GigItem[] }) {
    const [gigs, setGigs] = useState<GigItem[]>(initialGigs);
    const [isPending, startTransition] = useTransition();
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg(null);
        setSuccessMsg(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        startTransition(async () => {
            const res = await addUpcomingEvent(formData);
            if (!res.success) {
                setErrorMsg(res.error || 'Failed to add event.');
            } else {
                setSuccessMsg('Event added to your EPK!');
                form.reset();
                // Optimistically update local list until page revalidation syncs
                const newVenue = formData.get('venue') as string;
                const newDate = formData.get('date') as string;
                const newDetails = formData.get('details') as string;
                const newTicketUrl = formData.get('ticketUrl') as string;
                
                setGigs(prev => [
                    ...prev,
                    {
                        id: `temp-${Date.now()}`,
                        venue: newVenue,
                        date: newDate,
                        details: newDetails || null,
                        ticket_url: newTicketUrl || null,
                        is_upcoming: true
                    }
                ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));

                setTimeout(() => setSuccessMsg(null), 4000);
            }
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to remove this event?')) return;
        setDeletingId(id);

        const res = await deleteUpcomingEvent(id);
        if (!res.success) {
            alert(res.error || 'Could not delete event.');
        } else {
            setGigs(prev => prev.filter(g => g.id !== id));
        }
        setDeletingId(null);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-4">
                <h2 className="text-2xl font-extrabold text-white">Upcoming Events & Tour Dates</h2>
                <p className="text-slate-400 text-sm sm:text-base">
                    Promote your upcoming shows, club nights, and festival appearances with direct ticket links.
                </p>
            </div>

            {/* Add Event Form */}
            <form onSubmit={handleSubmit} className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/5 space-y-4 bg-slate-900/60">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-purple-400" /> Add New Event
                </h3>

                {errorMsg && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
                        {errorMsg}
                    </div>
                )}
                {successMsg && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-xl">
                        {successMsg}
                    </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                            Venue / Event Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="venue"
                            required
                            placeholder="e.g. Printworks, Fabric, Amnesia"
                            className="block w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                            Date <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="date"
                            name="date"
                            required
                            className="block w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                            City / Details / Set Time <span className="text-slate-500 font-normal">(Optional)</span>
                        </label>
                        <input
                            type="text"
                            name="details"
                            placeholder="e.g. London, UK • Main Room 01:00 - 03:00"
                            className="block w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                            Ticket Link <span className="text-slate-500 font-normal">(Optional)</span>
                        </label>
                        <input
                            type="text"
                            name="ticketUrl"
                            placeholder="https://ra.co/events/... or skiddle.com"
                            className="block w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-purple-900/30"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Adding...
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4" /> Save Event
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* List of Existing Events */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-purple-400" /> Scheduled Events ({gigs.length})
                </h3>

                {gigs.length === 0 ? (
                    <div className="p-8 border border-white/5 bg-slate-900/40 rounded-2xl text-center">
                        <Calendar className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                        <p className="text-slate-400 font-medium">No upcoming events listed yet.</p>
                        <p className="text-slate-500 text-xs mt-1">Add your upcoming gigs above and they will appear on your public EPK.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {gigs.map((gig) => {
                            let formattedDate = gig.date;
                            try {
                                const d = new Date(gig.date + 'T00:00:00');
                                formattedDate = d.toLocaleDateString('en-GB', {
                                    weekday: 'short',
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                });
                            } catch (e) {}

                            return (
                                <div
                                    key={gig.id}
                                    className="p-4 rounded-2xl bg-slate-900 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/10 transition-colors"
                                >
                                    <div className="flex items-start sm:items-center gap-3.5">
                                        <div className="w-11 h-11 rounded-xl bg-purple-600/10 border border-purple-500/20 flex flex-col items-center justify-center shrink-0 text-purple-400">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-base leading-snug">{gig.venue}</h4>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-0.5">
                                                <span className="font-semibold text-slate-300">{formattedDate}</span>
                                                {gig.details && (
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3 text-cyan-400" /> {gig.details}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                        {gig.ticket_url && (
                                            <a
                                                href={gig.ticket_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
                                            >
                                                <Ticket className="w-3.5 h-3.5" /> Ticket Link <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(gig.id)}
                                            disabled={deletingId === gig.id}
                                            className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                            title="Delete event"
                                        >
                                            {deletingId === gig.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                                            ) : (
                                                <Trash2 className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
