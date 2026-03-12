"use client";

import Link from "next/link";
import { Mail, ArrowRight, Lock } from "lucide-react";
import { signup, signInWithGoogle } from "./actions";

export default function SignupForm() {
    return (
        <div className="space-y-6">
            
            {/* Google OAuth Button */}
            <form action={signInWithGoogle}>
                <button
                    type="submit"
                    className="w-full flex justify-center items-center py-3 px-4 border border-slate-700 hover:border-slate-500 rounded-lg shadow-sm text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-slate-900 transition-colors"
                >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                </button>
            </form>

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
                You can optionally publish your interactive EPK later for £10.99.
            </div>
        </div>
    );
}
