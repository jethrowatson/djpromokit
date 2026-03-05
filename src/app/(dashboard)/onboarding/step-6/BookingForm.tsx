'use client';

import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { saveStep6Booking } from "./actions";

interface ProfileDefaults {
    bookingType: "form" | "email";
    publicEmail: string;
    agentName: string;
    feeRange: string;
    availNotes: string;
}

export default function BookingForm({ defaults }: { defaults: ProfileDefaults }) {
    const [bookingType, setBookingType] = useState<"form" | "email">(defaults.bookingType);

    return (
        <form action={saveStep6Booking} className="space-y-8">
            <input type="hidden" name="bookingType" value={bookingType} />

            <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-300">
                    Preferred Contact Method <span className="text-red-400">*</span>
                </label>

                <div className="grid grid-cols-2 gap-4">
                    <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center text-center transition-all ${bookingType === 'form' ? 'bg-purple-600/20 border-purple-500 text-white shadow-[0_0_20px_-5px_#8b5cf6]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                        <input type="radio" className="sr-only" checked={bookingType === 'form'} onChange={() => setBookingType('form')} />
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mb-3">
                            <Mail className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-sm">Contact Form</span>
                        <span className="text-xs opacity-70 mt-1">Hides your email to prevent spam. Messages sent to your inbox.</span>
                    </label>

                    <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center text-center transition-all ${bookingType === 'email' ? 'bg-purple-600/20 border-purple-500 text-white shadow-[0_0_20px_-5px_#8b5cf6]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                        <input type="radio" className="sr-only" checked={bookingType === 'email'} onChange={() => setBookingType('email')} />
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mb-3 text-xl font-bold">@</div>
                        <span className="font-bold text-sm">Public Email</span>
                        <span className="text-xs opacity-70 mt-1">Displays a public "mailto:" link on your EPK.</span>
                    </label>
                </div>
            </div >

            {bookingType === "email" && (
                <div className="animate-slide-up">
                    <label htmlFor="public-email" className="block text-sm font-medium text-slate-300">
                        Public Booking Email <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            type="email"
                            name="public-email"
                            id="public-email"
                            required={bookingType === 'email'}
                            defaultValue={defaults.publicEmail}
                            className="block w-full pl-10 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm py-3 transition-colors"
                            placeholder="bookings@djmarcus.com"
                        />
                    </div>
                </div>
            )}

            {/* Optional details */}
            <div className="space-y-6 pt-4 border-t border-white/5">
                <h3 className="text-lg font-bold text-white">Extra Booking Details</h3>

                <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="agent-name" className="block text-sm font-medium text-slate-300">
                            Agent/Manager Name <span className="text-slate-500 text-xs font-normal">(Optional)</span>
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="agent-name"
                                id="agent-name"
                                defaultValue={defaults.agentName}
                                className="block w-full px-4 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm py-3 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="fee-range" className="block text-sm font-medium text-slate-300">
                            Rough Fee Range <span className="text-slate-500 text-xs font-normal">(Hidden from public)</span>
                        </label>
                        <div className="mt-1">
                            <select
                                id="fee-range"
                                name="fee-range"
                                className="block w-full px-4 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm py-3 transition-colors"
                                defaultValue={defaults.feeRange}
                            >
                                <option value="" disabled>Select range</option>
                                <option value="1">£100 - £250</option>
                                <option value="2">£250 - £500</option>
                                <option value="3">£500 - £1000</option>
                                <option value="4">£1000+</option>
                            </select>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">Only shared with SYNCdj platform later.</p>
                    </div>
                </div>

                <div>
                    <label htmlFor="avail-notes" className="block text-sm font-medium text-slate-300">
                        Availability Notes <span className="text-slate-500 text-xs font-normal">(Optional)</span>
                    </label>
                    <div className="mt-1">
                        <textarea
                            id="avail-notes"
                            name="avail-notes"
                            defaultValue={defaults.availNotes}
                            rows={2}
                            className="block w-full px-4 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm py-3 transition-colors"
                            placeholder="Available weekends only. No weddings."
                        />
                    </div>
                </div>
            </div>

            <div className="pt-8 flex justify-between items-center border-t border-white/5">
                <Link
                    href="/onboarding/step-5"
                    className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                </Link>
                <div className="flex gap-3">
                    <Link
                        href="/onboarding/step-7"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                        Skip
                    </Link>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all hover-glow"
                    >
                        Save and Continue
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                </div>
            </div>
        </form>
    );
}
