export default function MixEmbed({ url }: { url: string }) {
    if (!url) return null;

    try {
        // SoundCloud
        if (url.includes('soundcloud.com')) {
            const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
            return (
                <iframe
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    className="w-full bg-slate-900"
                    src={embedUrl}
                ></iframe>
            );
        }

        // YouTube
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            let videoId = '';
            if (url.includes('youtube.com')) {
                const urlParams = new URL(url).searchParams;
                videoId = urlParams.get('v') || '';
            } else if (url.includes('youtu.be')) {
                videoId = url.split('/').pop()?.split('?')[0] || '';
            }

            if (videoId) {
                return (
                    <div className="relative w-full aspect-video">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                );
            }
        }

        // Mixcloud
        if (url.includes('mixcloud.com')) {
            const mxPath = new URL(url).pathname;
            const embedUrl = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=0&feed=${encodeURIComponent(mxPath)}`;
            return (
                <iframe
                    width="100%"
                    height="120"
                    src={embedUrl}
                    frameBorder="0"
                    allow="autoplay"
                ></iframe>
            );
        }

        // Fallback for unsupported URLs
        return (
            <div className="p-4 border border-white/5 bg-slate-900 rounded-xl flex items-center justify-center min-h-[160px]">
                <p className="text-slate-400 text-sm">Preview available for SoundCloud, Mixcloud, and YouTube links.</p>
            </div>
        );
    } catch (e) {
        console.error('Failed to parse mix URL:', e);
        return null;
    }
}
