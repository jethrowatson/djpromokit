import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url } = body;

        if (!url || !url.includes('ra.co/dj/')) {
            return NextResponse.json({ error: "Please provide a valid Resident Advisor DJ URL (e.g. ra.co/dj/username)" }, { status: 400 });
        }

        // Add a standard User-Agent to avoid basic bot blocks
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            }
        });

        if (!response.ok) {
            return NextResponse.json({ error: "Could not fetch the Resident Advisor profile. The site may be blocking us or the URL is invalid." }, { status: 422 });
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // 1. Extract DJ Name
        // RA usually puts the DJ name in the primary H1
        const djName = $('h1').first().text().trim();

        // 2. Extract Biography
        // RA stores bios in specific text blocks. We target the main content area.
        let bio = '';
        // RA's Next.js structure often hides the bio in generic div classes, but it's usually the longest text block 
        // inside the main summary or we can target specific data attributes if present.
        // A common pattern is looking for paragraphs within the main profile container.
        const potentialBioBlocks = $('div[data-tracking-id="dj-biography-read-more"], div[class*="Bio"]').text().trim();
        
        if (potentialBioBlocks) {
             bio = potentialBioBlocks;
        } else {
             // Fallback: grab all text from paragraphs that look like bio text
             // We can look for the main <main> tag and find the first large chunk of text.
             $('p').each((i, el) => {
                 const text = $(el).text().trim();
                 if (text.length > 100 && !bio) { // First significant paragraph
                     bio = text;
                 }
             });
        }

        // Clean up the bio
        bio = bio.replace(/\s+/g, ' ').trim();

        // 3. Extract Location (Often in the metadata header)
        let location = '';
        const locationElement = $('span[class*="Location"]').first();
        if (locationElement.length) {
            location = locationElement.text().trim();
        }

        // 4. Extract Avatar Image
        // RA uses standard og:image tags for sharing, which are perfectly sized for avatars.
        let avatarUrl = $('meta[property="og:image"]').attr('content');
        if (!avatarUrl) {
            // Fallback to searching for the primary profile image
            avatarUrl = $('img[alt="' + djName + '"]').attr('src');
        }

        return NextResponse.json({
            success: true,
            data: {
                djName: djName || null,
                bio: bio || null,
                location: location || null,
                avatarUrl: avatarUrl || null
            }
        });

    } catch (error: any) {
        console.error('[Scraper] Failed to parse RA profile:', error);
        return NextResponse.json({ error: "An unexpected error occurred while parsing the profile." }, { status: 500 });
    }
}
