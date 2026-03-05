import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, LayoutTemplate, Send, CalendarCheck } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full relative py-24 sm:py-32 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <div className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50 translate-x-1/2 -translate-y-1/4"></div>
                    <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] mix-blend-screen opacity-50 -translate-x-1/3 translate-y-1/3"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-slide-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel mb-8 border-purple-500/30 text-sm animate-fade-in">
                        <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="text-slate-300">New: Auto-sync your profile with SYNCdj.co.uk</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto drop-shadow-lg">
                        Your DJ press kit link, <br className="hidden md:block" />
                        <span className="text-gradient">built in minutes.</span>
                    </h1>

                    <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                        Give DJs a single link that gets them booked faster. Mixes, videos, photos, and contact info in one clean EPK.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/signup" className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-8 py-4 text-base font-bold text-white shadow-[0_0_30px_-5px_#8b5cf6] hover:bg-purple-500 hover:shadow-[0_0_40px_-5px_#8b5cf6] transition-all hover:-translate-y-1 w-full sm:w-auto">
                            Start free
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link href="/epk/alexrivera" className="inline-flex items-center justify-center rounded-xl glass-panel px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition-all w-full sm:w-auto">
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
                            <p className="text-slate-400">Copy your unique DJpromokit link. Paste it into your Instagram bio, or send it directly to venues.</p>
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

            {/* Social Integrations */}
            <section className="w-full py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">One link for everywhere.</h2>
                            <p className="text-lg text-slate-400 mb-8">
                                Your DJpromokit link is the only link you'll ever need. It works perfectly on every platform.
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
                            <div className="relative glass-panel rounded-[2rem] p-1 border-white/10 shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)] overflow-hidden bg-slate-900 w-full max-w-sm mx-auto aspect-[9/16] md:aspect-auto md:h-[650px] group">
                                {/* Top Bar */}
                                <div className="absolute top-0 left-0 right-0 h-6 bg-slate-900/80 backdrop-blur-md z-20 flex items-center justify-between px-4 pt-1">
                                    <div className="text-[10px] text-white font-medium">9:41</div>
                                    <div className="flex gap-1 items-center">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                </div>

                                {/* Inner Scroll Area */}
                                <div className="w-full h-full bg-slate-950 rounded-[1.8rem] overflow-y-auto overflow-x-hidden relative scrollbar-hide">

                                    {/* Hero Banner Header */}
                                    <div className="relative h-48 w-full">
                                        {/* Mock BG Image */}
                                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center brightness-50 group-hover:scale-105 transition-transform duration-1000"></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

                                        <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3 z-10">
                                            <div className="w-16 h-16 rounded-full border-2 border-slate-950 shadow-lg overflow-hidden bg-slate-800 flex-shrink-0">
                                                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1520638062957-eefc3d8031d1?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center"></div>
                                            </div>
                                            <div className="pb-1">
                                                <h3 className="text-xl font-black text-white leading-tight">DJ NOVA</h3>
                                                <p className="text-[10px] text-purple-400 font-bold tracking-widest uppercase">London, UK</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-4 pb-6 space-y-4">
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white">House</span>
                                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white">Techno</span>
                                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white">Tech House</span>
                                        </div>

                                        {/* Bio Snippet */}
                                        <p className="text-xs text-slate-300 leading-relaxed">
                                            Resident at Fabric London. Releases on Defected and Toolroom. Known for high-energy tech house sets that bridge the gap between underground and mainstage.
                                        </p>

                                        {/* Featured Mix Player */}
                                        <div className="bg-slate-900 rounded-xl p-3 border border-white/5 shadow-inner">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Latest Mix</span>
                                                <span className="text-[10px] text-slate-500">54:20</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                                                    <Play className="w-4 h-4 text-white ml-0.5" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-purple-500 w-1/3 rounded-full relative">
                                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_2px_#8b5cf6]"></div>
                                                        </div>
                                                    </div>
                                                    <p className="text-[10px] font-bold text-white mt-1.5 truncate">Summer Sessions Vol. 4</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mock Gig List */}
                                        <div>
                                            <h4 className="text-xs font-bold text-white mb-2">Upcoming Gigs</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-center w-8">
                                                            <div className="text-[8px] text-purple-400 font-bold uppercase">Oct</div>
                                                            <div className="text-sm font-black text-white leading-none">14</div>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-white">Printworks</p>
                                                            <p className="text-[10px] text-slate-400">London, UK</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-center w-8">
                                                            <div className="text-[8px] text-purple-400 font-bold uppercase">Oct</div>
                                                            <div className="text-sm font-black text-white leading-none">28</div>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-white">Amnesia</p>
                                                            <p className="text-[10px] text-slate-400">Ibiza, ES</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Booking CTA */}
                                        <div className="pt-2">
                                            <button className="w-full py-2.5 rounded-xl bg-purple-600 font-bold text-xs text-white shadow-lg shadow-purple-900/50 hover:bg-purple-500 transition-colors">
                                                Book DJ NOVA
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="w-full py-24 bg-gradient-to-b from-transparent to-purple-900/20 relative z-10 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Stop sending messy links.</h2>
                    <p className="text-xl text-slate-300 mb-10">Join thousands of DJs using DJpromokit to look professional and get more gigs.</p>
                    <Link href="/signup" className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-8 py-4 text-lg font-bold text-white shadow-[0_0_30px_-5px_#8b5cf6] hover:bg-purple-500 hover:shadow-[0_0_40px_-5px_#8b5cf6] transition-all hover:-translate-y-1">
                        Build your EPK for free
                    </Link>
                </div>
            </section>
        </div>
    );
}
