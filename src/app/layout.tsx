import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://djpromokit.com'),
  title: 'DJ Promo Kit | Your DJ press kit link, built in minutes.',
  description: 'Give DJs a single link that gets them booked faster. Build a pro EPK in under 10 minutes with DJ Promo Kit.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen selection:bg-purple-500/30">
        {children}
      </body>
    </html>
  );
}
