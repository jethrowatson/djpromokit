"use client";

import Link from "next/link";
import { Mail, ArrowRight, Lock } from "lucide-react";
import { signup } from "./actions";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

export default function SignupForm() {
    return (
        <div className="space-y-6">
            
            {/* Google OAuth Button */}
            <GoogleLoginButton text="signup_with" />

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-slate-900 text-slate-400">Or continue with email</span>
                </div>
            </div>

            {/* Manual Email Signup */}
            <form action={signup} className="space-y-6">
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
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-slate-900 transition-colors hover-glow"
                    >
                        Create Account
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                </div>
            </form>
            
            <div className="mt-6 text-center text-xs text-slate-500">
                You can optionally publish your interactive EPK later for £5.99.
            </div>
        </div>
    );
}
