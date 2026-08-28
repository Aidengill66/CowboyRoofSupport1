import type { Metadata } from 'next';
import './globals.css';
import { SiteFooter, SiteHeader } from './components/SiteChrome';

export const metadata: Metadata = {
  metadataBase: new URL('https://cowboyroofsupport.com'),
  title: { default: 'Cowboy Roof Support | North Atlanta Roofing', template: '%s | Cowboy Roof Support' },
  description: 'Modern residential and large-scale roofing for North Atlanta. Customize a roof, compare systems, explore blueprints, and plan your project.',
  openGraph: { title: 'Cowboy Roof Support', description: 'Roofed right. Cowboy built.', images: ['/og-architectural.png'] },
  twitter: { card: 'summary_large_image', title: 'Cowboy Roof Support', description: 'Roofed right. Cowboy built.', images: ['/og-architectural.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader />{children}<SiteFooter /></body></html>;
}
