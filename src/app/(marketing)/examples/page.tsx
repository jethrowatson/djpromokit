import Link from "next/link";
import { ArrowRight, Music2, Headphones, Sparkles, Flame, Radio, Mic2, Play } from "lucide-react";

export default function Examples() {
    const examples = [
        {
            name: "Alex Rivera",
            genre: "Tech House / Techno",
            location: "London, UK",
            image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
        },
        {
            name: "DJ Sarah",
            genre: "Wedding & Events",
            location: "Manchester, UK",
            image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=1000&auto=format&fit=crop",
        },
        {
            name: "DJ Marcus",
            genre: "Hip Hop / R&B",
            location: "Birmingham, UK",
            image: "https://images.unsplash.com/photo-1605330419139-9ea266f8510a?q=80&w=1000&auto=format&fit=crop",
        },
        {
            name: "Elena Dub",
            genre: "Dubstep / Bass",
            location: "Bristol, UK",
            image: "https://images.unsplash.com/photo-1470229722913-7c090be5f524?q=80&w=1000&auto=format&fit=crop",
        },
        {
            name: "DJ Flow",
            genre: "Deep House",
            location: "Brighton, UK",
            image: "https://images.unsplash.com/photo-1520113885141-94947dc16d7a?q=80&w=1000&auto=format&fit=crop",
        },
        {
            name: "The Twins",
            genre: "EDM / Mainstage",
            location: "Leeds, UK",
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop",
        },
    ];

    return (
        <div className="min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">See it in action</h1>
                    <p className="text-xl text-slate-400 mb-10">
                        Hundreds of DJs use DJpromokit to send professional EPKs to promoters. Check out a few examples.
                    </p>
                    <div className="inline-flex glass-panel p-1 rounded-2xl items-center mb-16">
                        <span className="px-6 py-2 rounded-xl bg-purple-600 font-bold text-white shadow-lg">Good links</span>
                        <span className="px-6 py-2 rounded-xl font-medium text-slate-400 line-through">Messy Linktrees</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {examples.map((ex, i) => (
                        <div key={i} className="glass-panel p-2 rounded-3xl group overflow-hidden border-white/5 hover:border-purple-500/50 transition-colors">
                            <div className="w-full aspect-video rounded-2xl mb-4 bg-slate-800 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity overflow-hidden relative">
                                <img src={ex.image} alt={ex.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div className="px-4 pb-4">
                                <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{ex.name}</h3>
                                <div className="mt-2 flex items-center gap-2 mb-4">
                                    <span className="text-sm font-medium px-2 py-1 rounded bg-slate-800 text-slate-300">{ex.genre}</span>
                                    <span className="text-sm text-slate-500">{ex.location}</span>
                                </div>
                                <Link href={`/epk/${ex.name.toLowerCase().replace(" ", "")}`} className="flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors mt-6">
                                    View Demo EPK <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Before and After */}
                <div className="mt-32 max-w-5xl mx-auto glass-panel p-8 md:p-12 rounded-[2rem] border-purple-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-purple-600/10 blur-[100px]"></div>
                    <h2 className="text-3xl font-bold text-white text-center mb-16">The difference is clear</h2>

                    <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
                        <div>
                            <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center justify-center md:justify-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div> Before DJpromokit
                            </h3>
                            <div className="glass-panel border-white/5 p-6 rounded-2xl bg-slate-900/80">
                                <p className="text-sm font-mono text-slate-400 line-through mb-4">linktr.ee/djmarcus</p>
                                <div className="space-y-3">
                                    <div className="w-full h-10 bg-slate-800 rounded flex items-center justify-center"><span className="text-slate-500 text-sm">Listen on Soundcloud</span></div>
                                    <div className="w-full h-10 bg-slate-800 rounded flex items-center justify-center"><span className="text-slate-500 text-sm">Follow on Insta</span></div>
                                    <div className="w-full h-10 bg-slate-800 rounded flex items-center justify-center"><span className="text-slate-500 text-sm">Drive link to Press Photos</span></div>
                                    <div className="w-full h-10 bg-slate-800 rounded flex items-center justify-center"><span className="text-slate-500 text-sm">Booking Email</span></div>
                                </div>
                            </div>
                            <p className="mt-4 text-slate-400 text-sm">Promoters have to click 5 times just to hear you play and see your face.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center justify-center md:justify-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400"></div> After DJpromokit
                            </h3>
                            <div className="glass-panel border-purple-500/30 p-6 rounded-2xl bg-purple-900/10 shadow-[0_0_30px_-15px_#8b5cf6]">
                                <p className="text-sm font-mono font-bold text-cyan-400 mb-4 inline-flex items-center gap-2">djpromokit.com/dj/marcus <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded text-[10px] uppercase">Live</span></p>

                                <div className="w-full aspect-[4/3] bg-slate-800 rounded flex flex-col items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                                    <div className="relative z-20 flex flex-col items-center p-4 h-full justify-end w-full">
                                        <h4 className="text-white font-bold self-start">DJ Marcus</h4>
                                        <div className="h-12 w-full bg-slate-700/50 backdrop-blur rounded mt-2 border border-white/10 flex items-center px-4">
                                            <div className="w-6 h-6 rounded-full bg-purple-500 mr-2 flex items-center justify-center"><Play className="w-3 h-3 text-white ml-0.5" /></div>
                                            <div className="h-1.5 w-full bg-slate-600 rounded-full overflow-hidden"><div className="w-1/3 h-full bg-purple-500"></div></div>
                                        </div>
                                        <div className="w-full mt-2 py-2 bg-white text-black text-center text-xs font-bold rounded">Book DJ Marcus</div>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 text-slate-400 text-sm">Everything in one place. Streamlined for getting the booking.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
