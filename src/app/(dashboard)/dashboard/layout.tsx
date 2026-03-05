import Link from "next/link";
import { Disc3, Copy, Eye, FileText, BarChart3, Settings, Play, Inbox } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">

            {/* Sidebar Nav */}
            <aside className="w-full md:w-64 bg-slate-900 border-r border-white/5 flex-shrink-0 relative z-20">
                <div className="p-6 border-b border-white/5">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Disc3 className="w-8 h-8 text-cyan-500 group-hover:text-purple-400 transition-colors" />
                        <span className="font-bold text-xl text-white">DJpromokit</span>
                    </Link>
                </div>

                <nav className="p-4 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-500/10 text-purple-400 font-medium border border-purple-500/20">
                        <Play className="w-5 h-5" /> Overview
                    </Link>
                    <Link href="/dashboard/stats" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors font-medium">
                        <BarChart3 className="w-5 h-5" /> Statistics
                    </Link>
                    <Link href="/dashboard/requests" className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors font-medium">
                        <span className="flex items-center gap-3"><Inbox className="w-5 h-5" /> Booking Requests</span>
                    </Link>
                    <Link href="/onboarding/step-1" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors font-medium">
                        <FileText className="w-5 h-5" /> Edit Profile
                    </Link>
                    <Link href="/epk/djmarcus" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors font-medium">
                        <Eye className="w-5 h-5" /> View Live EPK
                    </Link>
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-white/5">
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors font-medium">
                        <Settings className="w-5 h-5" /> Account Settings
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative z-10 p-6 md:p-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>
                {children}
            </main>

        </div>
    );
}
