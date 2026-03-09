import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link, Font, Svg, Path, Defs, LinearGradient, Stop, Rect } from '@react-pdf/renderer';
import { EPKProfileData } from '../epk/EPKContent';

// Register Google Fonts
Font.register({
    family: 'Inter',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf', fontWeight: 400 },
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf', fontWeight: 600 },
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf', fontWeight: 900 }
    ]
});

// Create styles for A4 Landscape
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#020617', // Match Site Very Dark BG
        fontFamily: 'Inter',
        color: '#f8fafc',
    },
    hero: {
        height: 220,
        position: 'relative',
        width: '100%',
        backgroundColor: '#0f172a',
    },
    heroBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.6,
    },
    heroOverlayTextContainer: {
        position: 'absolute',
        bottom: 25,
        left: 40,
        right: 40,
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 24,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        objectFit: 'cover',
        border: '3pt solid #020617',
    },
    heroTextFlex: {
        flex: 1,
    },
    location: {
        fontSize: 10,
        color: '#38bdf8',
        marginBottom: 6,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: 900,
    },
    name: {
        fontSize: 42,
        fontWeight: 900,
        color: '#ffffff',
        marginBottom: 8,
        letterSpacing: -1,
    },
    tagline: {
        fontSize: 14,
        color: '#e2e8f0',
        marginBottom: 10,
        fontWeight: 400,
    },
    genres: {
        flexDirection: 'row',
        gap: 6,
        flexWrap: 'wrap',
    },
    genreTag: {
        backgroundColor: 'rgba(30, 41, 59, 0.8)', // slate-800 translucent
        border: '1pt solid rgba(148, 163, 184, 0.2)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        fontSize: 9,
        fontWeight: 600,
        color: '#cbd5e1',
        textTransform: 'uppercase',
    },
    mainLayout: {
        flexDirection: 'row',
        padding: 40,
        gap: 40,
    },
    leftColumn: {
        flex: 1.5, // 60% approx
    },
    rightColumn: {
        flex: 1,   // 40% approx
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 900,
        color: '#ffffff',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 12,
        borderBottom: '1pt solid #1e293b',
        paddingBottom: 6,
    },
    bioText: {
        fontSize: 10,
        lineHeight: 1.6,
        color: '#cbd5e1',
        marginBottom: 10,
    },
    mixRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        padding: 10,
        borderRadius: 8,
        border: '1pt solid #1e293b',
        marginBottom: 8,
    },
    mixTitle: {
        flex: 1,
        fontSize: 11,
        fontWeight: 600,
        color: '#ffffff',
    },
    mixLinkButton: {
        backgroundColor: '#7c3aed',
        color: '#ffffff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        fontSize: 9,
        fontWeight: 600,
        textDecoration: 'none',
        textTransform: 'uppercase',
    },
    socialGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    socialLinkWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#0f172a',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        border: '1pt solid #1e293b',
        width: '48%',
    },
    socialIconContainer: {
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialText: {
        fontSize: 10,
        fontWeight: 600,
        color: '#f8fafc',
        textDecoration: 'none',
    },
    pressShotContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    pressShotLink: {
        width: '48%',
        height: 110,
        textDecoration: 'none',
    },
    pressShot: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 8,
        border: '1pt solid #1e293b',
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 40,
        backgroundColor: '#0f172a',
        borderTop: '1pt solid #1e293b',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    footerText: {
        fontSize: 9,
        color: '#64748b',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    footerLink: {
        fontSize: 9,
        color: '#7c3aed',
        textDecoration: 'none',
        fontWeight: 900,
        letterSpacing: 0.5,
    }
});

// SVG Icons
const Icons = {
    Email: () => (
        <Svg viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <Path d="M22 6l-10 7L2 6" />
        </Svg>
    ),
    Instagram: () => (
        <Svg viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <Path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <Path d="M17.5 6.5h.01" />
        </Svg>
    ),
    Soundcloud: () => (
        <Svg viewBox="0 0 24 24" fill="#f97316" stroke="none">
            <Path d="M11.536 12.89L11 9l-1-2-.536-1.11h-.032L8.9 6.89l-1 2-.536 4H7.33L8.4 17.51a.634.634 0 00.569.38h1.8a.64.64 0 00.574-.4l.794-4.6zM22.04 15.61l-1.92-3.8A3.01 3.01 0 0017.44 10H13.6L12.92 6a3.67 3.67 0 00-7.23 0L5.01 10H1.56a3.01 3.01 0 00-2.68 1.81l-1.92 3.8A3 3 0 000 18.02V20h22v-1.98a3 3 0 00-2.96-2.41z" />
        </Svg>
    ),
    Mixcloud: () => (
        <Svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <Path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </Svg>
    ),
    Youtube: () => (
        <Svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
            <Path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" />
        </Svg>
    ),
    Spotify: () => (
        <Svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
            <Path d="M8.5 10c2 .5 4.5.5 6.5 0" />
            <Path d="M8 13.5c2 .5 5 .5 7 0" />
            <Path d="M8.5 16.5c2 .5 4 .5 5.5 0" />
        </Svg>
    ),
    ResidentAdvisor: () => (
        <Svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <Path d="M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        </Svg>
    )
};

// The Component
export const EPKDocument = ({ profile }: { profile: EPKProfileData }) => {

    // Choose hero background: either first press shot, or avatar.
    const heroBgUrl = (profile.pressShots && profile.pressShots.length > 0)
        ? profile.pressShots[0]
        : (profile.avatar || undefined);

    const renderSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'instagram': return <Icons.Instagram />;
            case 'soundcloud': return <Icons.Soundcloud />;
            case 'mixcloud': return <Icons.Mixcloud />;
            case 'spotify': return <Icons.Spotify />;
            case 'youtube': return <Icons.Youtube />;
            case 'ra': return <Icons.ResidentAdvisor />;
            default: return <Icons.Email />;
        }
    };

    return (
        <Document title={`${profile.name} - Electronic Press Kit`} author={profile.name}>
            <Page size="A4" orientation="landscape" style={styles.page}>

                {/* HERO BLOCK WITH PRESS IMAGE BACKGROUND */}
                <View style={styles.hero}>
                    {heroBgUrl && (
                        <Image src={heroBgUrl} style={styles.heroBg} />
                    )}

                    {/* Gradient Overlay moving up from bottom */}
                    <Svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100vw', height: '100%' }}>
                        <Defs>
                            <LinearGradient id="heroGrad" x1="0" y1="1" x2="0" y2="0">
                                <Stop offset="0" stopColor="#020617" stopOpacity={1} />
                                <Stop offset="0.6" stopColor="#020617" stopOpacity={0.4} />
                                <Stop offset="1" stopColor="#020617" stopOpacity={0} />
                            </LinearGradient>
                        </Defs>
                        <Rect width="100%" height="100%" fill="url('#heroGrad')" />
                    </Svg>

                    {/* HERO FOREGROUND TEXT */}
                    <View style={styles.heroOverlayTextContainer}>
                        {profile.avatar && (
                            <Image src={profile.avatar} style={styles.avatar} />
                        )}
                        <View style={styles.heroTextFlex}>
                            {profile.location && <Text style={styles.location}>{profile.location}</Text>}
                            <Text style={styles.name}>{profile.name}</Text>
                            {profile.tagline && <Text style={styles.tagline}>{profile.tagline}</Text>}

                            {profile.genres && profile.genres.length > 0 && (
                                <View style={styles.genres}>
                                    {profile.genres.map((genre, i) => (
                                        <View key={i} style={styles.genreTag}>
                                            <Text>{genre}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                {/* 2 COLUMN LAYOUT MAIN CONTENT */}
                <View style={styles.mainLayout}>

                    {/* LEFT COLUMN: BIO & MIXES */}
                    <View style={styles.leftColumn}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Biography</Text>
                            {profile.shortBio && <Text style={styles.bioText}>{profile.shortBio}</Text>}
                            {profile.longBio && <Text style={styles.bioText}>{profile.longBio}</Text>}
                        </View>

                        {profile.mixes && profile.mixes.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Featured Media</Text>
                                <View style={{ flexDirection: 'column' }}>
                                    {profile.mixes.map((mix, i) => (
                                        <View key={i} style={styles.mixRow}>
                                            <Text style={styles.mixTitle}>{mix.title}</Text>
                                            <Link src={mix.url} style={styles.mixLinkButton}>
                                                Listen
                                            </Link>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>

                    {/* RIGHT COLUMN: BOOKING, SOCIALS, PRESS CUTS */}
                    <View style={styles.rightColumn}>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Connect & Booking</Text>
                            <View style={styles.socialGrid}>
                                {profile.publicEmail && (
                                    <Link src={`mailto:${profile.publicEmail}`} style={{ textDecoration: 'none', width: '48%' }}>
                                        <View style={styles.socialLinkWrapper}>
                                            <View style={styles.socialIconContainer}>{renderSocialIcon('email')}</View>
                                            <Text style={styles.socialText}>Email Booking</Text>
                                        </View>
                                    </Link>
                                )}
                                {profile.socials && Object.entries(profile.socials).map(([platform, url]) => (
                                    <Link key={platform} src={url as string} style={{ textDecoration: 'none', width: '48%' }}>
                                        <View style={styles.socialLinkWrapper}>
                                            <View style={styles.socialIconContainer}>{renderSocialIcon(platform)}</View>
                                            <Text style={styles.socialText}>
                                                {platform === 'ra' ? 'Resident Advisor' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                                            </Text>
                                        </View>
                                    </Link>
                                ))}
                            </View>
                        </View>

                        {profile.pressShots && profile.pressShots.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Press Assets (Click to HD)</Text>
                                <View style={styles.pressShotContainer}>
                                    {profile.pressShots.slice(0, 4).map((shot, i) => (
                                        <Link key={i} src={shot} style={styles.pressShotLink}>
                                            <Image src={shot} style={styles.pressShot} />
                                        </Link>
                                    ))}
                                </View>
                            </View>
                        )}

                    </View>
                </View>

                {/* FOOTER */}
                <View style={styles.footerContainer} fixed>
                    <Text style={styles.footerText}>Electronic Press Kit</Text>
                    <Link src={`https://djpromokit.com/${profile.username}`} style={styles.footerLink}>
                        djpromokit.com/{profile.username}
                    </Link>
                </View>
            </Page>
        </Document>
    );
};
