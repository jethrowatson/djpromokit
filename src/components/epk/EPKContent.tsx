import Link from "next/link";
import { Disc3, MapPin, Music, Mail, Download, Instagram, Youtube, ExternalLink, CalendarDays, Zap } from "lucide-react";
import MixEmbed from "@/components/ui/MixEmbed";

export interface EPKProfileData {
    username: string;
    name: string;
    location: string;
    genres: string[];
    tagline: string | null;
    shortBio: string | null;
    longBio: string | null;
    bookingType: 'form' | 'email';
    publicEmail: string | null;
    avatar: string | null;
    pressShots: string[];
    mixes: { title: string; url: string }[];
    socials: {
        instagram?: string;
        soundcloud?: string;
        mixcloud?: string;
        spotify?: string;
        youtube?: string;
        ra?: string;
    };
    isPublished: boolean;
}

export default function EPKContent({ profile, isDraftMode = false }: { profile: EPKProfileData, isDraftMode?: boolean }) {
    // Safe fallbacks
    const avatarUrl = profile.avatar || "https://images.unsplash.com/photo-1542222851-5b2da24ca1ea?q=80&w=1000&auto=format&fit=crop";
    const name = profile.name || "Unnamed DJ";

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-purple-500/30 relative">

            {isDraftMode && (
                <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
                    <div className="absolute top-1/4 -rotate-12 opacity-30 select-none">
                        <span className="text-8xl font-black text-white px-8 py-4 border-8 border-white rounded-3xl tracking-widest uppercase">
                            DRAFT MODE
                        </span>
                    </div>
                </div>
            )}

            {/* 1. Hero Section */}
            <section className="relative w-full h-[60vh] md:h-[70vh] flex items-end pb-12 overflow-hidden border-b border-white/10">
                {/* Background Image (Mocked with gradient+blur) */}
                <div className="absolute inset-0 bg-slate-900 z-0">
                    <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
                    <div className="absolute inset-0 bg-[#020617]/50 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 animate-slide-up">
                    <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8">
                        {/* Profile Photo */}
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] bg-slate-800 border-[6px] border-[#020617] shadow-xl overflow-hidden shrink-0 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 opacity-20"></div>
                            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                        </div>

                        <div className="pb-2">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-xs font-bold text-slate-300">
                                    <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {profile.location || "Unknown Location"}
                                </span>
                                {profile.genres && profile.genres.length > 0 && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-xs font-bold text-slate-300">
                                        <Music className="w-3.5 h-3.5 text-purple-400" /> {profile.genres.join(" / ")}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-2">{name}</h1>
                            {profile.tagline && (
                                <p className="text-xl text-slate-400 font-medium max-w-lg">{profile.tagline}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 pb-2 z-20">
                        {profile.bookingType === 'email' && profile.publicEmail ? (
                            <a href={`mailto:${profile.publicEmail}`} className="inline-flex flex-shrink-0 items-center justify-center px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:bg-slate-200 transition-colors shadow-xl">
                                <Mail className="w-5 h-5 mr-2" />
                                Book {name}
                            </a>
                        ) : (
                            <button className="inline-flex flex-shrink-0 items-center justify-center px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:bg-slate-200 transition-colors shadow-xl">
                                <Mail className="w-5 h-5 mr-2" />
                                Book {name}
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-12 gap-12 relative z-10">

                <div className="md:col-span-8 flex flex-col gap-16">

                    {/* Highlights (Mocked for MVP) */}
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
                    {profile.mixes && profile.mixes.length > 0 && profile.mixes[0].url && (
                        <section className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Featured Mix</h2>
                            </div>
                            <div className="w-full glass-panel rounded-3xl p-6 border-white/10 relative overflow-hidden">
                                <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-600/20 blur-[100px]"></div>
                                <div className="relative z-10 shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10">
                                    <MixEmbed url={profile.mixes[0].url} />
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Bio */}
                    {(profile.shortBio || profile.longBio) && (
                        <section className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                            <h2 className="text-2xl font-bold text-white mb-6">Biography</h2>
                            <div className="glass-panel p-8 md:p-10 rounded-3xl border-white/5 space-y-6">
                                {profile.shortBio && (
                                    <p className="text-lg md:text-xl font-medium text-slate-300 leading-relaxed border-l-4 border-purple-500 pl-6">
                                        {profile.shortBio}
                                    </p>
                                )}
                                {profile.shortBio && profile.longBio && (
                                    <div className="w-16 h-px bg-slate-700"></div>
                                )}
                                {profile.longBio && (
                                    <p className="text-slate-400 leading-relaxed whitespace-pre-wrap">
                                        {profile.longBio}
                                    </p>
                                )}
                            </div>
                        </section>
                    )}

                </div>

                {/* Sidebar */}
                <div className="md:col-span-4 flex flex-col gap-8 animate-fade-in" style={{ animationDelay: '400ms' }}>

                    {/* Press Photos */}
                    {profile.pressShots && profile.pressShots.length > 0 && (
                        <div className="glass-panel p-6 rounded-3xl border-white/5">
                            <h3 className="text-lg font-bold text-white mb-4">Press Assets</h3>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {profile.pressShots.slice(0, 3).map((url, i) => (
                                    <div key={i} className={`bg-slate-800 rounded-xl overflow-hidden relative ${i === 2 && profile.pressShots.length === 3 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/3]'} ${i === 2 ? 'flex flex-col justify-end group cursor-pointer hover:border hover:border-white/20' : ''}`}>
                                        <img src={url} className={`w-full h-full object-cover ${i === 2 ? 'absolute inset-0 opacity-60 group-hover:opacity-40 transition-opacity' : ''}`} alt={`Press Shot ${i + 1}`} />
                                        {i === 2 && (
                                            <>
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-10">
                                                    <Download className="w-8 h-8 text-white" />
                                                </div>
                                                <span className="p-4 text-sm font-bold text-white relative z-20 bg-gradient-to-t from-black/80 to-transparent">Download All <span className="text-slate-400 font-normal ml-1">(.zip, 32MB)</span></span>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Social Links */}
                    {Object.keys(profile.socials || {}).length > 0 && (
                        <div className="glass-panel p-6 rounded-3xl border-white/5">
                            <h3 className="text-lg font-bold text-white mb-4">Socials & Links</h3>
                            <div className="space-y-3">
                                {profile.socials.instagram && (
                                    <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <Instagram className="w-5 h-5 text-slate-400 group-hover:text-pink-400 transition-colors" />
                                            <span className="font-medium text-slate-300 group-hover:text-white transition-colors">Instagram</span>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                                    </a>
                                )}
                                {profile.socials.soundcloud && (
                                    <a href={profile.socials.soundcloud} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M11.536 12.89L11 9l-1-2-.536-1.11h-.032L8.9 6.89l-1 2-.536 4H7.33L8.4 17.51a.634.634 0 00.569.38h1.8a.64.64 0 00.574-.4l.794-4.6zM22.04 15.61l-1.92-3.8A3.01 3.01 0 0017.44 10H13.6L12.92 6a3.67 3.67 0 00-7.23 0L5.01 10H1.56a3.01 3.01 0 00-2.68 1.81l-1.92 3.8A3 3 0 000 18.02V20h22v-1.98a3 3 0 00-2.96-2.41z" /></svg>
                                            <span className="font-medium text-slate-300 group-hover:text-white transition-colors">SoundCloud</span>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                                    </a>
                                )}
                                {profile.socials.youtube && (
                                    <a href={profile.socials.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <Youtube className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
                                            <span className="font-medium text-slate-300 group-hover:text-white transition-colors">YouTube</span>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                </div>

            </main>

            {/* Footer / Branding */}
            <footer className="w-full py-8 border-t border-white/5 bg-slate-950 mt-16 text-center">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors z-20 relative">
                    Built with <Disc3 className="w-4 h-4 text-purple-500" /> DJpromokit
                </Link>
            </footer>

        </div>
    );
}
