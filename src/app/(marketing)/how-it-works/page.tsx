import Link from "next/link";
import { Copy, Camera, CheckCircle2, ChevronRight, Check } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            title: "Create your profile",
            description: "Sign up and use our simple, guided builder to put your press kit together. You don't need any design skills.",
            icon: <Camera className="w-8 h-8 text-purple-400" />,
            features: [
                "Upload your best press shots",
                "Embed mixes from Soundcloud, Mixcloud, or YouTube",
                "Generate a built-in AI biography instantly",
                "Add links to all your social platforms",
                "Include your tech rider and booking info"
            ],
            color: "from-purple-600/20 to-purple-900/5",
            borderColor: "border-purple-500/30"
        },
        {
            title: "Publish and copy your unique link",
            description: "Once your EPK looks perfect, publish it for a one-time £10.99 fee. No subscriptions, ever.",
            icon: <Copy className="w-8 h-8 text-cyan-400" />,
            features: [
                "Get a clean djpromokit.com/dj/yourname URL",
                "The preview watermark is removed",
                "Unlock the PDF export generator",
                "Your profile syncs to SYNCgigs.co.uk automatically"
            ],
            color: "from-cyan-600/20 to-cyan-900/5",
            borderColor: "border-cyan-500/30"
        },
        {
            title: "Send to venues and get booked",
            description: "Stop sending long, messy emails. Just drop your link and let your EPK do the talking.",
            icon: <CheckCircle2 className="w-8 h-8 text-emerald-400" />,
            features: [
                "Paste it in your Instagram bio",
                "Use our templates to DM promoters",
                "Send it via WhatsApp",
                "Promoters can listen, download photos, and contact you in one click"
            ],
            color: "from-emerald-600/20 to-emerald-900/5",
            borderColor: "border-emerald-500/30"
        }
    ];

    return (
        <div className="min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">How DJpromokit works</h1>
                    <p className="text-xl text-slate-400">
                        Three simple steps to look more professional and get booked faster.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto space-y-16">
                    {steps.map((step, index) => (
                        <div key={index} className={`glass-panel border-l-4 ${step.borderColor} rounded-2xl p-8 md:p-12 bg-gradient-to-r ${step.color} relative overflow-hidden group`}>
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>

                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="flex-shrink-0 w-16 h-16 glass-panel rounded-2xl flex items-center justify-center bg-slate-900 shadow-lg border border-white/5">
                                    {step.icon}
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-3">
                                        <span className="text-slate-500 mr-2">Step {index + 1}.</span> {step.title}
                                    </h3>
                                    <p className="text-lg text-slate-300 mb-6 max-w-2xl">{step.description}</p>

                                    <div className="bg-slate-900/50 rounded-xl p-6 border border-white/5 shadow-inner">
                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">What you can do</h4>
                                        <ul className="grid sm:grid-cols-2 gap-3">
                                            {step.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                                    <Check className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <Link href="/signup" className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-8 py-4 text-lg font-bold text-white shadow-[0_0_30px_-5px_#8b5cf6] hover:bg-purple-500 hover:shadow-[0_0_40px_-5px_#8b5cf6] transition-all hover:-translate-y-1">
                        Start building your EPK
                        <ChevronRight className="ml-2 w-5 h-5" />
                    </Link>
                    <p className="mt-4 text-slate-400 text-sm">Totally free to build. Only £10.99 to publish.</p>
                </div>
            </div>
        </div>
    );
}
