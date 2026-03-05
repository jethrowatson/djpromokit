import Link from "next/link";
import { AudioWaveform, CheckCircle2 } from "lucide-react";

export function ProgressBar({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: "Basics", weight: 15 },
    { num: 2, label: "Mix", weight: 20 },
    { num: 3, label: "Photos", weight: 15 },
    { num: 4, label: "Bio", weight: 15 },
    { num: 5, label: "Socials", weight: 10 },
    { num: 6, label: "Booking", weight: 10 },
    { num: 7, label: "Preview", weight: 15 },
  ];

  const totalProgress = steps.reduce(
    (acc, step) => (step.num < currentStep ? acc + step.weight : acc),
    0
  );

  return (
    <div className="w-full bg-slate-900 border-b border-white/5 py-4 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <Link href="/" className="flex items-center gap-2 group">
            <AudioWaveform className="w-6 h-6 text-cyan-500 group-hover:text-purple-400 transition-colors" />
            <span className="font-bold text-white hidden sm:block">DJ Promo Kit</span>
          </Link>
          <div className="text-sm font-bold text-cyan-400">{totalProgress}% Complete</div>
        </div>

        {/* Progress Bar Container */}
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500 ease-out"
            style={{ width: `${totalProgress}%` }}
          ></div>
        </div>

        {/* Step Indicators */}
        <div className="hidden sm:flex justify-between w-full">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${step.num < currentStep
                ? "bg-cyan-500 text-white"
                : step.num === currentStep
                  ? "bg-purple-600 text-white ring-2 ring-purple-500 ring-offset-2 ring-offset-slate-900"
                  : "bg-slate-800 text-slate-500"
                }`}>
                {step.num < currentStep ? <CheckCircle2 className="w-4 h-4" /> : step.num}
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-bold ${step.num <= currentStep ? "text-slate-300" : "text-slate-600"
                }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
