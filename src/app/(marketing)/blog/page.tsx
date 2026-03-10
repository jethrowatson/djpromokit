import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'DJ Guides & Resources | DJ Promo Kit',
    description: 'Expert guides, tips, and resources on how to build your DJ press kit, get more gigs, and grow your career.',
};

// This would typically come from a CMS or local markdown files
const posts = [
    {
        slug: 'how-to-make-a-dj-press-kit-epk',
        title: 'How to Build a Professional DJ Press Kit (EPK) in 2026',
        excerpt: 'Your EPK is your resume, portfolio, and primary booking tool rolled into one. Learn exactly what promoters look for and how to build one that gets you booked.',
        date: 'March 10, 2026',
        readTime: '6 min read',
        category: 'Guides',
        image: '/examples/flow.png'
    },
    {
        slug: 'how-to-get-your-first-club-residency',
        title: 'How to Get Your First Club Residency in 2026',
        excerpt: 'Stop sending cold emails that go ignored. Here is the exact step-by-step framework to transition from bedroom DJ to securing a weekly club residency.',
        date: 'March 11, 2026',
        readTime: '8 min read',
        category: 'Career Growth',
        image: '/examples/marcus.png'
    },
    {
        slug: 'dj-marketing-101-instagram-tiktok',
        title: 'DJ Marketing 101: Growing Your Audience on Instagram & TikTok',
        excerpt: 'In 2026, promoters book DJs with an audience. Learn how to optimize your social media strategy, what content actually works, and how to convert followers into ticket sales.',
        date: 'March 12, 2026',
        readTime: '10 min read',
        category: 'Marketing',
        image: '/examples/sarah.png'
    },
    {
        slug: 'organizing-your-rekordbox-library',
        title: 'Organizing Your Rekordbox Library Like a Touring Pro',
        excerpt: 'A messy library leads to trainwreck transitions. Discover the folder structures, intelligent playlists, and tagging systems used by headline touring DJs.',
        date: 'March 13, 2026',
        readTime: '7 min read',
        category: 'Technical',
        image: '/examples/elena.png'
    },
    {
        slug: 'ultimate-guide-music-industry-networking',
        title: 'The Ultimate Guide to Networking in the Music Industry',
        excerpt: 'Your net worth is your network. Learn how to genuinely connect with promoters, club owners, and other producers without seeming desperate or "salesy".',
        date: 'March 14, 2026',
        readTime: '9 min read',
        category: 'Career Growth',
        image: '/examples/twins.png'
    }
];

export default function BlogIndex() {
    return (
        <div className="min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">DJ Guides & Resources</h1>
                    <p className="text-xl text-slate-400">
                        Everything you need to know about getting booked, building your brand, and managing your DJ career.
                    </p>
                </div>

                {/* Featured Post (First one) */}
                {posts.map(post => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className="group block mb-16">
                        <div className="glass-panel p-2 rounded-3xl overflow-hidden border-purple-500/20 hover:border-purple-500/60 transition-colors relative">
                            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-purple-600/10 blur-[100px] pointer-events-none"></div>

                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div className="w-full aspect-[4/3] md:aspect-auto md:h-full rounded-2xl bg-slate-800 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity overflow-hidden relative">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                </div>
                                <div className="p-8 md:p-12 md:pl-4">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider">{post.category}</span>
                                        <div className="flex items-center text-slate-400 text-sm gap-1"><Calendar className="w-4 h-4" /> {post.date}</div>
                                        <div className="flex items-center text-slate-400 text-sm gap-1"><Clock className="w-4 h-4" /> {post.readTime}</div>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="inline-flex items-center gap-2 font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                                        Read Article <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        </div>
    );
}
