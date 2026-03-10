import Link from "next/link";
import { AudioWaveform } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-slate-950/50 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <Link href="/" className="flex items-center gap-2 group mb-6">
                            <AudioWaveform className="w-6 h-6 text-purple-500" />
                            <span className="font-bold text-lg text-white">DJ Promo Kit</span>
                        </Link>
                        <p className="text-sm text-slate-400 max-w-xs">
                            Give DJs a single link that gets them booked faster. Build your pro EPK in under 10 minutes.
                        </p>
                        <div className="flex space-x-6">
                            {/* Social icons could go here */}
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Product</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    <li><Link href="/how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">How it works</Link></li>
                                    <li><Link href="/pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
                                    <li><Link href="/examples" className="text-sm text-slate-400 hover:text-white transition-colors">Examples</Link></li>
                                    <li><Link href="/blog" className="text-sm text-slate-400 hover:text-white transition-colors">Blog & Guides</Link></li>
                                    <li><Link href="/venue-outreach" className="text-sm text-slate-400 hover:text-white transition-colors">Venue Outreach Guide</Link></li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Partners</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    <li><Link href="/sync" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">SYNCgigs.co.uk Integration</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    <li><Link href="/pricing#faq" className="text-sm text-slate-400 hover:text-white transition-colors">FAQ</Link></li>
                                    <li><Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">Contact</Link></li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    <li><Link href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                                    <li><Link href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/5 pt-8">
                    <p className="text-base text-slate-400 xl:text-center">&copy; {new Date().getFullYear()} DJ Promo Kit. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
