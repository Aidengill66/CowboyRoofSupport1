import type { Metadata } from 'next';
import './globals.css';
import './systems.css';
import './directory.css';
import './intelligence.css';
import './page-identities.css';
import './command-center.css';
import './repair-command.css';
import './inspection-builder.css';
import './customer-center.css';
import './cowboy-theme.css';
import './experience-upgrade.css';
import './marketplace-upgrade.css';
import './rewards-upgrade.css';
import { SiteFooter, SiteHeader } from './components/SiteChrome';
import { PageIdentityLayer } from './components/PageIdentityLayer';
import { InteractionLayer } from './components/InteractionLayer';
import { BusinessSchema } from './components/BusinessSchema';
import { LeadSourceCapture } from './components/LeadSourceCapture';

export const metadata: Metadata = {
  metadataBase: new URL('https://cowboyroofsupport.com'),
  title: { default: 'Cowboy Roof Support | North Atlanta Roofing', template: '%s | Cowboy Roof Support' },
  description: 'Friendly North Atlanta roofers with an interactive Roof Copilot, smart planning tools, premium material systems, documented quality checks, and straight-shooting service.',
  icons: { icon: '/cowboy-roof-logo-v2-256.png', apple: '/cowboy-roof-logo-v2-256.png' },
  openGraph: { title: 'Cowboy Roof Support', description: 'Roofed right. Cowboy built.', images: ['/og-quality.png'] },
  twitter: { card: 'summary_large_image', title: 'Cowboy Roof Support', description: 'Roofed right. Cowboy built.', images: ['/og-quality.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><BusinessSchema /></head><body><LeadSourceCapture /><SiteHeader /><InteractionLayer /><PageIdentityLayer>{children}</PageIdentityLayer><SiteFooter /></body></html>;
}
