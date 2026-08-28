import type { Metadata } from 'next';
import { DirectoryHub } from '../components/DirectoryHub';
import { getNavigationGroup } from '../site-directory';

export const metadata: Metadata = {
  title: 'Roofing Directory',
  description: 'Navigate Cowboy Roof Support services, roof systems, property types, project tools, and technical roofing files.',
};

export default function RoofingHubPage() {
  const group = getNavigationGroup('roofing');
  if (!group) return null;
  return <DirectoryHub group={group}/>;
}
