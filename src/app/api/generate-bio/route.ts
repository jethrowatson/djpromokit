import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { formData, previousShortBio, previousLongBio, feedback } = body;

        let systemPrompt = `You are an expert DJ biography writer. Your task is to write a professional biography for a DJ based on their provided details.
You must return a JSON object with two fields: 'shortBio' (50 to 120 words, for social media and profile headers) and 'longBio' (200 to 350 words, for press kits and promoter submissions).
Tone: Professional, engaging, and suitable for the electronic music industry.

Here is the DJ's information:
- DJ Name: ${formData.djName || 'Not specified'}
- Location: ${formData.location || 'Not specified'}
- Years DJing: ${formData.yearsDjing || 'Not specified'}
- Genres: ${formData.genres?.join(', ') || 'Not specified'}
- Performance History: ${formData.performanceHistory || 'None specified'}
- Influences: ${formData.influences || 'None specified'}
- Is Producer?: ${formData.isProducer ? 'Yes' : 'No'}
${formData.isProducer ? `- Releases: ${formData.releases || 'None specified'}\n- Labels: ${formData.labels || 'None specified'}\n- Favorite Producers: ${formData.favoriteProducers || 'None specified'}` : ''}
- DJ Style & Experience: ${formData.djStyle || 'Not specified'}
- Future Goals: ${formData.goals || 'Not specified'}

The biographies MUST include their DJ name, music style, key influences, performance highlights, production achievements (if relevant), and location (if relevant).`;

        if (feedback && previousShortBio && previousLongBio) {
            systemPrompt += `\n\nThe user has provided feedback on a previous draft. Please rewrite the biographies incorporating this feedback: "${feedback}"\n\nPrevious Short Bio:\n${previousShortBio}\n\nPrevious Long Bio:\n${previousLongBio}`;
        }

        const result = await generateObject({
            model: google('gemini-1.5-pro'),
            system: systemPrompt,
            schema: z.object({
                shortBio: z.string().describe('A concise professional short biography of the DJ, roughly 50 to 120 words.'),
                longBio: z.string().describe('A longer descriptive narrative biography of the DJ, roughly 200 to 350 words.'),
            }),
            prompt: "Generate the short and long biographies now based on the provided details.",
            temperature: 0.7,
        });

        return NextResponse.json({
            shortBio: result.object.shortBio,
            longBio: result.object.longBio
        });

    } catch (error: any) {
        console.error('Bio Generation Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to generate bio' }, { status: 500 });
    }
}
