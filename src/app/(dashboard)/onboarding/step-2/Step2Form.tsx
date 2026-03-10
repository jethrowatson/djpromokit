'use client'

import { PlayCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { saveStep2Mix } from "./actions";
import MixEmbed from "@/components/ui/MixEmbed";

export default function Step2Form({ existingMixUrl }: { existingMixUrl: string }) {
    return (
        <form action={saveStep2Mix} className="space-y-6">
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
                        name="mixLink"
                        id="mixLink"
                        defaultValue={existingMixUrl}
                        className="block w-full pl-10 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm py-3 transition-colors"
                        placeholder="https://soundcloud.com/djmarcus/summer-mix-2024"
                    />
                </div>
            </div>

            {existingMixUrl && (
                <div className="mt-6">
                    <span className="text-sm text-slate-500 mb-4 block font-bold uppercase tracking-wider">Current Embed</span>
                    <div className="animate-fade-in shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10">
                        <MixEmbed url={existingMixUrl} />
                    </div>
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
    );
}
