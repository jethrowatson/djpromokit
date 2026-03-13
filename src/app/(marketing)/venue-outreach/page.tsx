"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Mail, MessageCircle, Instagram } from "lucide-react";

export default function VenueOutreach() {
    const [copied, setCopied] = useState<number | null>(null);

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopied(index);
        setTimeout(() => setCopied(null), 2000);
    };

    const templates = [
        {
            id: 1,
            title: "Email Template",
            icon: <Mail className="w-5 h-5" />,
            color: "bg-blue-500/20 text-blue-400",
            content: `Subject: DJ booking enquiry - [DJ NAME] - [CITY]

Hi [Promoter/Venue Name],

My name is [DJ Name], a [Genre] DJ based in [City]. I love the vibe at [Venue] and would be a great fit for your upcoming nights.

You can listen to my latest mixes, view my press shots, and see my live setup here:
https://djpromokit.com/dj/yourname

I have open availability next month. Let me know if you are looking for support acts or headliners.

Best,
[DJ Name]`
        },
        {
            id: 2,
            title: "Instagram DM",
            icon: <Instagram className="w-5 h-5" />,
            color: "bg-pink-500/20 text-pink-400",
            content: `Hey [Venue/Promoter] 👋 Love what you're doing with [Event Name].

I'm a [Genre] DJ in [City]. Check out my EPK for mixes, photos and bio:
https://djpromokit.com/dj/yourname

If you want a set, reply with a date! 🎧`
        },
        {
            id: 3,
            title: "WhatsApp Business Quick Reply",
            icon: <MessageCircle className="w-5 h-5" />,
            color: "bg-green-500/20 text-green-400",
            content: `Hey! Thanks for getting in touch. 

You can find all my mixes, press photos, tech rider, and bio in my live EPK:
https://djpromokit.com/dj/yourname

Let me know what date you have in mind!`
        }
    ];

    return (
        <div className="min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-extrabold text-white mb-6">Venue Outreach Templates</h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Copy and paste these templates. Just replace the bracketed sections and drop in your DJpromokit link.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {templates.map((t, index) => (
                        <div key={t.id} className="glass-panel rounded-2xl p-0 overflow-hidden border-white/5 shadow-xl">
                            <div className="bg-slate-900/80 border-b border-white/5 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${t.color}`}>
                                        {t.icon}
                                    </div>
                                    <h3 className="font-bold text-white text-lg">{t.title}</h3>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(t.content, index)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium text-white transition-colors border border-white/5"
                                >
                                    {copied === index ? (
                                        <><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Copied</>
                                    ) : (
                                        <><Copy className="w-4 h-4 text-slate-400" /> Copy to clipboard</>
                                    )}
                                </button>
                            </div>
                            <div className="p-6 bg-slate-950/50">
                                <pre className="font-sans text-slate-300 whitespace-pre-wrap leading-relaxed">
                                    {t.content}
                                </pre>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 max-w-3xl mx-auto text-center glass-panel p-10 rounded-3xl border-cyan-500/20 bg-slate-900">
                    <h2 className="text-2xl font-bold text-white mb-4">Pro Tip: Track your link</h2>
                    <p className="text-slate-400 mb-6">
                        If you subscribe to the £5.99 published plan, your dashboard shows exactly how many people have viewed your EPK and clicked your booking button. Send 10 DMs, and see how many promoters actually open the link.
                    </p>
                </div>
            </div>
        </div>
    );
}
