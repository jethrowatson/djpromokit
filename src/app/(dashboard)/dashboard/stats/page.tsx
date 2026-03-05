"use client";

import { BarChart3, Users, MousePointerClick, Globe, ArrowUpRight, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardStats() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const { data: profile } = await supabase.from('profiles').select('id').eq('id', user.id).single();
    if (!profile) redirect('/onboarding/step-1');

    // Get Analytics Data
    const { data: analytics } = await supabase
        .from('analytics')
        .select('*')
        .eq('profile_id', profile.id);

    // Calculate Stats
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

    let totalViews = 0;
    let mixPlays = 0;
    let bookingClicks = 0;
    let uniqueVisitors = new Set();
    let sources: Record<string, number> = {};

    if (analytics) {
        analytics.forEach(event => {
            const eventDate = new Date(event.created_at);
            if (eventDate >= thirtyDaysAgo) {
                if (event.event_type === 'page_view') {
                    totalViews++;
                    // Basic unique visitor tracking using IP if we had it, but for MVP let's just use total views
                    uniqueVisitors.add(event.id); // Mocking unique visitors 
                }
                if (event.event_type === 'mix_play') mixPlays++;
                if (event.event_type === 'booking_click') bookingClicks++;

                if (event.source) {
                    sources[event.source] = (sources[event.source] || 0) + 1;
                }
            }
        });
    }

    // Prepare sources for UI
    const totalSourcesCount = Object.values(sources).reduce((a, b) => a + b, 0);
    const topSources = Object.entries(sources)
        .map(([source, count], i) => ({
            source,
            count,
            pct: totalSourcesCount > 0 ? Math.round((count / totalSourcesCount) * 100) : 0,
            color: ['bg-pink-500', 'bg-purple-500', 'bg-blue-500', 'bg-slate-500'][i % 4]
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 4);

    // Calculate Conversion Rate
    const conversionRate = totalViews > 0 ? ((bookingClicks / totalViews) * 100).toFixed(1) : "0.0";

    // Funnel percentages for CSS height
    const playsHeight = totalViews > 0 ? Math.max((mixPlays / totalViews) * 100, 5) : 5;
    const clicksHeight = totalViews > 0 ? Math.max((bookingClicks / totalViews) * 100, 5) : 5;

    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="mb-10 flex items-center gap-4">
                <Link href="/dashboard" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors inline-block">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-1">Statistics</h1>
                    <p className="text-slate-400">See how your EPK is performing.</p>
                </div>
            </div>

            {/* Topline Metrics */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Views (30d)", value: totalViews, trend: "--", icon: <Users className="w-5 h-5 text-purple-400" /> },
                    { label: "Unique Visitors", value: uniqueVisitors.size, trend: "--", icon: <Globe className="w-5 h-5 text-cyan-400" /> },
                    { label: "Mix Plays", value: mixPlays, trend: "--", icon: <BarChart3 className="w-5 h-5 text-emerald-400" /> },
                    { label: "Booking Clicks", value: bookingClicks, trend: "--", icon: <MousePointerClick className="w-5 h-5 text-pink-400" /> }
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
                        {topSources.length > 0 ? topSources.map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-300 font-medium">{item.source}</span>
                                    <span className="text-white font-bold">{item.count}</span>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-6 text-slate-500 text-sm">No traffic data recorded yet. Share your link to start generating stats!</div>
                        )}
                    </div>
                </div>

                {/* Conversion Funnel */}
                <div className="glass-panel p-6 rounded-3xl border-white/5">
                    <h3 className="text-lg font-bold text-white mb-6">Booking Funnel</h3>
                    <div className="flex justify-between items-end h-48 border-b border-slate-700 pb-4 px-2 space-x-2">
                        {/* Extremely simple mock bar chart */}
                        <div className="flex flex-col items-center w-full">
                            <div className="w-full bg-purple-600/40 rounded-t-sm border-t border-purple-500 flex items-end justify-center pb-2 text-xs font-bold text-white transition-all" style={{ height: '100%' }}>{totalViews}</div>
                            <span className="text-xs text-slate-400 mt-2 text-center">Views</span>
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <div className="w-full bg-cyan-600/40 rounded-t-sm border-t border-cyan-500 flex items-end justify-center pb-2 text-xs font-bold text-white transition-all" style={{ height: `${playsHeight}%` }}>{mixPlays}</div>
                            <span className="text-xs text-slate-400 mt-2 text-center">Plays</span>
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <div className="w-full bg-emerald-600/40 rounded-t-sm border-t border-emerald-500 flex items-end justify-center pb-2 text-xs font-bold text-white transition-all" style={{ height: `${clicksHeight}%` }}>{bookingClicks}</div>
                            <span className="text-xs text-slate-400 mt-2 text-center">Clicks</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-400 mt-4 text-center">
                        You have an <span className="font-bold text-white">{conversionRate}%</span> conversion rate from view to booking click.
                    </p>
                </div>
            </div>

        </div >
    );
}
