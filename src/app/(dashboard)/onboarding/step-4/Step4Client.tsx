'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Lightbulb, Sparkles } from "lucide-react";
import Link from "next/link";
import { saveStep4Bio } from "./actions";
import AIBioGenerator from '@/components/dashboard/AIBioGenerator';

interface Step4ClientProps {
    profile: any;
}

export default function Step4Client({ profile }: Step4ClientProps) {
    const [showAIGenerator, setShowAIGenerator] = useState(false);
    const [localShortBio, setLocalShortBio] = useState(profile?.short_bio || '');
    const [localLongBio, setLocalLongBio] = useState(profile?.long_bio || '');

    const handleAISave = async (newShortBio: string, newLongBio: string) => {
        // Update local state so form fields are populated
        setLocalShortBio(newShortBio);
        setLocalLongBio(newLongBio);
        setShowAIGenerator(false);

        // Execute the server action to save immediately behind the scenes
        const formData = new FormData();
        formData.append('shortBio', newShortBio);
        formData.append('longBio', newLongBio);
        await saveStep4Bio(formData);
    };

    if (showAIGenerator) {
        return (
            <div className="animate-fade-in">
                <AIBioGenerator
                    defaultValues={{
                        djName: profile?.name || '',
                        location: profile?.location || '',
                        genres: profile?.genres || []
                    }}
                    onSave={handleAISave}
                    onCancel={() => setShowAIGenerator(false)}
                />
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-white mb-2">Biography</h1>
                <p className="text-slate-400">Tell promoters who you are and where you've been.</p>
            </div>

            {/* Prominent AI Generator Hero Banner */}
            <div className="relative w-full overflow-hidden rounded-2xl mb-8 p-[1px] group">
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Card Content */}
                <div className="relative glass-panel bg-[#020617]/90 backdrop-blur-xl w-full rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-none">
                    <div className="flex gap-4 items-start">
                        <div className="bg-purple-600/20 p-3 rounded-2xl shrink-0 mt-1 shadow-lg shadow-purple-500/10">
                            <Sparkles className="w-8 h-8 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white mb-1">Writer's Block? Let AI Do It.</h3>
                            <p className="text-slate-400 text-sm max-w-md">
                                Answer 6 quick questions about your style, background, and goals. Our custom AI will instantly generate a professional DJ biography ready to publish.
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowAIGenerator(true)}
                        className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-purple-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-purple-900/50 hover:bg-purple-500 transition-all hover-glow group/btn"
                    >
                        <Sparkles className="w-4 h-4 mr-2 text-purple-200 group-hover/btn:text-white transition-colors" />
                        Generate with AI
                    </button>
                </div>
            </div>

            <div className="glass-panel p-4 rounded-xl border-purple-500/20 bg-purple-900/10 mb-8 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-sm font-bold text-purple-200 mb-1">How to write a great DJ bio</h4>
                    <p className="text-sm text-purple-200/70">
                        Keep the short bio to 2-3 sentences max. Focus on your sound, your biggest achievement, and where you're from. Use the long bio for your full history and residencies.
                    </p>
                </div>
            </div>

            <form action={saveStep4Bio} className="space-y-6">
                <div>
                    <label htmlFor="short-bio" className="block text-sm font-medium text-slate-300">
                        Short Bio <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-1">
                        <textarea
                            id="shortBio"
                            name="shortBio"
                            required
                            value={localShortBio}
                            onChange={(e) => setLocalShortBio(e.target.value)}
                            rows={3}
                            className="block w-full px-4 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm py-3 transition-colors"
                            placeholder="E.g. Based in London, DJ Marcus is known for high-energy tech house sets. With previous residencies at Fabric and Ministry of Sound, he brings..."
                        />
                    </div>
                    <p className="mt-2 text-xs text-slate-500 text-right">0 / 200 words</p>
                </div>

                <div>
                    <label htmlFor="long-bio" className="block text-sm font-medium text-slate-300">
                        Long Bio <span className="text-slate-500 text-sm font-normal">(Optional)</span>
                    </label>
                    <div className="mt-1">
                        <textarea
                            id="longBio"
                            name="longBio"
                            value={localLongBio}
                            onChange={(e) => setLocalLongBio(e.target.value)}
                            rows={8}
                            className="block w-full px-4 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm py-3 transition-colors"
                            placeholder="Your full background, influences, and notable gigs..."
                        />
                    </div>
                    <p className="mt-2 text-xs text-slate-500 text-right">0 / 600 words</p>
                </div>

                <div className="pt-8 flex justify-between items-center border-t border-white/5">
                    <Link
                        href="/onboarding/step-3"
                        className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Back
                    </Link>
                    <div className="flex gap-3">
                        <Link
                            href="/onboarding/step-5"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                        >
                            Skip
                        </Link>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all hover-glow"
                        >
                            Save and Continue
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
