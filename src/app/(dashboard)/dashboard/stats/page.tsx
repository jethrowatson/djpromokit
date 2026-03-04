"use client";

import { BarChart3, Users, MousePointerClick, Globe, ArrowUpRight } from "lucide-react";

export default function DashboardStats() {
    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-white mb-1">Statistics</h1>
                <p className="text-slate-400">See how your EPK is performing.</p>
            </div>

            {/* Topline Metrics */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Views (30d)", value: "142", trend: "+12%", icon: <Users className="w-5 h-5 text-purple-400" /> },
                    { label: "Unique Visitors", value: "98", trend: "+5%", icon: <Globe className="w-5 h-5 text-cyan-400" /> },
                    { label: "Mix Plays", value: "64", trend: "+24%", icon: <BarChart3 className="w-5 h-5 text-emerald-400" /> },
                    { label: "Booking Clicks", value: "12", trend: "+2%", icon: <MousePointerClick className="w-5 h-5 text-pink-400" /> }
                ].map((stat, i) => (
                    <div key={i} className="glass-panel p-5 rounded-2xl border-white/5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                                {stat.icon}
                            </div>
                            <span className="flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                                {stat.trend} <ArrowUpRight className="w-3 h-3 ml-0.5" />
                            </span>
                        </div>
                        <h3 className="text-slate-400 text-sm font-medium">{stat.label}</h3>
                        <p className="text-3xl font-black text-white mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Traffic Sources */}
                <div className="glass-panel p-6 rounded-3xl border-white/5">
                    <h3 className="text-lg font-bold text-white mb-6">Top Traffic Sources</h3>
                    <div className="space-y-4">
                        {[
                            { source: "Instagram (Link in Bio)", count: 68, pct: 48, color: "bg-pink-500" },
                            { source: "Direct (Email/WhatsApp)", count: 42, pct: 30, color: "bg-purple-500" },
                            { source: "Facebook", count: 20, pct: 14, color: "bg-blue-500" },
                            { source: "Other", count: 12, pct: 8, color: "bg-slate-500" },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-300 font-medium">{item.source}</span>
                                    <span className="text-white font-bold">{item.count}</span>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Conversion Funnel */}
                <div className="glass-panel p-6 rounded-3xl border-white/5">
                    <h3 className="text-lg font-bold text-white mb-6">Booking Funnel</h3>
                    <div className="flex justify-between items-end h-48 border-b border-slate-700 pb-4 px-2 space-x-2">
                        {/* Extremely simple mock bar chart */}
                        <div className="flex flex-col items-center w-full">
                            <div className="w-full bg-purple-600/40 rounded-t-sm border-t border-purple-500 flex items-end justify-center pb-2 text-xs font-bold text-white" style={{ height: '100%' }}>142</div>
                            <span className="text-xs text-slate-400 mt-2 text-center">Views</span>
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <div className="w-full bg-cyan-600/40 rounded-t-sm border-t border-cyan-500 flex items-end justify-center pb-2 text-xs font-bold text-white" style={{ height: '45%' }}>64</div>
                            <span className="text-xs text-slate-400 mt-2 text-center">Plays</span>
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <div className="w-full bg-emerald-600/40 rounded-t-sm border-t border-emerald-500 flex items-end justify-center pb-2 text-xs font-bold text-white" style={{ height: '8%' }}>12</div>
                            <span className="text-xs text-slate-400 mt-2 text-center">Clicks</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-400 mt-4 text-center">
                        You have an <span className="font-bold text-white">8.4%</span> conversion rate from view to booking click.
                    </p>
                </div>
            </div>

        </div >
    );
}
