import type { Metadata } from 'next';
import { MarketplaceWorkbench } from '../components/MarketplaceWorkbench';

export const metadata: Metadata = {
  title: 'Cowboy Marketplace',
  description: 'Compare roof systems, performance upgrades, storm-readiness products, and Cowboy field goods in one interactive project workbench.',
};

export default function MarketplacePage() {
  return <main className="marketplace-page"><MarketplaceWorkbench /></main>;
}
