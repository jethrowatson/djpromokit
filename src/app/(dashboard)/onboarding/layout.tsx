"use client";

import { usePathname } from "next/navigation";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    // Extract step number from path (e.g. /onboarding/step-3 -> 3)
    const stepMatch = pathname.match(/step-(\d)/);
    const currentStep = stepMatch ? parseInt(stepMatch[1], 10) : 1;

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
            {/* Dynamic background based on step */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <ProgressBar currentStep={currentStep} />

            <main className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-2xl mx-auto w-full glass-panel p-6 sm:p-10 rounded-2xl border-white/10 shadow-2xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
