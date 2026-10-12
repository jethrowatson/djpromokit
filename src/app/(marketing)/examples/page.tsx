import Link from "next/link";
import { ArrowRight, Music2, Headphones, Sparkles, MapPin, Calendar, CheckCircle2, Play, Download, Mail, ExternalLink } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Example DJ Press Kit | DJ Promo Kit',
    description: 'Explore a convincing, fully finished DJ press kit built with DJ Promo Kit. View Alex Rivera\'s illustrative demo EPK.',
};

export default function Examples() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemPage",
        "name": "Example DJ Press Kit",
        "description": "Explore a convincing, fully finished DJ press kit built with DJ Promo Kit.",
        "mainEntity": {
            "@type": "Person",
            "name": "Alex Rivera",
            "jobTitle": "DJ / Producer",
            "genre": "Tech House / Techno",
            "url": "https://djpromokit.com/alexrivera"
        }
    };

    return (
        <div className="min-h-screen pt-12 pb-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <Sparkles className="w-3.5 h-3.5" /> Finished Demo Press Kit
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">See a Finished EPK in Action</h1>
                    <p className="text-xl text-slate-400 mb-8">
                        Explore our flagship demo press kit for London-based Tech House DJ <strong>Alex Rivera</strong>. See how photos, bio, playable mixes, tour dates, and booking contacts come together in one streamlined link.
                    </p>
                    <div className="inline-flex glass-panel p-1 rounded-2xl items-center mb-8">
                        <span className="px-6 py-2 rounded-xl bg-purple-600 font-bold text-white shadow-lg">Good links</span>
                        <span className="px-6 py-2 rounded-xl font-medium text-slate-400 line-through">Messy Linktrees</span>
                    </div>
                </div>

                {/* Flagship Finished EPK Showcase Card */}
                <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-10 rounded-[2.5rem] border-purple-500/30 relative overflow-hidden shadow-2xl shadow-purple-950/40">
                    <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 rounded-full bg-purple-600/15 blur-[90px] pointer-events-none"></div>

                    {/* Top Demo Pill */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-purple-300 bg-purple-950/80 border border-purple-500/40 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                            Flagship Demo EPK
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Fully Interactive
                        </span>
                    </div>

                    {/* Artist Header Preview */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-white/10">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-800 shrink-0 ring-2 ring-purple-500/30 shadow-xl">
                            <img src="/examples/alex.png" alt="Alex Rivera" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-semibold text-slate-200">
                                    <MapPin className="w-3 h-3 text-cyan-400" /> London, UK
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-semibold text-purple-300">
                                    <Music2 className="w-3 h-3 text-purple-400" /> Tech House / Techno
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">Alex Rivera</h2>
                            <p className="text-sm sm:text-base text-slate-300 font-medium">
                                "Rolling basslines & hypnotic underground grooves."
                            </p>
                        </div>
                        <div className="shrink-0 w-full sm:w-auto">
                            <Link
                                href="/alexrivera"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-900/40 hover:-translate-y-0.5"
                            >
                                Open Live Demo <ExternalLink className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Highlights Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
                        <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5">
                            <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-3">
                                <Headphones className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-bold text-white mb-1">Playable Mix Player</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Promoters can stream authentic featured sets directly inside the page without leaving your link.
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5">
                            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3">
                                <Download className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-bold text-white mb-1">High-Res Press Shots</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                One-click press photo downloads for promoter flyers, festival line-up posters, and social promo.
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5 sm:col-span-2 lg:col-span-1">
                            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-3">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-bold text-white mb-1">Upcoming Tour Dates</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Clear chronological gig schedule with ticket links and venue details for verified credibility.
                            </p>
                        </div>
                    </div>

                    {/* Bottom CTA Bar */}
                    <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Tested logged out on desktop & mobile devices</span>
                        </div>
                        <Link
                            href="/alexrivera"
                            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            Explore Alex Rivera's EPK <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Before and After */}
                <div className="mt-28 max-w-5xl mx-auto glass-panel p-8 md:p-12 rounded-[2rem] border-purple-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-purple-600/10 blur-[100px]"></div>
                    <h2 className="text-3xl font-bold text-white text-center mb-16">The difference is clear</h2>

                    <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
                        <div>
                            <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center justify-center md:justify-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div> Before DJpromokit
                            </h3>
                            <div className="glass-panel border-white/5 p-6 rounded-2xl bg-slate-900/80">
                                <p className="text-sm font-mono text-slate-400 line-through mb-4">linktr.ee/alexrivera</p>
                                <div className="space-y-3">
                                    <div className="w-full h-10 bg-slate-800 rounded flex items-center justify-center"><span className="text-slate-500 text-sm">Listen on Soundcloud</span></div>
                                    <div className="w-full h-10 bg-slate-800 rounded flex items-center justify-center"><span className="text-slate-500 text-sm">Follow on Insta</span></div>
                                    <div className="w-full h-10 bg-slate-800 rounded flex items-center justify-center"><span className="text-slate-500 text-sm">Drive link to Press Photos</span></div>
                                    <div className="w-full h-10 bg-slate-800 rounded flex items-center justify-center"><span className="text-slate-500 text-sm">Booking Email</span></div>
                                </div>
                            </div>
                            <p className="mt-4 text-slate-400 text-sm">Promoters have to click 5 times across multiple apps just to hear you play and see your face.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center justify-center md:justify-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400"></div> After DJpromokit
                            </h3>
                            <div className="glass-panel border-purple-500/30 p-6 rounded-2xl bg-purple-900/10 shadow-[0_0_30px_-15px_#8b5cf6]">
                                <p className="text-sm font-mono font-bold text-cyan-400 mb-4 inline-flex items-center gap-2">djpromokit.com/alexrivera <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded text-[10px] uppercase">Live</span></p>

                                <div className="w-full aspect-[4/3] bg-slate-800 rounded flex flex-col items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                                    <div className="relative z-20 flex flex-col items-center p-4 h-full justify-end w-full">
                                        <h4 className="text-white font-bold self-start">Alex Rivera</h4>
                                        <div className="h-12 w-full bg-slate-700/50 backdrop-blur rounded mt-2 border border-white/10 flex items-center px-4">
                                            <div className="w-6 h-6 rounded-full bg-purple-500 mr-2 flex items-center justify-center"><Play className="w-3 h-3 text-white ml-0.5" /></div>
                                            <div className="h-1.5 w-full bg-slate-600 rounded-full overflow-hidden"><div className="w-1/3 h-full bg-purple-500"></div></div>
                                        </div>
                                        <div className="w-full mt-2 py-2 bg-white text-black text-center text-xs font-bold rounded">Message Alex Rivera</div>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 text-slate-400 text-sm">Everything in one place. Streamlined for promoters to review and send booking enquiries.</p>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="mt-20 text-center">
                    <Link
                        href="/signup"
                        className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg shadow-[0_0_30px_-5px_#8b5cf6] transition-all hover:-translate-y-0.5"
                    >
                        Build Your EPK for Free <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <p className="mt-3 text-xs text-slate-400">Totally free to build & preview. Introductory £5.99 one-off fee to publish.</p>
                </div>
            </div>
        </div>
    );
}
