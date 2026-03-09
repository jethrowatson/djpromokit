

import Link from "next/link";
import { Copy, Eye, Download, DownloadCloud, Sparkles, CheckCircle2, TrendingUp, FileText } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PaymentStatusToast from "./PaymentStatusToast";
import CheckoutButton from "@/components/ui/CheckoutButton";
import BioDashboardSection from "./BioDashboardSection";

export default async function DashboardHome() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const { data: profile } = await supabase
        .from('profiles')
        .select('name, username, is_published, short_bio, long_bio, location, genres')
        .eq('id', user.id)
        .single();

    if (!profile) redirect('/onboarding/step-1');

    const isPublished = profile.is_published;
    const link = `djpromokit.com/${profile.username}`;

    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
            <PaymentStatusToast />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-1">Welcome back, {profile.name}</h1>
                    <p className="text-slate-400">Your EPK is looking great.</p>
                </div>
                <div className="flex items-center gap-3">
                    {isPublished ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Published
                        </span>
                    ) : (
                        <>
                            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-800 border border-white/10 text-xs font-bold text-slate-400">
                                Draft Mode
                            </span>
                            <CheckoutButton
                                text="Publish EPK"
                                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/50 disabled:opacity-50"
                            />
                        </>
                    )}
                </div>
            </div>

            <div className="grid md:grid-cols-12 gap-6 mb-8">

                {/* Link Card (Main action) */}
                <div className="md:col-span-8 glass-panel p-8 rounded-3xl border-purple-500/30 bg-purple-900/10 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/10 blur-[50px]"></div>

                    <h2 className="text-xl font-bold text-white mb-2 relative z-10">Your Public Link</h2>
                    <p className="text-slate-400 text-sm mb-6 relative z-10">Paste this into your Instagram bio or send it to promoters.</p>

                    <div className="flex items-center gap-3 relative z-10">
                        <div className="flex-1 bg-slate-900 border border-purple-500/30 rounded-xl px-4 py-3 flex items-center justify-between">
                            <span className="text-cyan-400 font-mono sm:text-lg truncate">{link}</span>
                        </div>
                        <button className="flex-shrink-0 bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-xl shadow-lg transition-colors group relative" title="Copy Link">
                            <Copy className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    <div className="mt-8 flex gap-4 relative z-10">
                        <Link href={`/${profile.username}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:bg-white/10">
                            <Eye className="w-4 h-4" /> View Live Form
                        </Link>
                    </div>
                </div>

                {/* Stats Mini */}
                <div className="md:col-span-4 glass-panel p-6 rounded-3xl border-cyan-500/20 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-cyan-400" />
                            </div>
                            <Link href="/dashboard/stats" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider">Full Stats</Link>
                        </div>
                        <h3 className="text-slate-400 text-sm font-medium">Views (Last 30 Days)</h3>
                        <p className="text-4xl font-black text-white mt-1">142</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400">Booking Clicks</span>
                            <span className="text-white font-bold">12</span>
                        </div>
                    </div>
                </div>
            </div>

            <BioDashboardSection profile={profile} />

            {/* Action Grid */}
            <h2 className="text-xl font-bold text-white mb-4 mt-12">Tools & Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="glass-panel p-6 rounded-2xl border-white/5 hover:border-purple-500/30 transition-colors group cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-purple-600/20 transition-colors">
                        <FileText className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Edit Profile</h3>
                    <p className="text-sm text-slate-400">Update your bio, swap out press shots, add a new featured mix, and manage links.</p>
                    <Link href="/dashboard/edit" className="absolute inset-0 z-10"><span className="sr-only">Edit Profile</span></Link>
                </div>

                <div className="glass-panel p-6 rounded-2xl border-white/5 hover:border-cyan-500/30 transition-colors group cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-cyan-600/20 transition-colors">
                        <Sparkles className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">SYNCdj Status</h3>
                    <p className="text-sm text-slate-400 mb-2">Your profile is actively linked and pushing updates to SYNCdj.co.uk.</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider"><CheckCircle2 className="w-3 h-3" /> Synced perfectly</span>
                </div>

                <div className="glass-panel p-6 rounded-2xl border-white/5 hover:border-white/20 transition-colors group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4">
                        <DownloadCloud className="w-6 h-6 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Generate PDF Press Kit</h3>
                    <p className="text-sm text-slate-400">Download a beautifully formatted A4 PDF with clickable links to send as attachments.</p>
                    <Link href="/dashboard" className="absolute inset-0 z-10"><span className="sr-only">Generate PDF</span></Link>
                </div>

                <div className="glass-panel p-6 rounded-2xl border-white/5 hover:border-slate-500/30 transition-colors group cursor-pointer relative overflow-hidden">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-slate-700 transition-colors">
                        <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Account Settings</h3>
                    <p className="text-sm text-slate-400">Change your username, email, password, and manage your billing.</p>
                    <Link href="/dashboard/settings" className="absolute inset-0 z-10"><span className="sr-only">Account Settings</span></Link>
                </div>

            </div>
        </div>
    );
}
