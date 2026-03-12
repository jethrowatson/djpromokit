import * as cheerio from 'cheerio';

export async function scrapeResidentAdvisor(url: string) {
    if (!url || !url.includes('ra.co/dj/')) {
        throw new Error("Invalid Resident Advisor DJ URL");
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
        throw new Error("Could not fetch the Resident Advisor profile.");
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const djName = $('h1').first().text().trim();

    let bio = '';
    const potentialBioBlocks = $('div[data-tracking-id="dj-biography-read-more"], div[class*="Bio"]').text().trim();
    
    if (potentialBioBlocks) {
         bio = potentialBioBlocks;
    } else {
         $('p').each((i, el) => {
             const text = $(el).text().trim();
             if (text.length > 100 && !bio) {
                 bio = text;
             }
         });
    }
    bio = bio.replace(/\s+/g, ' ').trim();

    let location = '';
    const locationElement = $('span[class*="Location"]').first();
    if (locationElement.length) {
        location = locationElement.text().trim();
    }

    let avatarUrl = $('meta[property="og:image"]').attr('content');
    if (!avatarUrl) {
        avatarUrl = $('img[alt="' + djName + '"]').attr('src');
    }

    return {
        djName: djName || null,
        bio: bio || null,
        location: location || null,
        avatarUrl: avatarUrl || null
    };
}
