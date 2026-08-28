import type { Metadata } from 'next';
import { DirectoryHub } from '../components/DirectoryHub';
import { getNavigationGroup } from '../site-directory';

export const metadata: Metadata = {
  title: 'Shop Directory',
  description: 'Navigate Cowboy Roof Support roof systems, performance upgrades, field goods, rewards, and marketplace tools.',
};

export default function ShopHubPage() {
  const group = getNavigationGroup('shop');
  if (!group) return null;
  return <DirectoryHub group={group}/>;
}
