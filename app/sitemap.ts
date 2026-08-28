import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/roof-repair', '/storm-damage', '/commercial-roofing', '/service-areas', '/service-areas/alpharetta', '/service-areas/roswell', '/service-areas/milton', '/service-areas/johns-creek', '/service-areas/cumming', '/services', '/quality', '/start', '/roof-advisor', '/customize', '/guides', '/marketplace', '/project-center', '/legal'];
  return routes.map((route) => ({ url: `https://cowboyroofsupport.com${route}`, changeFrequency: route === '' ? 'weekly' : 'monthly', priority: route === '' ? 1 : route.includes('service-areas/') ? 0.8 : 0.9 }));
}
