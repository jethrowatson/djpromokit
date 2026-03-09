import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link, Font, Svg, Path, Defs, LinearGradient, Stop, Rect } from '@react-pdf/renderer';
import { EPKProfileData } from '../epk/EPKContent';

// Register a Google Font (Inter) for clean, professional PDF text
Font.register({
    family: 'Inter',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf', fontWeight: 400 },
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf', fontWeight: 600 },
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf', fontWeight: 900 }
    ]
});

// Create styles for the PDF
// We use a dark theme aesthetic to match the website
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#020617', // Match Site Very Dark BG
        fontFamily: 'Inter',
        color: '#f8fafc',
    },
    pageContent: {
        paddingTop: 50,
        paddingBottom: 60,
        paddingHorizontal: 50,
        zIndex: 10,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 30,
        gap: 24,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 65,
        objectFit: 'cover',
        border: '3pt solid #1e293b',
    },
    headerText: {
        flex: 1,
    },
    name: {
        fontSize: 36,
        fontWeight: 900,
        color: '#ffffff',
        marginBottom: 6,
        letterSpacing: -1,
    },
    tagline: {
        fontSize: 14,
        color: '#94a3b8',
        marginBottom: 10,
        fontWeight: 400,
    },
    location: {
        fontSize: 10,
        color: '#38bdf8',
        marginBottom: 6,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    genres: {
        flexDirection: 'row',
        gap: 6,
        flexWrap: 'wrap',
    },
    genreTag: {
        backgroundColor: '#1e293b',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        fontSize: 9,
        fontWeight: 600,
        color: '#cbd5e1',
        textTransform: 'uppercase',
    },
    section: {
        marginBottom: 30,
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
        fontSize: 11,
        lineHeight: 1.6,
        color: '#cbd5e1',
        marginBottom: 12,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    card: {
        width: '47%',
        backgroundColor: '#0f172a',
        padding: 16,
        borderRadius: 12,
        border: '1pt solid #1e293b',
    },
    cardTitle: {
        fontSize: 11,
        fontWeight: 900,
        color: '#ffffff',
        marginBottom: 10,
        lineHeight: 1.4,
    },
    linkButton: {
        backgroundColor: '#7c3aed', // Purple to match site CTA
        color: '#ffffff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        fontSize: 9,
        fontWeight: 600,
        textAlign: 'center',
        textDecoration: 'none',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    socialGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    socialLinkWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#0f172a',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        border: '1pt solid #1e293b',
        width: '31%',
    },
    socialIconContainer: {
        width: 14,
        height: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialText: {
        fontSize: 9,
        fontWeight: 600,
        color: '#cbd5e1',
        textDecoration: 'none',
    },
    pressShotContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 40,
    },
    pressShot: {
        width: '48%',
        height: 160,
        objectFit: 'cover',
        borderRadius: 12,
        border: '1pt solid #1e293b',
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: '#0f172a',
        borderTop: '1pt solid #1e293b',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 50,
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
    // Helper to format social link labels
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
            <Page size="A4" style={styles.page}>
                {/* Background Gradient */}
                <Svg style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
                    <Defs>
                        <LinearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
                            <Stop offset="0" stopColor="#0f172a" />
                            <Stop offset="0.5" stopColor="#020617" />
                            <Stop offset="1" stopColor="#1e1b4b" />
                        </LinearGradient>
                    </Defs>
                    <Rect width="100%" height="100%" fill="url('#bgGrad')" opacity={0.5} />
                </Svg>

                <View style={styles.pageContent}>
                    {/* HEAD */}
                    <View style={styles.header}>
                        {profile.avatar && (
                            <Image src={profile.avatar} style={styles.avatar} />
                        )}
                        <View style={styles.headerText}>
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

                    {/* BIOGRAPHY */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Biography</Text>
                        <Text style={styles.bioText}>{profile.shortBio}</Text>
                        {profile.longBio && (
                            <Text style={styles.bioText}>{profile.longBio}</Text>
                        )}
                    </View>

                    {/* FEATURED MIXES */}
                    {profile.mixes && profile.mixes.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Featured Media</Text>
                            <View style={styles.grid}>
                                {profile.mixes.map((mix, i) => (
                                    <View key={i} style={styles.card}>
                                        <Text style={styles.cardTitle}>{mix.title}</Text>
                                        <Link src={mix.url} style={styles.linkButton}>
                                            Listen / Watch
                                        </Link>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* SOCIAL LINKS & CONTACT */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Connect & Booking</Text>
                        <View style={styles.socialGrid}>
                            {profile.publicEmail && (
                                <Link src={`mailto:${profile.publicEmail}`} style={{ textDecoration: 'none', width: '31%' }}>
                                    <View style={styles.socialLinkWrapper}>
                                        <View style={styles.socialIconContainer}>{renderSocialIcon('email')}</View>
                                        <Text style={styles.socialText}>Email Bookings</Text>
                                    </View>
                                </Link>
                            )}
                            {Object.entries(profile.socials).map(([platform, url]) => (
                                <Link key={platform} src={url as string} style={{ textDecoration: 'none', width: '31%' }}>
                                    <View style={styles.socialLinkWrapper}>
                                        <View style={styles.socialIconContainer}>{renderSocialIcon(platform)}</View>
                                        <Text style={styles.socialText}>{platform === 'ra' ? 'Resident Advisor' : platform.charAt(0).toUpperCase() + platform.slice(1)}</Text>
                                    </View>
                                </Link>
                            ))}
                        </View>
                    </View>

                    {/* PRESS SHOTS */}
                    {profile.pressShots && profile.pressShots.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Press Assets</Text>
                            <View style={styles.pressShotContainer}>
                                {profile.pressShots.slice(0, 4).map((shot, i) => (
                                    <Image key={i} src={shot} style={styles.pressShot} />
                                ))}
                            </View>
                        </View>
                    )}
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
