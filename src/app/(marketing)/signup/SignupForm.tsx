"use client";

import Link from "next/link";
import { Mail, Lock, User, AtSign, ArrowRight } from "lucide-react";
import { signup } from "./actions";

export default function SignupForm() {
    return (
        <form
            className="space-y-6"
            action={signup}
            onSubmit={() => {
                if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'CompleteRegistration');
                }
            }}
        >
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="dj-name" className="block text-sm font-medium text-slate-300">
                        DJ Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            id="dj-name"
                            name="djName"
                            type="text"
                            required
                            className="block w-full pl-10 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm py-3 transition-colors"
                            placeholder="DJ Marcus"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-slate-300">
                        Username
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <AtSign className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="block w-full pl-10 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm py-3 transition-colors"
                            placeholder="djmarcus"
                        />
                    </div>
                    <p className="mt-1 text-xs text-slate-500 text-right pr-1">djpromokit.com/djmarcus</p>
                </div>
            </div>

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
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                    Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="block w-full pl-10 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm py-3 transition-colors"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <div className="flex items-center">
                <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-slate-700 rounded bg-slate-900"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-slate-300">
                    I agree to the <Link href="/terms" target="_blank" className="text-cyan-400 hover:text-cyan-300">Terms of Service</Link> and <Link href="/privacy" target="_blank" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</Link>
                </label>
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-900 transition-colors"
                >
                    Create draft profile
                    <ArrowRight className="ml-2 w-4 h-4" />
                </button>
            </div>

            <div className="mt-6 text-center text-xs text-slate-500">
                Free to build. £10.99 to publish. Secure payments via Stripe.
            </div>
        </form>
    );
}
