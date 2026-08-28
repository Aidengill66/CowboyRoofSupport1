export function BusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['RoofingContractor', 'LocalBusiness'],
    '@id': 'https://cowboyroofsupport.com/#business',
    name: 'Cowboy Roof Support',
    url: 'https://cowboyroofsupport.com',
    telephone: '+1-470-834-2519',
    email: 'hello@cowboyroofsupport.com',
    priceRange: '$$-$$$$',
    address: { '@type': 'PostalAddress', addressLocality: 'Atlanta', addressRegion: 'GA', addressCountry: 'US' },
    areaServed: ['North Atlanta', 'Alpharetta', 'Roswell', 'Milton', 'Johns Creek', 'Cumming', 'Woodstock'].map((name) => ({ '@type': 'Place', name })),
    serviceType: ['Roof inspection', 'Roof repair', 'Roof replacement', 'Storm damage inspection', 'Commercial roofing'],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/>
}
