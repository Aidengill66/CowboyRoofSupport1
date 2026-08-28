import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cowboyroofsupport.com'),
  title: 'Cowboy Roof Support | Roofed Right. Cowboy Built.',
  description: 'Premium North Atlanta roofing, western goods, rewards, alerts, and large-project capabilities—all built on modern service and cowboy values.',
  openGraph: {
    title: 'Cowboy Roof Support',
    description: 'Roofed right. Cowboy built.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cowboy Roof Support',
    description: 'Roofed right. Cowboy built.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
