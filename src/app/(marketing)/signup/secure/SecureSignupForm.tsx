"use client";

import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { signup } from "../actions";

export default function SecureSignupForm({ email, profileUrl }: { email: string, profileUrl: string }) {
    return (
        <form className="space-y-6" action={signup}>
            {/* Hidden fields passed from Step 1 */}
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="profileUrl" value={profileUrl} />

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
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-slate-900 transition-colors hover-glow"
                >
                    Create Account
                    <ArrowRight className="ml-2 w-4 h-4" />
                </button>
            </div>
            
            <div className="mt-6 text-center text-xs text-slate-500">
                You can optionally publish your interactive EPK later for £10.99.
            </div>
        </form>
    );
}
