import type { MetadataRoute } from 'next';
import { libraryFiles } from './library/content';
import { neighborCities } from './neighbors/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/free-inspection', '/neighbors', ...neighborCities.map((city) => `/neighbors/${city.slug}`), '/share', '/roof-replacement', '/roof-repair', '/storm-damage', '/commercial-roofing', '/transformations', '/roof-systems', '/performance-upgrades', '/field-goods', '/library', ...libraryFiles.map((file) => `/library/${file.slug}`), '/service-areas', '/service-areas/alpharetta', '/service-areas/roswell', '/service-areas/milton', '/service-areas/johns-creek', '/service-areas/cumming', '/services', '/quality', '/start', '/roof-advisor', '/customize', '/guides', '/marketplace', '/project-center', '/legal', '/terms', '/privacy', '/accessibility'];
  return routes.map((route) => ({ url: `https://cowboyroofsupport.com${route}`, changeFrequency: route === '' ? 'weekly' : 'monthly', priority: route === '' ? 1 : route.includes('service-areas/') ? 0.8 : 0.9 }));
}
