"use client";

import React, { useState } from "react";
import { Zap, X, CheckCircle2, Sparkles } from "lucide-react";
import { toggleSyncGigs } from "@/app/(dashboard)/dashboard/actions";

export default function SyncGigsWidget({ initialState = false }: { initialState?: boolean }) {
    const [enabled, setEnabled] = useState(initialState);
    const [isSaving, setIsSaving] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleClick = () => {
        if (!enabled) {
            // Initiate the mock signup process
            setIsModalOpen(true);
        } else {
            // Turning off is immediate
            executeToggle(false);
        }
    };

    const executeToggle = async (newState: boolean) => {
        setIsSaving(true);
        try {
            const res = await toggleSyncGigs(newState);
            if (res.success) {
                setEnabled(newState);
            }
        } catch (e) {
            console.error("Toggle failed", e);
        } finally {
            setIsSaving(false);
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <div className={`glass-panel p-6 rounded-2xl border-white/5 transition-colors group relative overflow-hidden ${enabled ? 'hover:border-emerald-500/30' : 'hover:border-cyan-500/30'}`}>
                {enabled && <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>}
                {!enabled && <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>}

                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${enabled ? 'bg-emerald-900/30 group-hover:bg-emerald-600/20' : 'bg-slate-800 group-hover:bg-cyan-600/20'}`}>
                        {enabled ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <Sparkles className="w-6 h-6 text-cyan-400" />}
                    </div>

                    {/* Tiny Switch */}
                    <button
                        onClick={handleToggleClick}
                        disabled={isSaving}
                        className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${enabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
                        aria-label="Toggle SYNCgigs Integration"
                    >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${enabled ? 'translate-x-4' : ''}`}></div>
                    </button>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 relative z-10">SYNCgigs Integration</h3>
                <p className="text-sm text-slate-400 mb-2 relative z-10">
                    {enabled ? "Your profile is actively linked and pushing updates to SYNCgigs." : "Connect to SYNCgigs to push your EPK updates straight to bookers."}
                </p>

                <div className="relative z-10 flex items-center justify-between mt-4">
                    {enabled ? (
                        <>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                                <CheckCircle2 className="w-3 h-3" /> Synced perfectly
                            </span>
                            <a
                                href="https://SYNCgigs.co.uk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold transition-colors border border-emerald-500/20"
                            >
                                Open SYNCgigs
                            </a>
                        </>
                    ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                            <Zap className="w-3 h-3" /> Ready to link
                        </span>
                    )}
                </div>
            </div>

            {/* Signup Mock Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[#0f172a] border border-cyan-500/30 rounded-3xl max-w-md w-full shadow-2xl p-6 relative animate-slide-up">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>

                        <div className="w-16 h-16 bg-cyan-900/30 border border-cyan-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-glow-cyan shadow-cyan-900/50">
                            <Sparkles className="w-8 h-8 text-cyan-400" />
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2">Create SYNC account</h2>
                        <p className="text-slate-300 mb-6">
                            By enabling this integration, we will dynamically provision a DJ profile for you on the SYNCgigs platform using your current email and details.
                        </p>

                        <div className="bg-slate-900 rounded-xl p-4 border border-white/5 mb-6">
                            <div className="flex justify-between items-center text-sm mb-2">
                                <span className="text-slate-400">Platform</span>
                                <span className="text-white font-bold">SYNCgigs.co.uk</span>
                            </div>
                            <div className="flex justify-between items-center text-sm mb-2">
                                <span className="text-slate-400">Action</span>
                                <span className="text-cyan-400 font-bold">Create Account & Link</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Data sharing</span>
                                <span className="text-white font-bold text-right max-w-[150px] truncate">Bio, Images, Mixes</span>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-300 bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => executeToggle(true)}
                                disabled={isSaving}
                                className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-900/50 flex items-center justify-center"
                            >
                                {isSaving ? (
                                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    "Accept & Link"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
