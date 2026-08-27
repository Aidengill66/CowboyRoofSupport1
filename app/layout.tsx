import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cowboyroofsupport.com'),
  title: 'Cowboy Roof Support | Straight-Talking Roofing Help',
  description: 'Roof repair, replacement, and storm damage support with clear estimates and dependable service.',
  openGraph: {
    title: 'Cowboy Roof Support',
    description: 'Straight answers. Solid workmanship.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cowboy Roof Support',
    description: 'Straight answers. Solid workmanship.',
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
