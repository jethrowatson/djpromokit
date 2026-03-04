import Link from "next/link";
import { ArrowLeftRight, DatabaseZap, RefreshCw, Zap } from "lucide-react";

export default function SyncPage() {
    return (
        <div className="min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20 animate-slide-up">
                    <div className="inline-flex items-center justify-center p-3 glass-panel rounded-2xl mb-6 border-cyan-500/30 shadow-[0_0_30px_-5px_#06b6d4]">
                        <DatabaseZap className="w-10 h-10 text-cyan-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Two platforms. <span className="text-cyan-400">One profile.</span>
                    </h1>
                    <p className="text-xl text-slate-400">
                        DJpromokit is officially integrated with SYNCdj.co.uk. Build your EPK here, and your SYNC profile updates automatically.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-24 relative">

                    {/* Visual Diagram */}
                    <div className="relative h-80 flex items-center justify-center">
                        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 top-1/2 -translate-y-1/2 z-0 opacity-50 diagram-line"></div>

                        <div className="flex justify-between w-full relative z-10 px-8">
                            <div className="glass-panel p-6 rounded-2xl border-purple-500/50 bg-slate-900 shadow-2xl flex flex-col items-center">
                                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
                                    <span className="font-bold text-white text-xl">DJP</span>
                                </div>
                                <span className="text-white font-bold">DJpromokit</span>
                                <span className="text-xs text-slate-400 mt-1">EPK Builder</span>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="glass-panel p-3 rounded-full bg-slate-900 animate-spin" style={{ animationDuration: '4s' }}>
                                    <RefreshCw className="w-6 h-6 text-slate-300" />
                                </div>
                            </div>

                            <div className="glass-panel p-6 rounded-2xl border-cyan-500/50 bg-slate-900 shadow-2xl flex flex-col items-center">
                                <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-3 text-white font-bold text-xl">
                                    SYNC
                                </div>
                                <span className="text-white font-bold">SYNCdj.co.uk</span>
                                <span className="text-xs text-slate-400 mt-1">Booking Platform</span>
                            </div>
                        </div>
                    </div>

                    {/* Benefits Text */}
                    <div className="space-y-8 pl-0 md:pl-8">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center"><Zap className="w-4 h-4 text-purple-400" /></div>
                                Zero Duplicate Admin
                            </h3>
                            <p className="text-slate-400">You already have enough admin. With our integration, when you upload a new press photo or embed a new mix on DJpromokit, it is immediately pushed to your SYNCdj profile.</p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center"><ArrowLeftRight className="w-4 h-4 text-cyan-400" /></div>
                                Shared Profile Data
                            </h3>
                            <p className="text-slate-400">Everything syncs instantly: your DJ name, location, genres, short and long bio, mixes, press photos, and social links.</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto glass-panel p-10 rounded-3xl border-white/10 text-center bg-gradient-to-br from-slate-900 to-slate-800">
                    <h2 className="text-2xl font-bold text-white mb-4">How to enable the sync</h2>
                    <p className="text-slate-300 mb-8">
                        It's automatic! As long as you use the same email address, your profiles are securely linked in the background. Note: SYNC integration is only active for published DJpromokit (paid) accounts.
                    </p>
                    <Link href="/signup" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-colors">
                        Create your profile now
                    </Link>
                </div>

            </div>
        </div>
    );
}
