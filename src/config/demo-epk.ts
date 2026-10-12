import { EPKProfileData } from '@/components/epk/EPKContent';

/**
 * Flagship finished demo EPK for showcase and marketing.
 * Provides a single, convincing, fully featured press kit with
 * authentic mixes, high-res press assets, clean socials, and upcoming gigs.
 */
export const DEMO_FINISHED_EPK: EPKProfileData = {
    id: 'demo-alex-rivera-epk-001',
    username: 'alexrivera',
    name: 'Alex Rivera',
    location: 'London, UK',
    genres: ['Tech House', 'Techno'],
    tagline: 'Rolling basslines & hypnotic underground grooves.',
    shortBio: 'London-born Alex Rivera has been a staple in the underground tech house scene for over a decade. Resident at Fabric London and Amnesia Ibiza.',
    longBio: 'London-born Alex Rivera has spent the last decade honing a sound defined by rolling basslines, driving percussion, and hypnotic grooves. Holding long-standing residencies across London and Ibiza, Alex has shared stages with industry heavyweights and released tracks supported across leading European club circuits.\n\nWhether commanding the terrace at sunrise or closing the main room, his energetic track selection and impeccable mixing keep dancefloors locked in from the first drop to the final beat.',
    bookingType: 'form',
    publicEmail: 'alexrivera@example.djpromokit.com',
    avatar: 'https://djpromokit.com/examples/alex.png',
    pressShots: ['https://djpromokit.com/examples/alex.png'],
    mixes: [
        {
            title: 'Live Tech House Showcase (London Underground)',
            url: 'https://soundcloud.com/zolocraith/zolo-craith-tech-house-bass'
        }
    ],
    socials: {
        instagram: 'https://instagram.com/alexriveradj',
        soundcloud: 'https://soundcloud.com/alexrivera',
        ra: 'https://ra.co/dj/alexrivera'
    },
    events: [
        {
            id: 'demo-gig-1',
            venue: 'Printworks London',
            date: '2026-11-20',
            details: 'Main Room Closing Set',
            ticketUrl: 'https://ra.co/events/uk/london'
        },
        {
            id: 'demo-gig-2',
            venue: 'Fabric London',
            date: '2027-02-14',
            details: 'Room 1 Extended Set',
            ticketUrl: 'https://fabriclondon.com'
        },
        {
            id: 'demo-gig-3',
            venue: 'Amnesia Ibiza',
            date: '2027-06-18',
            details: 'Terrace Sunrise Residency',
            ticketUrl: 'https://amnesia.es'
        }
    ],
    isPublished: true
};

export const DEMO_EPKS: Record<string, EPKProfileData> = {
    'alexrivera': DEMO_FINISHED_EPK
};
