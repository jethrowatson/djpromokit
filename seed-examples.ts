import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase URL or Service Key. Make sure they are set in your environment.");
    process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

const examples = [
    {
        name: "Alex Rivera",
        username: "alexrivera",
        genre: ["Tech House", "Techno"],
        location: "London, UK",
        avatar: "https://djpromokit.com/examples/alex.png",
        bio: "London-born Alex Rivera has been a staple in the underground tech house scene for over a decade. Known for his rolling basslines and hypnotic grooves, Alex has held residencies at some of Ibiza's most iconic clubs.",
        tagline: "Rolling basslines & hypnotic grooves.",
        tracks: [
            { title: "Midnight Roller (Original Mix)", url: "https://soundcloud.com/alexrivera/midnight", platform: "soundcloud" },
            { title: "Warehouse Vibes", url: "https://soundcloud.com/alexrivera/warehouse", platform: "soundcloud" }
        ],
        gigs: [
            { venue: "Printworks", date: "2024-11-15", details: "Main Room Closing Set", is_upcoming: true },
            { venue: "Amnesia Ibiza", date: "2024-08-20", details: "Terrace Sunrise Set", is_upcoming: false }
        ]
    },
    {
        name: "DJ Sarah",
        username: "djsarah",
        genre: ["Wedding/Events", "Pop"],
        location: "Manchester, UK",
        avatar: "https://djpromokit.com/examples/sarah.png",
        bio: "With over 500 successful weddings and corporate events under her belt, Sarah is Manchester's premier luxury event DJ. She seamlessly blends decades of hits to keep dancefloors packed from dusk till dawn.",
        tagline: "Soundtracking your perfect moments.",
        tracks: [
            { title: "Peak Time Wedding Mix 2024", url: "https://mixcloud.com/djsarah/wedding-mix", platform: "mixcloud" }
        ],
        gigs: [
            { venue: "The Midland Hotel", date: "2024-12-05", details: "Corporate Gala", is_upcoming: true },
            { venue: "Peckforton Castle", date: "2024-09-12", details: "Luxury Wedding", is_upcoming: false }
        ]
    },
    {
        name: "DJ Marcus",
        username: "djmarcus",
        genre: ["Hip Hop", "R&B"],
        location: "Birmingham, UK",
        avatar: "https://djpromokit.com/examples/marcus.png",
        bio: "Marcus brings authentic urban energy to every set. From classic 90s hip hop to modern drill and afrobeats, his technical scratch skills and unmatched track selection have made him a highly sought-after talent.",
        tagline: "Authentic urban energy & technical scratches.",
        tracks: [
            { title: "Summer Vibes Mix", url: "https://soundcloud.com/djmarcus/summer", platform: "soundcloud" }
        ],
        gigs: [
            { venue: "O2 Academy", date: "2024-11-20", details: "Supporting Act", is_upcoming: true },
            { venue: "Lab11", date: "2024-10-05", details: "Headline Set", is_upcoming: false }
        ]
    },
    {
        name: "Elena Dub",
        username: "elenadub",
        genre: ["Dubstep", "Drum & Bass"],
        location: "Bristol, UK",
        avatar: "https://djpromokit.com/examples/elena.png",
        bio: "Hailing from Bristol, the pioneer city of bass music, Elena Dub delivers face-melting, high-energy sets. Her unreleased dubplates and chaotic mixing style always leave the crowd begging for a reload.",
        tagline: "Face-melting bass & unreleased dubplates.",
        tracks: [
            { title: "Lost In The Bass", url: "https://soundcloud.com/elenadub/lost", platform: "soundcloud" }
        ],
        gigs: [
            { venue: "Motion Bristol", date: "2024-12-31", details: "NYE Bass Fest", is_upcoming: true },
            { venue: "Lakota", date: "2024-09-30", details: "Jungle Room", is_upcoming: false }
        ]
    },
    {
        name: "DJ Flow",
        username: "djflow",
        genre: ["Deep House", "House"],
        location: "Brighton, UK",
        avatar: "https://djpromokit.com/examples/flow.png",
        bio: "The king of the sunset session. DJ Flow specializes in organic, melodic deep house. His sets are designed to take listeners on an emotional journey, perfect for beach clubs and open-air lounges.",
        tagline: "Organic, melodic sunset sessions.",
        tracks: [
            { title: "Sunset Sessions Vol. 1", url: "https://soundcloud.com/djflow/sunset", platform: "soundcloud" }
        ],
        gigs: [
            { venue: "Shooshh Brighton", date: "2024-11-01", details: "Terrace Party", is_upcoming: true },
            { venue: "Cafe Mambo Ibiza", date: "2024-07-15", details: "Sunset Set", is_upcoming: false }
        ]
    },
    {
        name: "The Twins",
        username: "thetwins",
        genre: ["EDM", "Pop"],
        location: "Leeds, UK",
        avatar: "https://djpromokit.com/examples/twins.png",
        bio: "Mainstage energy. Identical twin brothers who have taken the festival scene by storm. Their explosive big-room sound and syncopated jumping routines make every set an unforgettable stadium experience.",
        tagline: "Explosive mainstage big-room energy.",
        tracks: [
            { title: "Festival Anthem Live", url: "https://soundcloud.com/thetwins/anthem", platform: "soundcloud" }
        ],
        gigs: [
            { venue: "Creamfields", date: "2025-08-25", details: "Mainstage", is_upcoming: true },
            { venue: "O2 Ritz", date: "2024-10-10", details: "Headline Tour", is_upcoming: false }
        ]
    }
];

async function seed() {
    console.log("Starting DB Seed for Example Profiles...");

    for (const ex of examples) {
        console.log(`Processing ${ex.name} (${ex.username})...`);

        const email = `${ex.username}@example.djpromokit.com`;

        // 1. Check if user already exists
        const { data: existingProfiles } = await supabaseAdmin
            .from('profiles')
            .select('id')
            .eq('username', ex.username);

        let userId;

        if (existingProfiles && existingProfiles.length > 0) {
            console.log(`User ${ex.username} already exists, updating their profile.`);
            userId = existingProfiles[0].id;
        } else {
            console.log(`Creating new auth user for ${ex.username}...`);
            const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
                email,
                password: 'password123',
                email_confirm: true,
                user_metadata: {
                    username: ex.username,
                    full_name: ex.name
                }
            });

            if (authError || !authData.user) {
                console.error(`Failed to create auth user for ${ex.username}:`, authError);
                continue;
            }
            userId = authData.user.id;
        }

        // Wait a small bit in case a DB trigger is generating the basic profile
        await new Promise(res => setTimeout(res, 500));

        // 2. Upsert profile directly using service key to bypass RLS, publish them immediately
        console.log('Upserting profile basics...');
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .upsert({
                id: userId,
                username: ex.username,
                name: ex.name,
                location: ex.location,
                genres: ex.genre,
                short_bio: ex.tagline,
                long_bio: ex.bio,
                tagline: ex.tagline,
                is_published: true,
                public_email: email,
                booking_type: 'form',
                avatar_url: ex.avatar
            });

        if (profileError) {
            console.error("Failed to update profile:", profileError);
        }

        // Let's just create some dummy mixes to populate the page

        console.log('Clearing old media/gigs...');
        await supabaseAdmin.from('media').delete().eq('profile_id', userId);
        await supabaseAdmin.from('gig_history').delete().eq('profile_id', userId);

        console.log('Inserting mixes and press shots...');
        // Insert Avatar as press shot
        await supabaseAdmin.from('media').insert({
            profile_id: userId,
            type: 'press_shot',
            url: ex.avatar,
            sort_order: 0
        });

        // Insert mix
        for (const track of ex.tracks) {
            await supabaseAdmin.from('media').insert({
                profile_id: userId,
                type: 'featured_mix',
                title: track.title,
                url: track.url,
                sort_order: 1
            });
        }

        console.log('Inserting gigs...');
        for (const gig of ex.gigs) {
            await supabaseAdmin.from('gig_history').insert({
                profile_id: userId,
                venue: gig.venue,
                date: gig.date,
                details: gig.details,
                is_upcoming: gig.is_upcoming
            });
        }

        // Setup Social Links
        // We will overload instagram with a link to their new image just so they have social links populated
        console.log('Upserting social links...');
        const { error: socialError } = await supabaseAdmin.from('social_links').upsert({
            profile_id: userId,
            instagram: "https://instagram.com",
            soundcloud: "https://soundcloud.com"
        }, { onConflict: 'profile_id' });

        if (socialError) { console.error("Social Error:", socialError); }

        console.log(`Completed ${ex.name}!`);
    }

    console.log("Seeding complete. Run node script!");
}

seed();
