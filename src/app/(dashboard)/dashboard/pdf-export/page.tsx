import Link from "next/link";
import { DownloadCloud, Sparkles, FileText, CheckCircle2, ArrowLeft } from "lucide-react";
import CheckoutButton from "@/components/ui/CheckoutButton";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PDFExportUpsellPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('is_published')
        .eq('id', user.id)
        .single();
        
    // If they actually are published, send them back or let them download
    if (profile?.is_published) {
        redirect('/dashboard');
    }

    return (
        <div className="max-w-4xl mx-auto animate-fade-in py-8">
            <Link href="/dashboard" className="text-slate-400 hover:text-white inline-flex items-center gap-2 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to dashboard
            </Link>

            <div className="text-center mb-12">
                <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-6 border border-white/5 shadow-xl">
                    <DownloadCloud className="w-10 h-10 text-cyan-400" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Export your PDF Press Kit</h1>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                    Download a beautifully formatted, printer-ready A4 document containing your photos, biography, and clickable links to send as attachments.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center glass-panel p-2 rounded-[2rem] border-purple-500/20 bg-purple-900/10">
                {/* Mockup Preview Area */}
                <div className="relative aspect-[3/4] bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    {/* Fake PDF Header */}
                    <div className="absolute top-0 inset-x-0 h-48 bg-slate-800">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
                        <div className="absolute bottom-6 left-6 z-20">
                            <div className="w-16 h-16 rounded-full bg-slate-700 border-2 border-slate-900 mb-2"></div>
                            <div className="h-6 w-48 bg-slate-700 rounded-md mb-2"></div>
                            <div className="h-3 w-24 bg-purple-500/50 rounded-full"></div>
                        </div>
                    </div>
                    {/* Fake Content Columns */}
                    <div className="absolute top-52 inset-x-6 bottom-6 flex flex-col gap-6">
                        <div className="flex-1">
                            <div className="h-4 w-24 bg-cyan-500/50 rounded flex items-center mb-4"></div>
                            <div className="space-y-2">
                                <div className="h-2 w-full bg-slate-800 rounded"></div>
                                <div className="h-2 w-full bg-slate-800 rounded"></div>
                                <div className="h-2 w-5/6 bg-slate-800 rounded"></div>
                                <div className="h-2 w-full bg-slate-800 rounded"></div>
                                <div className="h-2 w-4/6 bg-slate-800 rounded"></div>
                            </div>
                        </div>
                        <div className="h-24 bg-slate-800 rounded-xl w-full"></div>
                    </div>
                    
                    {/* Lock Overlay */}
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-50 flex items-center justify-center">
                        <div className="bg-slate-800/90 py-3 px-6 rounded-full border border-white/10 flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                            <span className="font-bold text-white text-sm">Published Profiles Only</span>
                        </div>
                    </div>
                </div>

                {/* Upsell Content */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-white mb-6">Unlock Professional Exports</h2>
                    
                    <ul className="space-y-4 mb-10">
                        {[
                            "Auto-formats to A4 Portrait instantly",
                            "High-resolution vector press shots",
                            "Working hyperlinks to your mixes",
                            "Live email integrations",
                            "Perfect for cold-emailing agencies"
                        ].map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <span className="text-slate-300 font-medium text-sm sm:text-base">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-white font-bold mb-1">Lifetime Publishing</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-500 line-through decoration-red-500/50 text-sm font-bold">£10.99</span>
                                    <span className="text-2xl font-extrabold text-white">£5.99</span>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-purple-400 bg-purple-900/30 px-3 py-1.5 rounded-full uppercase tracking-wider border border-purple-500/20 whitespace-nowrap">Intro offer</span>
                        </div>
                        
                        <p className="text-sm text-slate-400 mb-6 text-center sm:text-left">Publish your EPK forever to unlock PDF exports and your live public URL. No subscriptions.</p>
                        
                        <CheckoutButton
                            text="Publish & Unlock PDF"
                            className="w-full flex items-center justify-center py-4 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors text-white font-bold shadow-[0_0_20px_-5px_#8b5cf6]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
