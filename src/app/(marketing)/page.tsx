import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, LayoutTemplate, Send, CalendarCheck, Sparkles } from "lucide-react";
import EPKMockup from "@/components/ui/EPKMockup";

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full relative py-24 sm:py-32 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
                    <div className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50 translate-x-1/2 -translate-y-1/4"></div>
                    <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] mix-blend-screen opacity-50 -translate-x-1/3 translate-y-1/3"></div>

                    {/* Tilt-shift Hero Background EPK */}
                    <div className="absolute top-[10%] right-[-15%] md:right-[-5%] lg:right-[5%] w-[400px] opacity-30 md:opacity-40 select-none hidden sm:block" style={{
                        transform: 'perspective(1000px) rotateY(-25deg) rotateX(10deg) scale(1.2)',
                        transformStyle: 'preserve-3d',
                        filter: 'blur(4px)',
                        maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)'
                    }}>
                        <div className="animate-float">
                            <EPKMockup />
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-slide-up">


                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto drop-shadow-lg">
                        Your DJ press kit link, <br className="hidden md:block" />
                        <span className="text-gradient">built in minutes.</span>
                    </h1>

                    <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                        Give promoters a single link that gets you booked faster. Mixes, videos, photos, and contact info in one clean EPK.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/signup" className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-8 py-4 text-base font-bold text-white shadow-[0_0_30px_-5px_#8b5cf6] hover:bg-purple-500 hover:shadow-[0_0_40px_-5px_#8b5cf6] transition-all hover:-translate-y-1 w-full sm:w-auto">
                            Start free
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link href="/alexrivera" className="inline-flex items-center justify-center rounded-xl glass-panel px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition-all w-full sm:w-auto">
                            See an example
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="w-full py-24 bg-slate-900/50 border-t border-b border-white/5 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How it works</h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">From signup to getting booked in three simple steps.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting line */}
                        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent z-0"></div>

                        <div className="relative z-10 glass-panel rounded-2xl p-8 flex flex-col items-center text-center hover:border-purple-500/30 transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 shadow-lg border border-white/5">
                                <LayoutTemplate className="w-8 h-8 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">1. Create your profile</h3>
                            <p className="text-slate-400">Upload your best press photos, embed your latest mixes, and write your bio in our simple builder.</p>
                        </div>

                        <div className="relative z-10 glass-panel rounded-2xl p-8 flex flex-col items-center text-center hover:border-cyan-500/30 transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 shadow-lg border border-white/5">
                                <Send className="w-8 h-8 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">2. Share your link</h3>
                            <p className="text-slate-400">Copy your unique DJ Promo Kit link. Paste it into your Instagram bio, or send it directly to venues.</p>
                        </div>

                        <div className="relative z-10 glass-panel rounded-2xl p-8 flex flex-col items-center text-center hover:border-purple-500/30 transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 shadow-lg border border-white/5">
                                <CalendarCheck className="w-8 h-8 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">3. Get booked</h3>
                            <p className="text-slate-400">Promoters can hear your mix, download your photos, and contact you in seconds. Zero friction.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Bio Feature Section */}
            <section className="w-full py-24 relative z-10 bg-[#020617]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass-panel p-8 md:p-12 rounded-3xl border-purple-500/30 bg-purple-900/10 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[50px] pointer-events-none"></div>
                        <div className="flex-1 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-xs font-bold text-purple-300 mb-6">
                                <Sparkles className="w-4 h-4" /> AI Powered
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Create your DJ biography with AI</h2>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                Many DJs struggle to write a professional biography. DJ Promo Kit includes an AI-powered tool that helps you create a compelling DJ profile in minutes. Simply answer a few questions about your music, influences, and performance history and the system will generate a professional short and long biography ready for your press kit.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Answer a few simple questions about your DJ journey.",
                                    "Generate a professional short bio and long press kit biography.",
                                    "Edit and refine the text until you are happy.",
                                    "Publish instantly to your DJ press kit page."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300">
                                        <CheckCircle2 className="w-6 h-6 text-purple-400 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 w-full relative z-10 flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-lg aspect-square">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/30 rounded-3xl blur-[40px] mix-blend-screen scale-90"></div>
                                <img
                                    src="/ai-bio-visual.png"
                                    alt="AI DJ Biography Generator brain floating over a mixer"
                                    className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl border border-white/5"
                                />
                                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 z-20 pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Integrations */}
            <section className="w-full py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">One link for everywhere.</h2>
                            <p className="text-lg text-slate-400 mb-8">
                                Your DJ Promo Kit link is the only link you'll ever need. It works perfectly on every platform.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Instagram bio link",
                                    "Facebook profile link",
                                    "Email signature",
                                    "WhatsApp business profile",
                                    "Cold outreach to venues"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                                        <span className="text-slate-300 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-10">
                                <Link href="/venue-outreach" className="text-purple-400 font-semibold hover:text-purple-300 inline-flex items-center gap-1">
                                    See our outreach templates <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl"></div>
                            <div className="relative z-10 w-full max-w-sm mx-auto">
                                <EPKMockup />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="w-full py-24 bg-gradient-to-b from-transparent to-purple-900/20 relative z-10 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Stop sending messy links.</h2>
                    <p className="text-xl text-slate-300 mb-10">Join thousands of DJs using DJ Promo Kit to look professional and get more gigs.</p>
                    <Link href="/signup" className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-8 py-4 text-lg font-bold text-white shadow-[0_0_30px_-5px_#8b5cf6] hover:bg-purple-500 hover:shadow-[0_0_40px_-5px_#8b5cf6] transition-all hover:-translate-y-1">
                        Build your EPK for free
                    </Link>
                </div>
            </section>
        </div>
    );
}
