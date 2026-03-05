import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'DJ Promo Kit';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #0f172a, #000000)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="120"
                        height="120"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#c084fc"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" />
                    </svg>
                </div>

                <h1
                    style={{
                        fontSize: 90,
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        margin: 0,
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    DJ Promo Kit
                </h1>
                <p
                    style={{
                        fontSize: 40,
                        color: '#94a3b8',
                        marginTop: 20,
                        textAlign: 'center',
                        maxWidth: '800px',
                        lineHeight: 1.4,
                    }}
                >
                    Your DJ press kit link, built in minutes.
                </p>
            </div>
        ),
        {
            ...size,
        }
    );
}
