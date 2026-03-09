'use client';

import { useState } from 'react';
import { Sparkles, Edit3 } from 'lucide-react';
import Link from 'next/link';
import AIBioGenerator from '@/components/dashboard/AIBioGenerator';
import { saveDashboardBio } from './actions';

interface BioDashboardProps {
    profile: any;
}

export default function BioDashboardSection({ profile }: BioDashboardProps) {
    const [showAI, setShowAI] = useState(false);
    const hasBio = !!profile?.short_bio || !!profile?.long_bio;

    const handleSave = async (short: string, long: string) => {
        await saveDashboardBio(short, long);
        setShowAI(false);
    };

    if (showAI) {
        return (
            <div className="mb-8 mt-12 animate-fade-in">
                <AIBioGenerator
                    defaultValues={{
                        djName: profile?.name || '',
                        location: profile?.location || '',
                        genres: profile?.genres || []
                    }}
                    onSave={handleSave}
                    onCancel={() => setShowAI(false)}
                />
            </div>
        );
    }

    return (
        <div className="mb-8 mt-12 animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-4">Your Biography</h2>

            {hasBio ? (
                <div className="glass-panel p-6 rounded-3xl border-white/5 space-y-4 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="flex items-center justify-between relative z-10">
                        <h3 className="text-sm font-bold text-slate-300">Short Bio Preview</h3>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowAI(true)}
                                className="inline-flex items-center text-xs font-bold text-purple-400 hover:text-purple-300 bg-purple-900/20 hover:bg-purple-900/40 border border-purple-500/20 px-3 py-1.5 rounded-lg transition-colors"
                            >
                                <Sparkles className="w-3.5 h-3.5 mr-1" /> Use AI Generator
                            </button>
                            <Link
                                href="/dashboard/edit"
                                className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-white/10 px-3 py-1.5 rounded-lg transition-colors"
                            >
                                <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit Manual
                            </Link>
                        </div>
                    </div>

                    <p className="text-slate-200 text-sm leading-relaxed border-l-2 border-purple-500 pl-3 py-1 relative z-10">
                        {profile?.short_bio || <span className="text-slate-500 italic">No short bio written yet. Fill one out to improve your EPK.</span>}
                    </p>
                </div>
            ) : (
                <div className="glass-panel p-8 rounded-3xl border-purple-500/30 bg-purple-900/10 text-center flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[50px] pointer-events-none"></div>

                    <div className="w-12 h-12 bg-purple-600/20 text-purple-400 rounded-xl flex items-center justify-center mb-4 relative z-10">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 relative z-10">Create your DJ biography in minutes with AI.</h3>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto relative z-10">
                        Answer a few questions about your sound, influences, and experience, and our AI will instantly generate an engaging biography ready for your press kit.
                    </p>
                    <button
                        onClick={() => setShowAI(true)}
                        className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-purple-500 transition-all hover-glow relative z-10"
                    >
                        Generate with AI <Sparkles className="w-4 h-4 ml-2" />
                    </button>
                </div>
            )}
        </div>
    );
}
