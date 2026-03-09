"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyLinkWidget({ link }: { link: string }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };

    return (
        <div className="relative z-10 w-full animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2 sm:gap-3 w-full">
                <div className="flex-1 min-w-0 bg-slate-900 border border-purple-500/30 rounded-xl px-3 sm:px-4 py-3 flex items-center">
                    <span className="text-cyan-400 font-mono text-xs sm:text-sm md:text-lg truncate block w-full">
                        {link}
                    </span>
                </div>
                <button
                    onClick={handleCopy}
                    className={`flex-shrink-0 p-3 rounded-xl shadow-lg transition-all group relative overflow-hidden ${isCopied
                            ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-900/50'
                            : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/50'
                        }`}
                    title="Copy Link"
                >
                    {isCopied ? (
                        <Check className="w-5 h-5 sm:w-6 sm:h-6 scale-110" />
                    ) : (
                        <Copy className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                    )}
                </button>
            </div>

            <div className={`mt-2 h-4 px-1 text-sm font-medium transition-all duration-300 ${isCopied ? 'opacity-100 text-emerald-400 translate-y-0' : 'opacity-0 text-slate-500 -translate-y-1'}`}>
                Link copied to clipboard!
            </div>
        </div>
    );
}
