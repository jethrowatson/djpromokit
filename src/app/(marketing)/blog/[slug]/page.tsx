import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ChevronRight, User } from 'lucide-react';

const mockPosts = {
    'how-to-make-a-dj-press-kit-epk': {
        title: 'How to Build a Professional DJ Press Kit (EPK) in 2026',
        description: 'Your EPK is your resume, portfolio, and primary booking tool rolled into one. Learn exactly what promoters look for and how to build one that gets you booked.',
        date: 'March 10, 2026',
        author: 'Jethro Watson',
        readTime: '6 min read',
        image: '/examples/flow.png',
        content: `
            <p>If you want to secure club residencies, festival slots, or high-paying private events, sending promoters a messy Linktree or a giant Google Drive folder simply won't cut it anymore. You need a centralized, professional <strong>Electronic Press Kit (EPK)</strong>.</p>
            
            <h2>What is a DJ EPK?</h2>
            <p>A DJ Electronic Press Kit is a digital resume. It is a single, easily accessible link that contains everything a promoter, booking agent, or talent buyer needs to evaluate you and book you.</p>

            <h2>The 5 Essential Elements of a Winning EPK</h2>
            
            <h3>1. High-Quality Press Photos</h3>
            <p>Visuals matter instantly. You need at least 2-3 high-resolution press photos. Do not use dark, blurry phone pictures from the club. Invest in a proper photoshoot. Include one clear headshot and one wider "in-action" shot.</p>

            <h3>2. A Concise, Story-Driven Bio</h3>
            <p>Promoters don't have time to read a novel. Create a short bio (150-250 words) that highlights:</p>
            <ul>
                <li>Where you are from and your core genre(s)</li>
                <li>Notable venues or festivals you have played</li>
                <li>Major artists you have supported</li>
                <li>Any significant releases or label affiliations</li>
            </ul>

            <h3>3. High-Quality Audio & Mixes</h3>
            <p>This is the most critical part. Include 1 or 2 of your best, most recent mixes. Use Soundcloud or Mixcloud embeds. Make sure the mix accurately represents the energy and style of what you would play live at the venue you are pitching to.</p>

            <h3>4. Social Proof & Followings</h3>
            <p>Promoters want to know you can sell tickets. Link your Instagram, TikTok, and Spotify profiles clearly. If you have impressive stats, don't hide them.</p>

            <h3>5. Contact Information</h3>
            <p>Every EPK must have a clear call-to-action (CTA) to book you. Avoid plain email addresses where possible to reduce spam; use an integrated booking inquiry form.</p>

            <h2>The Biggest Mistake DJs Make</h2>
            <p>The single biggest mistake DJs make is creating friction. If a promoter has to click "Download PDF", then search for a link to your mix, then copy-paste your email address into their client... they will give up and book someone else.</p>
            <p>Your EPK must be a seamless, unified web experience. That is exactly why we built DJ Promo Kit. Instead of paying a web designer hundreds of pounds, you can generate a world-class, dedicated URL for your EPK in under 10 minutes.</p>
        `
    }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = mockPosts[slug as keyof typeof mockPosts];
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} | DJ Promo Kit`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: new Date(post.date).toISOString(),
            authors: [post.author],
        }
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = mockPosts[slug as keyof typeof mockPosts];

    if (!post) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.description,
        "image": `https://djpromokit.com${post.image}`,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "DJ Promo Kit",
            "logo": {
                "@type": "ImageObject",
                "url": "https://djpromokit.com/icon.svg"
            }
        },
        "datePublished": new Date(post.date).toISOString()
    };

    return (
        <article className="min-h-screen pt-8 pb-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <div className="flex items-center text-sm font-medium text-slate-400 mb-10 pt-4">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 mx-2 text-slate-600" />
                    <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                    <ChevronRight className="w-4 h-4 mx-2 text-slate-600" />
                    <span className="text-slate-300 truncate">Post</span>
                </div>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider">Guides</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">{post.title}</h1>

                    <div className="flex flex-wrap items-center gap-6 text-slate-400">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                                <User className="w-5 h-5 text-slate-300" />
                            </div>
                            <span className="font-medium text-white">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</div>
                        <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</div>
                    </div>
                </header>

                {/* Hero Image */}
                <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-16 relative border border-white/5">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div
                    className="prose prose-invert prose-purple max-w-none prose-lg
                               prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                               prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                               prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                               prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                               prose-ul:text-slate-300 prose-li:my-2
                               prose-strong:text-white prose-strong:font-bold"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* CTA Box */}
                <div className="mt-24 p-8 md:p-12 glass-panel rounded-3xl border-purple-500/30 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-purple-600/20 blur-[80px]"></div>
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to build your EPK?</h3>
                    <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                        Join hundreds of DJs using DJ Promo Kit to get booked faster. Build your beautiful profile for free in under 10 minutes.
                    </p>
                    <Link href="/signup" className="inline-flex py-4 px-8 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors text-white font-bold shadow-[0_0_20px_-5px_#8b5cf6] relative z-10 w-full sm:w-auto items-center justify-center">
                        Start Building for Free
                    </Link>
                </div>
            </div>
        </article>
    );
}
