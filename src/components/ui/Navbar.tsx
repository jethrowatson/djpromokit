"use client";

import Link from "next/link";
import { useState } from "react";
import { AudioWaveform, Menu, X } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/90 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <AudioWaveform className="w-8 h-8 text-purple-500 group-hover:text-cyan-400 transition-colors duration-300" />
                            <span className="font-bold text-xl tracking-tight text-white">DJ Promo Kit</span>
                        </Link>
                    </div>

                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
                        <Link href="/how-it-works" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">How it works</Link>
                        <Link href="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</Link>
                        <Link href="/examples" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Examples</Link>
                        <Link href="/sync" className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1">
                            SYNCdj <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 ring-1 ring-inset ring-cyan-500/20">NEW</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log in</Link>
                        <Link href="/signup" className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all hover-glow">Start free</Link>
                    </div>

                    <div className="flex md:hidden items-center">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-300 hover:text-white p-2"
                        >
                            <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
                            {isOpen ? (
                                <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            {isOpen && (
                <div className="md:hidden border-t border-white/10 bg-[#020617] shadow-2xl absolute w-full left-0 top-16">
                    <div className="pt-2 pb-6 px-4 space-y-1">
                        <Link
                            href="/how-it-works"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-4 text-base font-bold text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                            How it works
                        </Link>
                        <Link
                            href="/pricing"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-4 text-base font-bold text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/examples"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-4 text-base font-bold text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                            Examples
                        </Link>
                        <Link
                            href="/sync"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between px-3 py-4 text-base font-bold text-white hover:bg-white/5 rounded-xl transition-colors group"
                        >
                            SYNCdj
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20">NEW</span>
                        </Link>

                        <div className="pt-6 pb-2 border-t border-white/10 mt-4 px-1 gap-4 flex flex-col">
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center px-4 py-3 text-base font-bold text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-colors border border-slate-700/50"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/signup"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center rounded-xl bg-purple-600 px-4 py-3 text-base font-bold text-white shadow-sm hover:bg-purple-500 transition-all"
                            >
                                Start free
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
