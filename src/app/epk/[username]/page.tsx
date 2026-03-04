import Link from "next/link";
import { Disc3, MapPin, Music, Mail, Play, Download, Instagram, Youtube, ExternalLink, CalendarDays, Zap } from "lucide-react";

export default async function EPKProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const resolvedParams = await params;
    // In a real app we fetch profile data by username. Mocking it here.
    const profile = {
        username: resolvedParams.username,
        name: "DJ Marcus",
        location: "London, UK",
        genres: ["Tech House", "Techno", "House"],
        tagline: "Rolling baselines and high-energy grooves.",
        shortBio: "Based in London, DJ Marcus is known for high-energy tech house sets. With previous residencies at Fabric and Ministry of Sound, he brings an undeniable groove to any dancefloor.",
        longBio: "Marcus started his journey in 2012 collecting vinyl. Over the past decade, he has played alongside some of the biggest names in underground dance music. His sound sits perfectly between deep, rolling tech house and driving peak-time techno.",
        mixes: [
            { title: "Summer Closing Mix 2024", url: "https://soundcloud.com/djmarcus/summer-24" }
        ],
        socials: {
            instagram: "djmarcus",
            soundcloud: "djmarcus",
            youtube: "@djmarcus"
        },
        publicEmail: "bookings@djmarcus.com",
        avatar: "https://images.unsplash.com/photo-1542222851-5b2da24ca1ea?q=80&w=1000&auto=format&fit=crop",
        pressShots: [
            "https://images.unsplash.com/photo-1493225457124-a1a2a5faecf5?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1470225620800-ce4a6d1a938c?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop"
        ]
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-purple-500/30">

            {/* 1. Hero Section */}
            <section className="relative w-full h-[60vh] md:h-[70vh] flex items-end pb-12 overflow-hidden border-b border-white/10">
                {/* Background Image (Mocked with gradient+blur) */}
                <div className="absolute inset-0 bg-slate-900 z-0">
                    <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 animate-slide-up">
                    <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8">
                        {/* Profile Photo */}
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] bg-slate-800 border-[6px] border-[#020617] shadow-xl overflow-hidden shrink-0 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 opacity-20"></div>
                            <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="pb-2">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-xs font-bold text-slate-300">
                                    <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {profile.location}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-xs font-bold text-slate-300">
                                    <Music className="w-3.5 h-3.5 text-purple-400" /> {profile.genres.join(" / ")}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-2">{profile.name}</h1>
                            <p className="text-xl text-slate-400 font-medium max-w-lg">{profile.tagline}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 pb-2">
                        <a href={`mailto:${profile.publicEmail}`} className="inline-flex flex-shrink-0 items-center justify-center px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:bg-slate-200 transition-colors shadow-xl">
                            <Mail className="w-5 h-5 mr-2" />
                            Book {profile.name}
                        </a>
                    </div>
                </div>
            </section >

            {/* Main Content Grid */}
            < main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-12 gap-12" >

                <div className="md:col-span-8 flex flex-col gap-16">

                    {/* Highlights */}
                    <section className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="glass-panel p-5 rounded-3xl border-white/5 bg-slate-900 flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-3">
                                    <CalendarDays className="w-6 h-6 text-purple-400" />
                                </div>
                                <span className="text-2xl font-black text-white">10+</span>
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Years DJing</span>
                            </div>
                            <div className="glass-panel p-5 rounded-3xl border-white/5 bg-slate-900 flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-3">
                                    <Disc3 className="w-6 h-6 text-cyan-400" />
                                </div>
                                <span className="text-2xl font-black text-white">Fabric</span>
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Past Support</span>
                            </div>
                            <div className="glass-panel p-5 rounded-3xl border-white/5 bg-slate-900 flex flex-col items-center text-center col-span-2 md:col-span-1">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-3">
                                    <Zap className="w-6 h-6 text-emerald-400" />
                                </div>
                                <span className="text-2xl font-black text-white">Ibiza</span>
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">International</span>
                            </div>
                        </div>
                    </section>

                    {/* Featured Mix */}
                    <section className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Featured Mix</h2>
                        </div>
                        <div className="w-full glass-panel rounded-3xl p-6 border-white/10 relative overflow-hidden">
                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-600/20 blur-[100px]"></div>

                            {/* Mock Soundcloud Embed Player */}
                            <div className="w-full h-80 sm:h-48 bg-slate-950 rounded-2xl flex flex-col sm:flex-row relative z-10 overflow-hidden border border-slate-800">
                                <div className="sm:w-48 h-48 bg-gradient-to-br from-purple-500 to-cyan-400 flex-shrink-0 relative group">
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Play className="w-12 h-12 text-white fill-white" />
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6 flex flex-col justify-center flex-1">
                                    <span className="text-xs font-bold text-purple-400 mb-1 tracking-wider uppercase">SoundCloud</span>
                                    <h3 className="text-xl font-bold text-white mb-4 line-clamp-1">{profile.mixes[0].title}</h3>

                                    {/* Fake Waveform */}
                                    <div className="w-full h-12 flex items-end gap-[1px] opacity-70">
                                        {Array.from({ length: 60 }).map((_, i) => (
                                            <div key={i} className="flex-1 bg-slate-500 rounded-t-full origin-bottom" style={{ height: `${Math.max(10, Math.random() * 100)}%` }}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >

                    {/* Bio */}
                    < section className="animate-fade-in" style={{ animationDelay: '300ms' }
                    }>
                        <h2 className="text-2xl font-bold text-white mb-6">Biography</h2>
                        <div className="glass-panel p-8 md:p-10 rounded-3xl border-white/5 space-y-6">
                            <p className="text-lg md:text-xl font-medium text-slate-300 leading-relaxed border-l-4 border-purple-500 pl-6">
                                {profile.shortBio}
                            </p>
                            <div className="w-16 h-px bg-slate-700"></div>
                            <p className="text-slate-400 leading-relaxed whitespace-pre-wrap">
                                {profile.longBio}
                            </p>
                        </div>
                    </section >

                </div >

                {/* Sidebar */}
                < div className="md:col-span-4 flex flex-col gap-8 animate-fade-in" style={{ animationDelay: '400ms' }}>

                    {/* Press Photos */}
                    < div className="glass-panel p-6 rounded-3xl border-white/5" >
                        <h3 className="text-lg font-bold text-white mb-4">Press Assets</h3>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="aspect-[4/3] bg-slate-800 rounded-xl overflow-hidden relative">
                                <img src={profile.pressShots[0]} className="w-full h-full object-cover" alt="Press Shot 1" />
                            </div>
                            <div className="aspect-[4/3] bg-slate-800 rounded-xl overflow-hidden relative">
                                <img src={profile.pressShots[1]} className="w-full h-full object-cover" alt="Press Shot 2" />
                            </div>
                            <div className="col-span-2 aspect-[16/9] bg-slate-800 rounded-xl flex flex-col justify-end relative overflow-hidden group cursor-pointer hover:border hover:border-white/20">
                                <img src={profile.pressShots[2]} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" alt="Press Shot 3" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-10">
                                    <Download className="w-8 h-8 text-white" />
                                </div>
                                <span className="p-4 text-sm font-bold text-white relative z-20 bg-gradient-to-t from-black/80 to-transparent">Download All Press Shots <span className="text-slate-400 font-normal ml-1">(.zip, 32MB)</span></span>
                            </div>
                        </div>
                    </div >

                    {/* Social Links */}
                    < div className="glass-panel p-6 rounded-3xl border-white/5" >
                        <h3 className="text-lg font-bold text-white mb-4">Socials & Links</h3>
                        <div className="space-y-3">
                            <a href={`https://instagram.com/${profile.socials.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <Instagram className="w-5 h-5 text-slate-400 group-hover:text-pink-400 transition-colors" />
                                    <span className="font-medium text-slate-300 group-hover:text-white transition-colors">Instagram</span>
                                </div>
                                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                            </a>
                            <a href={`https://soundcloud.com/${profile.socials.soundcloud}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M11.536 12.89L11 9l-1-2-.536-1.11h-.032L8.9 6.89l-1 2-.536 4H7.33L8.4 17.51a.634.634 0 00.569.38h1.8a.64.64 0 00.574-.4l.794-4.6zM22.04 15.61l-1.92-3.8A3.01 3.01 0 0017.44 10H13.6L12.92 6a3.67 3.67 0 00-7.23 0L5.01 10H1.56a3.01 3.01 0 00-2.68 1.81l-1.92 3.8A3 3 0 000 18.02V20h22v-1.98a3 3 0 00-2.96-2.41z" /></svg>
                                    <span className="font-medium text-slate-300 group-hover:text-white transition-colors">SoundCloud</span>
                                </div>
                                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                            </a>
                            <a href={`https://youtube.com/${profile.socials.youtube}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <Youtube className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
                                    <span className="font-medium text-slate-300 group-hover:text-white transition-colors">YouTube</span>
                                </div>
                                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                            </a>
                        </div>
                    </div>

                    {/* Tech Rider */}
                    <div className="glass-panel p-6 rounded-3xl border-white/5">
                        <h3 className="text-lg font-bold text-white mb-4">Tech Rider</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                3x CDJ 3000s or 2000 NXS2
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                1x DJM 900 NXS2 or V10
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                2x High-end monitors (L-Acoustics/Funktion One)
                            </li>
                        </ul>
                    </div>

                </div>

            </main>

            {/* Footer / Branding */}
            <footer className="w-full py-8 border-t border-white/5 bg-slate-950 mt-16 text-center">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
                    Built with <Disc3 className="w-4 h-4 text-purple-500" /> DJpromokit
                </Link>
            </footer>

        </div>
    );
}
