import Link from "next/link";
import { Check } from "lucide-react";

export default function Pricing() {
    return (
        <div className="min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Simple, transparent pricing</h1>
                    <p className="text-xl text-slate-400">
                        Build your EPK for free. Only pay when you're ready to share it with the world. No monthly subscriptions.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
                    {/* Free Tier */}
                    <div className="glass-panel rounded-3xl p-8 md:p-10 border-slate-800 flex flex-col">
                        <h3 className="text-2xl font-bold text-white mb-2">Draft Mode</h3>
                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-4xl font-extrabold text-white">£0</span>
                            <span className="text-slate-400">forever</span>
                        </div>
                        <p className="text-slate-300 mb-8 flex-1">
                            Perfect for setting up your profile. Keep it in draft mode as long as you need.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Create an account",
                                "Build your profile",
                                "Upload photos & embed mixes",
                                "Preview your page privately",
                                "Keep it in draft forever"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                                    <span className="text-slate-300">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Link href="/signup" className="w-full flex items-center justify-center py-4 px-6 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-white font-bold">
                            Start Free
                        </Link>
                    </div>

                    {/* Paid Tier */}
                    <div className="glass-panel rounded-3xl p-8 md:p-10 border-purple-500/50 relative flex flex-col items-center sm:items-stretch overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-purple-600/20 blur-2xl"></div>

                        <div className="absolute top-0 inset-x-0 flex justify-center translate-y-[-50%]">
                            <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">Published EPK</h3>
                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-4xl font-extrabold text-white">£10.99</span>
                            <span className="text-slate-400">one-time fee</span>
                        </div>
                        <p className="text-slate-300 mb-8 flex-1 text-center sm:text-left">
                            Pay once, keep the page live. Get your personal link and start getting booked.
                        </p>
                        <ul className="space-y-4 mb-8 w-full">
                            {[
                                "Everything in Draft Mode",
                                "Public EPK URL (e.g., /dj/yourname)",
                                "PDF Press Kit download generator",
                                "Removal of preview watermark",
                                "Automatic SYNCgigs.co.uk integration",
                                "Basic analytics & stats"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-left w-full">
                                    <Check className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                                    <span className="text-white font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Link href="/signup" className="w-full flex items-center justify-center py-4 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors text-white font-bold shadow-[0_0_20px_-5px_#8b5cf6] relative z-10 w-full">
                            Build & Publish
                        </Link>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto mt-32">
                    <h2 className="text-3xl font-bold text-white mb-10 text-center">Frequently asked questions</h2>

                    <div className="space-y-6">
                        <div className="glass-panel p-6 rounded-2xl">
                            <h4 className="text-lg font-bold text-white mb-2">What does "lifetime fee" mean?</h4>
                            <p className="text-slate-300">
                                The lifetime fee means the lifetime of the product, not your personal lifetime. You pay once, and your published profile page is hosted and kept live for as long as DJpromokit exists. If we release paid upgrades in the future, your page will remain live without additional cost.
                            </p>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl">
                            <h4 className="text-lg font-bold text-white mb-2">Can I edit my profile after publishing?</h4>
                            <p className="text-slate-300">
                                Yes! You can log in and update your photos, mixes, and bio at any time. Changes are reflected on your live DJpromokit page instantly, and will also sync to your SYNCgigs.co.uk profile.
                            </p>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl">
                            <h4 className="text-lg font-bold text-white mb-2">How does the PDF export work?</h4>
                            <p className="text-slate-300">
                                Once published, a "Download PDF" button appears on your dashboard. We auto-generate a beautifully formatted A4 press kit based on your profile data. It includes your photos, bio, and working hyperlinks to your mixes and socials.
                            </p>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl">
                            <h4 className="text-lg font-bold text-white mb-2">Is there a refund if I unpublish my page?</h4>
                            <p className="text-slate-300">
                                No. You can choose to unpublish your page at any time to hide it from the public, but the one-time publish fee is non-refundable.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
