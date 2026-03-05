'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Mail, CalendarDays, MapPin, Music, CheckCircle, XCircle, Clock4, Check, X, Edit2 } from "lucide-react";
import { updateRequestStatus, updateRequestDateTime } from './actions';

export default function RequestCard({ request }: { request: any }) {
    const [status, setStatus] = useState(request.status);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isEditingDateTime, setIsEditingDateTime] = useState(false);
    const [editDate, setEditDate] = useState(request.event_date);
    const [editTime, setEditTime] = useState(request.event_time || '');

    const handleStatusUpdate = async (newStatus: string) => {
        setIsUpdating(true);
        try {
            const formData = new FormData();
            formData.append('requestId', request.id);
            formData.append('status', newStatus);

            const result = await updateRequestStatus(formData);
            if (result.success) {
                setStatus(newStatus);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDateTimeUpdate = async () => {
        setIsUpdating(true);
        try {
            const formData = new FormData();
            formData.append('requestId', request.id);
            formData.append('eventDate', editDate);
            if (editTime) formData.append('eventTime', editTime);

            const result = await updateRequestDateTime(formData);
            if (result.success) {
                setIsEditingDateTime(false);
                request.event_date = editDate;
                request.event_time = editTime;
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    const statusConfig = {
        pending: { color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-500/30', icon: Clock4, label: 'Pending' },
        accepted: { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-500/30', icon: CheckCircle, label: 'Accepted' },
        declined: { color: 'text-slate-400', bg: 'bg-slate-700', border: 'border-slate-600', icon: XCircle, label: 'Declined' }
    };

    const StatusIcon = statusConfig[status as keyof typeof statusConfig].icon;

    return (
        <div className={`glass-panel rounded-2xl p-6 transition-all duration-300 ${status === 'pending' ? 'border-amber-500/30 shadow-[0_0_15px_-5px_rgba(251,191,36,0.2)]' : 'border-white/5 opacity-80'}`}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 pb-6 border-b border-slate-800">
                <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-xl font-black text-cyan-400 uppercase">
                        {request.sender_name.substring(0, 1)}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">{request.sender_name}</h3>
                        <a href={`mailto:${request.sender_email}`} className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {request.sender_email}
                        </a>
                        <p className="text-xs text-slate-500 mt-2">Received {format(new Date(request.created_at), 'MMM d, yyyy')}</p>
                    </div>
                </div>

                {/* Status Badge & Actions */}
                <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold border ${statusConfig[status as keyof typeof statusConfig].bg} ${statusConfig[status as keyof typeof statusConfig].color} ${statusConfig[status as keyof typeof statusConfig].border}`}>
                        <StatusIcon className="w-4 h-4" />
                        {statusConfig[status as keyof typeof statusConfig].label}
                    </div>

                    {status === 'pending' && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleStatusUpdate('accepted')}
                                disabled={isUpdating}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold text-sm transition-colors border border-emerald-500/30 inline-flex items-center gap-1">
                                <Check className="w-4 h-4" /> Accept
                            </button>
                            <button
                                onClick={() => handleStatusUpdate('declined')}
                                disabled={isUpdating}
                                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition-colors border border-slate-700 inline-flex items-center gap-1">
                                <X className="w-4 h-4" /> Decline
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Event Details */}
            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 mb-6 relative">

                {/* Edit Date/Time Modal overlay */}
                {isEditingDateTime && (
                    <div className="absolute inset-0 z-10 bg-slate-900/95 backdrop-blur-sm rounded-xl border border-slate-700 p-6 flex flex-col justify-center">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2"><CalendarDays className="w-5 h-5 text-cyan-400" /> Reschedule Event</h4>
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">New Date</label>
                                <input
                                    type="date"
                                    value={editDate}
                                    onChange={(e) => setEditDate(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">New Time (Optional)</label>
                                <input
                                    type="time"
                                    value={editTime}
                                    onChange={(e) => setEditTime(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => setIsEditingDateTime(false)}
                                className="px-4 py-2 rounded-lg text-slate-400 hover:text-white transition-colors text-sm font-bold">
                                Cancel
                            </button>
                            <button
                                onClick={handleDateTimeUpdate}
                                disabled={isUpdating}
                                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black transition-colors text-sm">
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex items-start gap-3 group">
                    <CalendarDays className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-slate-500 font-medium">Event Date</p>
                            <button onClick={() => setIsEditingDateTime(true)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-800 rounded text-slate-400 transition-all">
                                <Edit2 className="w-3 h-3" />
                            </button>
                        </div>
                        <p className="text-slate-200">
                            {format(new Date(request.event_date), 'EEEE, MMMM do, yyyy')}
                            {request.event_time && ` at ${request.event_time.substring(0, 5)}`}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Location</p>
                        <p className="text-slate-200">{request.location}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Music className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Event Type</p>
                        <p className="text-slate-200 capitalize">{request.event_type.replace('_', ' ')}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <span className="w-5 h-5 font-black text-slate-500 flex-shrink-0 flex items-center justify-center mt-0.5">£</span>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Proposed Fee</p>
                        <p className="text-slate-200 font-bold text-emerald-400">{request.offer ? `£${request.offer}` : 'To be discussed'}</p>
                    </div>
                </div>
            </div>

            {/* Message Block */}
            {request.message && (
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 relative">
                    <div className="absolute top-0 left-6 -translate-y-1/2 bg-slate-950 px-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Message from Promoter
                    </div>
                    <p className="text-slate-300 italic text-sm leading-relaxed whitespace-pre-wrap pt-2">
                        "{request.message}"
                    </p>
                </div>
            )}
        </div>
    );
}
