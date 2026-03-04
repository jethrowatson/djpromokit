"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, PlayCircle, Info } from "lucide-react";
import { useState } from "react";

export default function Step2Mix() {
    const [mixLink, setMixLink] = useState("");

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white mb-2">Your Best Mix</h1>
                <p className="text-slate-400">Paste a link to your best mix. We'll embed it right at the top of your EPK.</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border-cyan-500/20 bg-cyan-900/10 mb-8 flex items-start gap-3">
                <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-sm text-cyan-100">
                    Right now, we support links from <strong>SoundCloud, Mixcloud, and YouTube</strong>. The player will be auto-generated.
                </p>
            </div>

            <form className="space-y-6">
                <div>
                    <label htmlFor="mix-link" className="block text-sm font-medium text-slate-300">
                        Mix Link <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <PlayCircle className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            type="url"
                            name="mix-link"
                            id="mix-link"
                            value={mixLink}
                            onChange={(e) => setMixLink(e.target.value)}
                            className="block w-full pl-10 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm py-3 transition-colors"
                            placeholder="https://soundcloud.com/djmarcus/summer-mix-2024"
                        />
                    </div>
                </div>

                {/* Mock Preview Area */}
                {mixLink && (
                    <div className="mt-6 p-4 border border-white/5 rounded-xl bg-slate-900 flex flex-col items-center justify-center min-h-[160px] animate-slide-up">
                        <span className="text-sm text-slate-500 mb-2 font-mono">Simulated embed preview for:</span>
                        <span className="text-cyan-400 text-xs truncate max-w-full px-4">{mixLink}</span>
                        <div className="w-full max-w-[400px] h-1 bg-slate-800 rounded mt-4 overflow-hidden"><div className="w-1/3 h-full bg-purple-500"></div></div>
                    </div>
                )}

                <div className="pt-8 flex justify-between items-center border-t border-white/5">
                    <Link
                        href="/onboarding/step-1"
                        className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Back
                    </Link>
                    <div className="flex gap-3">
                        <Link
                            href="/onboarding/step-3"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                        >
                            Skip
                        </Link>
                        <Link
                            href="/onboarding/step-3"
                            className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all hover-glow"
                        >
                            Save and Continue
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
