import type { Metadata } from 'next';
import './globals.css';
import './systems.css';
import { SiteFooter, SiteHeader } from './components/SiteChrome';
import { InteractionLayer } from './components/InteractionLayer';
import { BusinessSchema } from './components/BusinessSchema';
import { LeadSourceCapture } from './components/LeadSourceCapture';

export const metadata: Metadata = {
  metadataBase: new URL('https://cowboyroofsupport.com'),
  title: { default: 'Cowboy Roof Support | North Atlanta Roofing', template: '%s | Cowboy Roof Support' },
  description: 'Friendly North Atlanta roofers with an interactive Roof Copilot, smart planning tools, premium material systems, documented quality checks, and straight-shooting service.',
  openGraph: { title: 'Cowboy Roof Support', description: 'Roofed right. Cowboy built.', images: ['/og-quality.png'] },
  twitter: { card: 'summary_large_image', title: 'Cowboy Roof Support', description: 'Roofed right. Cowboy built.', images: ['/og-quality.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><BusinessSchema /></head><body><LeadSourceCapture /><SiteHeader /><InteractionLayer />{children}<SiteFooter /></body></html>;
}
