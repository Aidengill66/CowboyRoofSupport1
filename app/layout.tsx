import type { Metadata } from 'next';
import './globals.css';
import { SiteFooter, SiteHeader } from './components/SiteChrome';

export const metadata: Metadata = {
  metadataBase: new URL('https://cowboyroofsupport.com'),
  title: { default: 'Cowboy Roof Support | North Atlanta Roofing', template: '%s | Cowboy Roof Support' },
  description: 'Friendly, expert North Atlanta roofers with smart planning tools, premium material systems, documented quality checks, and straight-shooting service.',
  openGraph: { title: 'Cowboy Roof Support', description: 'Roofed right. Cowboy built.', images: ['/og-quality.png'] },
  twitter: { card: 'summary_large_image', title: 'Cowboy Roof Support', description: 'Roofed right. Cowboy built.', images: ['/og-quality.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader />{children}<SiteFooter /></body></html>;
}
