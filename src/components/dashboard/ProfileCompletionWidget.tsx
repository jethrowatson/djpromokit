'use client';

import { CheckCircle2, AlertCircle, ArrowRight, Camera, FileText, Link as LinkIcon, Headphones } from 'lucide-react';
import Link from 'next/link';

interface CompletionWidgetProps {
    profile: any;
    pressShotsCount: number;
    featuredMixesCount: number;
    socialLink: any;
}

export default function ProfileCompletionWidget({ profile, pressShotsCount, featuredMixesCount, socialLink }: CompletionWidgetProps) {
    const checks = [
        {
            key: 'bio',
            label: 'Write a Biography',
            isComplete: !!profile?.short_bio || !!profile?.long_bio,
            icon: <FileText className="w-4 h-4" />,
            tab: 'bio'
        },
        {
            key: 'photo',
            label: 'Add a Press Shot',
            isComplete: pressShotsCount > 0,
            icon: <Camera className="w-4 h-4" />,
            tab: 'photos'
        },
        {
            key: 'mix',
            label: 'Add a Featured Mix',
            isComplete: featuredMixesCount > 0,
            icon: <Headphones className="w-4 h-4" />,
            tab: 'mixes'
        },
        {
            key: 'social',
            label: 'Link Social Media',
            isComplete: !!(socialLink?.instagram || socialLink?.soundcloud || socialLink?.mixcloud || socialLink?.spotify || socialLink?.youtube),
            icon: <LinkIcon className="w-4 h-4" />,
            tab: 'socials'
        }
    ];

    const completedCount = checks.filter(c => c.isComplete).length;
    const totalChecks = checks.length;
    const progressPercent = Math.round((completedCount / totalChecks) * 100);

    const is100Percent = completedCount === totalChecks;

    const nextAction = checks.find(c => !c.isComplete);

    return (
        <div className={`glass-panel p-6 rounded-3xl relative overflow-hidden transition-colors ${is100Percent ? 'border-emerald-500/30 bg-emerald-900/10' : 'border-cyan-500/20'}`}>
            {is100Percent && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[50px] pointer-events-none"></div>
            )}
            
            <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-sm font-bold text-slate-300">Profile Completion</h3>
                <span className={`text-xl font-black ${is100Percent ? 'text-emerald-400' : 'text-cyan-400'}`}>
                    {progressPercent}%
                </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2.5 mb-6 relative z-10 overflow-hidden">
                <div 
                    className={`h-2.5 rounded-full transition-all duration-1000 ${is100Percent ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>

            <div className="space-y-3 relative z-10 mb-6">
                {checks.map((check) => (
                    <div key={check.key} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${check.isComplete ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                                {check.icon}
                            </div>
                            <span className={`text-sm ${check.isComplete ? 'text-slate-300' : 'text-slate-500'}`}>
                                {check.label}
                            </span>
                        </div>
                        {check.isComplete ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-slate-700"></div>
                        )}
                    </div>
                ))}
            </div>

            <div className="relative z-10 pt-4 border-t border-white/5">
                {is100Percent ? (
                    <div className="flex flex-col items-center justify-center text-center">
                        <p className="text-emerald-400 text-sm font-bold mb-2">Your EPK is ready to send to promoters!</p>
                        <Link href="/dashboard/profile" className="text-slate-400 hover:text-white text-xs inline-flex items-center gap-1 transition-colors">
                            Manage Content <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                ) : (
                    nextAction && (
                        <Link 
                            href={`/dashboard/profile?tab=${nextAction.tab}`}
                            className="w-full flex justify-between items-center py-3 px-4 rounded-xl font-bold border border-cyan-500/30 bg-cyan-900/20 text-cyan-400 hover:bg-cyan-900/40 hover:border-cyan-500/50 transition-colors shadow-sm"
                        >
                            Complete: {nextAction.label}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    )
                )}
            </div>
        </div>
    );
}
