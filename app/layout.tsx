import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cowboyroofsupport.com'),
  title: 'Cowboy Roof Support | North Atlanta Roofing, Reimagined',
  description: 'Explore premium roof systems, compare materials, and start your North Atlanta roofing project in one modern marketplace.',
  openGraph: {
    title: 'Cowboy Roof Support',
    description: 'North Atlanta roofing, reimagined.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cowboy Roof Support',
    description: 'North Atlanta roofing, reimagined.',
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
