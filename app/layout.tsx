import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cowboyroofsupport.com'),
  title: 'Cowboy Roof Support | North Atlanta Roofing Marketplace',
  description: 'Find practical roofing help across North Atlanta. Choose the job, select your city, and get matched with the right next step.',
  openGraph: {
    title: 'Cowboy Roof Support',
    description: 'North Atlanta’s roofing marketplace.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cowboy Roof Support',
    description: 'North Atlanta’s roofing marketplace.',
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
