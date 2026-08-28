import type { Metadata } from 'next';
import { DirectoryHub } from '../components/DirectoryHub';
import { getNavigationGroup } from '../site-directory';

export const metadata: Metadata = {
  title: 'Company Directory',
  description: 'Navigate Cowboy Roof Support quality, customer experience, growth, referrals, field operations, family companies, and trust files.',
};

export default function CompanyHubPage() {
  const group = getNavigationGroup('company');
  if (!group) return null;
  return <DirectoryHub group={group}/>;
}
