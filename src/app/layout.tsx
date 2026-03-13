import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://djpromokit.com'),
  title: 'DJ Promo Kit | Your DJ press kit link, built in minutes.',
  description: 'Give DJs a single link that gets them booked faster. Build a pro EPK in under 10 minutes with DJ Promo Kit.',
  openGraph: {
    title: 'DJ Promo Kit | Your DJ press kit link, built in minutes.',
    description: 'Give DJs a single link that gets them booked faster. Build a pro EPK in under 10 minutes with DJ Promo Kit.',
    url: 'https://djpromokit.com',
    siteName: 'DJ Promo Kit',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DJ Promo Kit | Your DJ press kit link, built in minutes.',
    description: 'Give DJs a single link that gets them booked faster. Build a pro EPK in under 10 minutes with DJ Promo Kit.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://djpromokit.com/#website',
      url: 'https://djpromokit.com',
      name: 'DJ Promo Kit',
      description: 'Your DJ press kit link, built in minutes.',
      publisher: {
        '@id': 'https://djpromokit.com/#organization',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://djpromokit.com/#software',
      name: 'DJ Promo Kit',
      applicationCategory: 'BrowserApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '5.99',
        priceCurrency: 'GBP',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen selection:bg-purple-500/30">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1204982698088163');
            fbq('track', 'PageView');
          `}
        </Script>
        {children}
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1204982698088163&ev=PageView&noscript=1" alt="" />
        </noscript>
      </body>
    </html>
  );
}
