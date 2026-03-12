"use client";

import Link from "next/link";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { continueToSecureSignup } from "./actions";

export default function SignupForm() {
    return (
        <form
            className="space-y-6"
            action={continueToSecureSignup}
            onSubmit={() => {
                if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'CompleteRegistration_Step1');
                }
            }}
        >

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                    Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        className="block w-full pl-10 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm py-3 transition-colors"
                        placeholder="hello@example.com"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="profileUrl" className="block text-sm font-medium text-slate-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" /> Profile URL <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <p className="text-xs text-slate-500 mt-1 mb-2">Drop any link (Instagram, Resident Advisor, Soundcloud). We'll use AI to automagically build your EPK for you.</p>
                <div className="relative rounded-md shadow-sm">
                    <input
                        id="profileUrl"
                        name="profileUrl"
                        type="url"
                        className="block w-full px-4 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm py-3 transition-colors"
                        placeholder="https://instagram.com/djmarcus"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-slate-900 transition-colors hover-glow"
                >
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                </button>
            </div>
        </form>
    );
}
