import { Play } from 'lucide-react';

export default function EPKMockup() {
    return (
        <div className="relative glass-panel rounded-[2rem] p-1 border-white/10 shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)] overflow-hidden bg-slate-900 w-full max-w-sm mx-auto aspect-[9/16] group">
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
                        <button className="w-full py-2.5 rounded-xl bg-purple-600 font-bold text-xs text-white shadow-lg shadow-purple-900/50 hover:bg-purple-500 transition-colors pointer-events-none">
                            Book DJ NOVA
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
