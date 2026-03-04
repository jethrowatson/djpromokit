"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lock, Eye, CreditCard } from "lucide-react";

export default function Step7Preview() {
    const isComplete = true; // Mock completeness

    return (
        <div className="animate-fade-in">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-white mb-2">You're ready.</h1>
                <p className="text-slate-400">Preview your EPK and publish it to the world.</p>
            </div>

            {/* Mock EPK Preview Card */}
            <div className="glass-panel p-2 rounded-3xl border-white/10 mb-8 relative overflow-hidden group">
                {/* Watermark */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none bg-black/40 backdrop-blur-[2px]">
                    <div className="border-4 border-white/20 rounded-xl px-6 py-3 -rotate-12">
                        <span className="text-3xl font-black text-white/40 tracking-widest uppercase">Draft Mode</span>
                    </div>
                </div>

                {/* Mini EPK visual */}
                <div className="w-full h-[400px] bg-slate-900 rounded-2xl relative overflow-hidden pointer-events-none opacity-80">
                    <div className="h-48 bg-gradient-to-br from-purple-600 to-cyan-600 relative">
                        <div className="absolute -bottom-10 left-6 w-24 h-24 rounded-full border-4 border-slate-900 bg-slate-800"></div>
                    </div>
                    <div className="pt-14 px-6">
                        <div className="h-6 w-1/3 bg-slate-800 rounded mb-2"></div>
                        <div className="h-4 w-1/4 bg-slate-800 rounded mb-6"></div>
                        <div className="h-24 w-full bg-slate-800 rounded mb-4"></div>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="h-16 bg-slate-800 rounded"></div>
                            <div className="h-16 bg-slate-800 rounded"></div>
                            <div className="h-16 bg-slate-800 rounded"></div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-4 right-4 z-30">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/80 backdrop-blur text-white text-sm font-bold border border-white/10 hover:bg-slate-800 transition-colors pointer-events-auto">
                        <Eye className="w-4 h-4" /> Full Screen Preview
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-slate-900/50 rounded-xl p-6 border border-white/5 shadow-inner">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-slate-400" /> Your Private Link
                    </h3>
                    <div className="flex bg-slate-900 rounded-lg p-3 border border-slate-700">
                        <span className="text-slate-500 font-mono truncate">djpromokit.com/dj/djmarcus</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">This link is disabled until you publish your EPK.</p>
                </div>

                <div className="bg-purple-900/10 rounded-xl p-6 border border-purple-500/20 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Publish for £10.99</h3>
                    <p className="text-slate-300 text-sm mb-6">
                        Pay once. Keep it live forever. Unlock the PDF export and auto-sync with SYNCdj.co.uk.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <button className="w-full flex items-center justify-center rounded-xl bg-purple-600 px-8 py-4 text-lg font-bold text-white shadow-[0_0_30px_-5px_#8b5cf6] hover:bg-purple-500 transition-all hover:-translate-y-1">
                            <CreditCard className="mr-2 w-5 h-5" />
                            Pay & Publish Now
                        </button>

                        <Link href="/dashboard" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
                            I'll do this later, take me to dashboard
                        </Link>
                    </div>
                </div>

                <div className="pt-4 flex justify-start">
                    <Link
                        href="/onboarding/step-6"
                        className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Back to Booking
                    </Link>
                </div>
            </div>
        </div>
    );
}
