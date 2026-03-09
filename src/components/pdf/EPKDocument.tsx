import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link, Font } from '@react-pdf/renderer';
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
        backgroundColor: '#0f172a', // Tailwind slate-900
        padding: 40,
        fontFamily: 'Inter',
        color: '#f8fafc', // Tailwind slate-50
    },
    header: {
        flexDirection: 'row',
        marginBottom: 30,
        gap: 20,
        alignItems: 'center',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        objectFit: 'cover',
        border: '4pt solid #3b82f6', // Tailwind blue-500
    },
    headerText: {
        flex: 1,
    },
    name: {
        fontSize: 32,
        fontWeight: 900,
        color: '#ffffff',
        marginBottom: 4,
    },
    tagline: {
        fontSize: 16,
        color: '#94a3b8', // Tailwind slate-400
        marginBottom: 8,
    },
    location: {
        fontSize: 12,
        color: '#cbd5e1', // Tailwind slate-300
        marginBottom: 4,
    },
    genres: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
    },
    genreTag: {
        backgroundColor: '#1e293b', // Tailwind slate-800
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        fontSize: 10,
        color: '#f8fafc',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 600,
        color: '#38bdf8', // Tailwind sky-400
        marginBottom: 12,
        borderBottom: '1pt solid #1e293b',
        paddingBottom: 4,
    },
    bioText: {
        fontSize: 11,
        lineHeight: 1.5,
        color: '#e2e8f0', // Tailwind slate-200
        marginBottom: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    card: {
        width: '48%',
        backgroundColor: '#1e293b',
        padding: 12,
        borderRadius: 8,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: 600,
        color: '#ffffff',
        marginBottom: 8,
    },
    linkButton: {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 4,
        fontSize: 10,
        textAlign: 'center',
        textDecoration: 'none',
    },
    socialGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    socialLink: {
        backgroundColor: '#0ea5e9', // Tailwind sky-500
        color: '#ffffff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        fontSize: 10,
        textDecoration: 'none',
    },
    pressShotContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    pressShot: {
        width: '48%',
        height: 150,
        objectFit: 'cover',
        borderRadius: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 40,
        right: 40,
        borderTop: '1pt solid #1e293b',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: {
        fontSize: 10,
        color: '#64748b', // Tailwind slate-500
    },
    footerLink: {
        fontSize: 10,
        color: '#38bdf8',
        textDecoration: 'none',
    }
});

// The Component
export const EPKDocument = ({ profile }: { profile: EPKProfileData }) => {
    // Helper to format social link labels
    const formatSocialDomain = (url: string) => {
        try {
            const domain = new URL(url).hostname.replace('www.', '');
            return domain.charAt(0).toUpperCase() + domain.slice(1);
        } catch {
            return "Link";
        }
    };

    return (
        <Document title={`${profile.name} - Electronic Press Kit`} author={profile.name}>
            <Page size="A4" style={styles.page}>
                {/* HEAD */}
                <View style={styles.header}>
                    {profile.avatar && (
                        <Image src={profile.avatar} style={styles.avatar} />
                    )}
                    <View style={styles.headerText}>
                        <Text style={styles.name}>{profile.name}</Text>
                        {profile.tagline && <Text style={styles.tagline}>{profile.tagline}</Text>}
                        {profile.location && <Text style={styles.location}>{profile.location}</Text>}

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
                        <Text style={styles.sectionTitle}>Featured Mixes & Media</Text>
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
                            <Link src={`mailto:${profile.publicEmail}`} style={styles.socialLink}>
                                {profile.publicEmail}
                            </Link>
                        )}
                        {Object.entries(profile.socials).map(([platform, url]) => (
                            <Link key={platform} src={url as string} style={styles.socialLink}>
                                {formatSocialDomain(url as string)}
                            </Link>
                        ))}
                    </View>
                </View>

                {/* PRESS SHOTS */}
                {profile.pressShots && profile.pressShots.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>High-Res Press Shots</Text>
                        <View style={styles.pressShotContainer}>
                            {profile.pressShots.slice(0, 4).map((shot, i) => (
                                <Image key={i} src={shot} style={styles.pressShot} />
                            ))}
                        </View>
                    </View>
                )}

                {/* FOOTER */}
                <View style={styles.footer} fixed>
                    <Text style={styles.footerText}>Generated securely via DJ Promo Kit</Text>
                    <Link src={`https://djpromokit.com/${profile.username}`} style={styles.footerLink}>
                        djpromokit.com/{profile.username}
                    </Link>
                </View>
            </Page>
        </Document>
    );
};
