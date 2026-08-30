import type { Metadata } from 'next';
import { RewardsCommandCenter } from '../components/RewardsCommandCenter';

export const metadata: Metadata = {
  title: 'Cowboy Rewards',
  description: 'Explore the Cowboy Roof Support prototype reward wallet, Roof IQ safety challenge, Leak Wrangler game, missions, achievements, and tier trail.',
};

export default function RewardsPage(){return <main className="rewards-command-page"><RewardsCommandCenter/></main>}
