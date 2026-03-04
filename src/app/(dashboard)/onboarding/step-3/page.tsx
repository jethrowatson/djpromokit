"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Image as ImageIcon, UploadCloud } from "lucide-react";

export default function Step3Photos() {
    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white mb-2">Photos</h1>
                <p className="text-slate-400">High-quality photos make the difference between looking like a hobbyist and a pro.</p>
            </div>

            <div className="space-y-8">
                {/* Profile Image */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Profile Photo <span className="text-red-400">*</span></h3>
                    <p className="text-sm text-slate-400 mb-4">This will be the main image on your EPK.</p>

                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-dashed border-slate-600 flex items-center justify-center shrink-0">
                            <UserAvatarPlaceholder />
                        </div>
                        <div className="flex-1">
                            <button className="inline-flex items-center justify-center rounded-lg glass-panel border-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/5 transition-colors w-full sm:w-auto">
                                <UploadCloud className="w-4 h-4 mr-2 text-purple-400" />
                                Upload Image
                            </button>
                            <p className="text-xs text-slate-500 mt-2">Square, max 5MB. JPG or PNG.</p>
                        </div>
                    </div>
                </div>

                <hr className="border-white/5" />

                {/* Press Shots */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Press Shots <span className="text-slate-500 font-normal text-sm">(Optional)</span></h3>
                    <p className="text-sm text-slate-400 mb-4">Promoters will be able to download these in high-res for their flyers.</p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {/* Add button */}
                        <div className="aspect-[4/3] rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/50 hover:bg-slate-800 transition-colors flex flex-col items-center justify-center cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-purple-600 transition-colors flex items-center justify-center mb-2">
                                <span className="text-xl text-white font-light">+</span>
                            </div>
                            <span className="text-xs text-slate-400 group-hover:text-white transition-colors">Add Photo</span>
                        </div>

                        {/* Placeholders for visuals */}
                        <div className="aspect-[4/3] rounded-xl bg-slate-800 flex items-center justify-center opacity-50">
                            <ImageIcon className="w-6 h-6 text-slate-600" />
                        </div>
                        <div className="aspect-[4/3] rounded-xl bg-slate-800 flex items-center justify-center opacity-50">
                            <ImageIcon className="w-6 h-6 text-slate-600" />
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-3">You can upload up to 5 additional images.</p>
                </div>

                <div className="pt-8 flex justify-between items-center border-t border-white/5">
                    <Link
                        href="/onboarding/step-2"
                        className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Back
                    </Link>
                    <div className="flex gap-3">
                        <Link
                            href="/onboarding/step-4"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                        >
                            Skip
                        </Link>
                        <Link
                            href="/onboarding/step-4"
                            className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all hover-glow"
                        >
                            Save and Continue
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function UserAvatarPlaceholder() {
    return (
        <svg className="w-10 h-10 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}
