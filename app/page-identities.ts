export type PageMotif = 'blueprint' | 'cattle-grid' | 'signal' | 'storm' | 'ledger' | 'supply' | 'topographic' | 'gallery';

export type PageIdentity = {
  code: string;
  collection: string;
  title: string;
  purpose: string;
  outcomes: [string, string, string];
  action: { href: string; label: string };
  accent: string;
  motif: PageMotif;
  showRail?: boolean;
};

const pages: Record<string, PageIdentity> = {
  '/': {
    code: 'CRS / 00', collection: 'THE FRONT PORCH', title: 'Cowboy Roof Support',
    purpose: 'See the company, choose the roof problem, and reach the right trail without wandering.',
    outcomes: ['Choose a need', 'Meet the standard', 'Start with confidence'],
    action: { href: '/start', label: 'START A PROJECT' }, accent: '#e77b3c', motif: 'cattle-grid', showRail: false,
  },
  '/start': {
    code: 'CRS / 01', collection: 'PROJECT INTAKE', title: 'Start a Roof Project',
    purpose: 'Turn a roof concern into a concise, crew-ready project brief in one guided flow.',
    outcomes: ['Choose the job', 'Set the timing', 'Prepare the request'],
    action: { href: '#contact', label: 'BUILD MY REQUEST' }, accent: '#e27b46', motif: 'signal',
  },
  '/free-inspection': {
    code: 'CRS / 02', collection: 'FIELD HANDOFF', title: 'Free Inspection',
    purpose: 'Collect the facts a real inspection team needs while keeping the homeowner in control.',
    outcomes: ['Describe the concern', 'Add safe photos', 'Choose follow-up'],
    action: { href: '#hero-estimate', label: 'REQUEST INSPECTION' }, accent: '#f1a564', motif: 'topographic',
  },
  '/roof-advisor': {
    code: 'CRS / 03', collection: 'ROOF INTELLIGENCE', title: 'Cowboy Roof Advisor',
    purpose: 'Combine field questions and curated roof logic into a responsible starting recommendation.',
    outcomes: ['Analyze six factors', 'Compare assemblies', 'Know the limits'],
    action: { href: '#advisor-workbench', label: 'RUN THE ADVISOR' }, accent: '#f09a56', motif: 'signal',
  },
  '/customize': {
    code: 'CRS / 04', collection: 'DESIGN STUDIO', title: 'Customize Your Roof',
    purpose: 'Shape a roof system around form, material, finish, upgrades, and a transparent planning range.',
    outcomes: ['Build the geometry', 'Choose the finish', 'See the range'],
    action: { href: '#configurator', label: 'OPEN CONFIGURATOR' }, accent: '#6fc7db', motif: 'blueprint',
  },
  '/project-center': {
    code: 'CRS / 05', collection: 'HOMEOWNER COMMAND', title: 'Roof Command Center',
    purpose: 'Keep routing, preparation, timing, and the full project path together in one working surface.',
    outcomes: ['Route the project', 'Prepare the property', 'Track each stage'],
    action: { href: '#command-workspace', label: 'OPEN COMMAND CENTER' }, accent: '#de7b44', motif: 'ledger',
  },
  '/roofing': {
    code: 'CRS / 10', collection: 'ROOFING CABINET', title: 'Residential Roofing Hub',
    purpose: 'Act as the front door to every home-roof service, system, guide, and decision tool.',
    outcomes: ['Find the service', 'Compare systems', 'Open deeper files'],
    action: { href: '/services', label: 'EXPLORE SERVICES' }, accent: '#d07d54', motif: 'cattle-grid',
  },
  '/services': {
    code: 'CRS / 11', collection: 'CAPABILITY MAP', title: 'Roofing Services',
    purpose: 'Show exactly how the company moves from home roofing to complex commercial property work.',
    outcomes: ['Residential first', 'Commercial capable', 'One quality system'],
    action: { href: '/free-inspection', label: 'MATCH MY SERVICE' }, accent: '#d7a46a', motif: 'topographic',
  },
  '/roof-repair': {
    code: 'CRS / 12', collection: 'TARGETED SERVICE', title: 'Roof Repair',
    purpose: 'Separate repairable roof details from symptoms that need broader system evaluation.',
    outcomes: ['Trace the symptom', 'Inspect transitions', 'Choose the repair path'],
    action: { href: '/free-inspection', label: 'START REPAIR INSPECTION' }, accent: '#f0b35f', motif: 'topographic',
  },
  '/roof-replacement': {
    code: 'CRS / 13', collection: 'COMPLETE SYSTEM', title: 'Roof Replacement',
    purpose: 'Explain what a complete replacement includes and how each hidden layer earns its place.',
    outcomes: ['Assess remaining life', 'Design the assembly', 'Plan installation'],
    action: { href: '/customize', label: 'BUILD A ROOF SYSTEM' }, accent: '#dc724c', motif: 'blueprint',
  },
  '/storm-damage': {
    code: 'CRS / 14', collection: 'PRIORITY RESPONSE', title: 'Storm Damage',
    purpose: 'Put safety, temporary protection, documentation, and claim boundaries in the correct order.',
    outcomes: ['Protect people first', 'Document safely', 'Inspect the system'],
    action: { href: '/free-inspection', label: 'REQUEST STORM HELP' }, accent: '#ff675b', motif: 'storm',
  },
  '/commercial-roofing': {
    code: 'CRS / 15', collection: 'LARGE-SCALE SYSTEMS', title: 'Commercial Roofing',
    purpose: 'Frame commercial work around access, safety, drainage, occupants, phasing, and continuity.',
    outcomes: ['Survey roof zones', 'Plan operations', 'Control the handoff'],
    action: { href: '/free-inspection', label: 'START COMMERCIAL REVIEW' }, accent: '#65b9d0', motif: 'ledger',
  },
  '/roof-systems': {
    code: 'CRS / 16', collection: 'MATERIAL LAB', title: 'Roof Systems',
    purpose: 'Compare materials as complete assemblies instead of choosing from a shingle sample alone.',
    outcomes: ['Compare performance', 'Match the slope', 'Choose the assembly'],
    action: { href: '/customize', label: 'CONFIGURE A SYSTEM' }, accent: '#78c6ad', motif: 'blueprint',
  },
  '/performance-upgrades': {
    code: 'CRS / 17', collection: 'HIDDEN PERFORMANCE', title: 'Roof Performance Upgrades',
    purpose: 'Prioritize the water, air, heat, wind, and drainage details that improve the entire roof.',
    outcomes: ['Control water', 'Balance airflow', 'Improve durability'],
    action: { href: '/customize', label: 'ADD PERFORMANCE' }, accent: '#78d4a4', motif: 'signal',
  },
  '/quality': {
    code: 'CRS / 18', collection: 'PROOF STANDARD', title: 'Quality & Protection',
    purpose: 'Make workmanship, property protection, insurance records, credentials, and closeout inspectable.',
    outcomes: ['Verify the company', 'See checkpoints', 'Protect the property'],
    action: { href: '/free-inspection', label: 'MEET THE STANDARD' }, accent: '#e1a06e', motif: 'cattle-grid',
  },
  '/transformations': {
    code: 'CRS / 19', collection: 'ESTATE HANGAR', title: 'Roof Transformations',
    purpose: 'Show mansion-scale design concepts while opening the technical system behind every finish.',
    outcomes: ['Compare before/after', 'Inspect design logic', 'Open project files'],
    action: { href: '/free-inspection', label: 'PLAN MY PROPERTY' }, accent: '#d69b79', motif: 'gallery',
  },
  '/guides': {
    code: 'CRS / 20', collection: 'HOMEOWNER EDUCATION', title: 'Roofing Guides',
    purpose: 'Explain the roof, the price drivers, and the project sequence without roofing riddles.',
    outcomes: ['Learn the layers', 'Understand price', 'Prepare safely'],
    action: { href: '/library', label: 'OPEN THE LIBRARY' }, accent: '#74b8d4', motif: 'blueprint',
  },
  '/library': {
    code: 'CRS / 21', collection: 'INFORMATION WAREHOUSE', title: 'Roofing Library',
    purpose: 'Organize technical roofing knowledge into cabinets, folders, files, and clear next actions.',
    outcomes: ['Choose a cabinet', 'Open one file', 'Go as deep as needed'],
    action: { href: '/directory', label: 'SEARCH ALL FILES' }, accent: '#7bc5d8', motif: 'ledger',
  },
  '/directory': {
    code: 'CRS / 22', collection: 'MASTER INDEX', title: 'All Files Directory',
    purpose: 'Search the entire site and open any branch without losing the path back home.',
    outcomes: ['Search every page', 'Follow each split', 'Keep your breadcrumb'],
    action: { href: '#directory-explorer', label: 'EXPLORE THE DIRECTORY' }, accent: '#d9824d', motif: 'ledger',
  },
  '/shop': {
    code: 'CRS / 30', collection: 'COMMERCE CABINET', title: 'Shop Hub',
    purpose: 'Separate roof systems, performance options, field goods, rewards, and drops into clean shelves.',
    outcomes: ['Choose a shelf', 'Build a list', 'Understand readiness'],
    action: { href: '/marketplace', label: 'ENTER MARKETPLACE' }, accent: '#e39a53', motif: 'supply',
  },
  '/marketplace': {
    code: 'CRS / 31', collection: 'PROJECT MARKETPLACE', title: 'Cowboy Marketplace',
    purpose: 'Turn products and upgrades into a visible project list that can be reviewed before sending.',
    outcomes: ['Filter the catalog', 'Select products', 'Send the project list'],
    action: { href: '/field-goods', label: 'EXPLORE FIELD GOODS' }, accent: '#f2a64d', motif: 'supply',
  },
  '/field-goods': {
    code: 'CRS / 32', collection: 'RANCH SHELF', title: 'Cowboy Field Goods',
    purpose: 'Give hats, shirts, boots, storm kits, and sponsor drops a focused merchandise home.',
    outcomes: ['Browse the categories', 'See launch limits', 'Build a gear list'],
    action: { href: '/marketplace', label: 'SHOP FIELD GOODS' }, accent: '#c87849', motif: 'cattle-grid',
  },
  '/rewards': {
    code: 'CRS / 33', collection: 'LOYALTY TRAIL', title: 'Cowboy Rewards',
    purpose: 'Make learning, referring, preparing, and playing feel rewarding before the real program launches.',
    outcomes: ['Earn prototype points', 'Play Leak Wrangler', 'Explore reward tiers'],
    action: { href: '/marketplace', label: 'OPEN MARKETPLACE' }, accent: '#e4c34f', motif: 'signal',
  },
  '/company': {
    code: 'CRS / 40', collection: 'COMPANY CABINET', title: 'Company Hub',
    purpose: 'Bring quality, local presence, family ventures, trust, and operating systems into one company view.',
    outcomes: ['Meet the company', 'Verify the standard', 'Open the network'],
    action: { href: '/quality', label: 'SEE OUR STANDARD' }, accent: '#c98d68', motif: 'cattle-grid',
  },
  '/family': {
    code: 'CRS / 41', collection: 'FAMILY NETWORK', title: 'Family Companies',
    purpose: 'Show how roofing, AI and aerospace, and commercial property care share one operating mindset.',
    outcomes: ['Meet each venture', 'Compare capabilities', 'Follow the network'],
    action: { href: '/services', label: 'EXPLORE THE NETWORK' }, accent: '#ae8bda', motif: 'topographic',
  },
  '/service-areas': {
    code: 'CRS / 42', collection: 'LOCAL ROUTING', title: 'North Atlanta Service Areas',
    purpose: 'Send homeowners to city-specific roof guidance without keyword clutter or generic landing pages.',
    outcomes: ['Choose the city', 'See local signals', 'Confirm availability'],
    action: { href: '/free-inspection', label: 'CHECK MY PROPERTY' }, accent: '#76c28c', motif: 'topographic',
  },
  '/neighbors': {
    code: 'CRS / 43', collection: 'NEIGHBOR FRONT DOOR', title: 'Neighbor Roof Check',
    purpose: 'Turn a trusted local introduction into a helpful, low-pressure roof-check experience.',
    outcomes: ['Describe what you see', 'Choose your city', 'Reach a human'],
    action: { href: '/free-inspection', label: 'START ROOF CHECK' }, accent: '#ef936a', motif: 'topographic',
  },
  '/share': {
    code: 'CRS / 44', collection: 'ORGANIC ACQUISITION', title: 'Family Share Desk',
    purpose: 'Build focused local links and useful Facebook copy that preserves the source trail.',
    outcomes: ['Build the link', 'Copy the post', 'Track the source'],
    action: { href: '/growth', label: 'OPEN GROWTH COMMAND' }, accent: '#e77964', motif: 'signal',
  },
  '/growth': {
    code: 'CRS / 45', collection: 'GROWTH CONTROL', title: 'Growth Command Center',
    purpose: 'Coordinate organic campaigns, referral paths, lead readiness, and the next growth action.',
    outcomes: ['Launch a campaign', 'Measure the trail', 'Improve follow-up'],
    action: { href: '#growth-command', label: 'OPEN GROWTH COMMAND' }, accent: '#d7c253', motif: 'signal',
  },
  '/leads': {
    code: 'CRS / 46', collection: 'LEAD OPERATIONS', title: 'Local Lead Desk',
    purpose: 'Give every warm introduction a clear source, status, priority, and next contact action.',
    outcomes: ['Capture the lead', 'Set the priority', 'Move the follow-up'],
    action: { href: '/network', label: 'BUILD PARTNER NETWORK' }, accent: '#e6bd4c', motif: 'ledger',
  },
  '/network': {
    code: 'CRS / 47', collection: 'PARTNER OPERATIONS', title: 'Referral Partner Network',
    purpose: 'Organize family, neighbors, property professionals, and commercial partners into accountable trails.',
    outcomes: ['Choose partner type', 'Prepare the introduction', 'Track the handoff'],
    action: { href: '/share', label: 'BUILD A CAMPAIGN' }, accent: '#cf8bd2', motif: 'topographic',
  },
  '/operations': {
    code: 'CRS / 48', collection: 'BUSINESS OPERATIONS', title: 'Roofing Operations Center',
    purpose: 'Connect lead intake, estimating, scheduling, job control, closeout, and follow-up as one system.',
    outcomes: ['See the pipeline', 'Control each stage', 'Close the record'],
    action: { href: '/project-center', label: 'OPEN PROJECT COMMAND' }, accent: '#c85d2b', motif: 'ledger',
  },
  '/legal': {
    code: 'CRS / 50', collection: 'TRUST CONTROL', title: 'Legal & Tax Readiness',
    purpose: 'Organize contracts, claim boundaries, privacy, consent, tax checks, and official-source verification.',
    outcomes: ['Protect the customer', 'Control the record', 'Verify current rules'],
    action: { href: '#control-center', label: 'OPEN TRUST CONTROLS' }, accent: '#70a9d4', motif: 'ledger',
  },
  '/privacy': {
    code: 'CRS / 51', collection: 'CUSTOMER CONTROL', title: 'Privacy Choices',
    purpose: 'Explain what information is collected, why it is used, and how customer choices remain separate.',
    outcomes: ['Know the data', 'Choose communications', 'Request changes'],
    action: { href: '/free-inspection', label: 'RETURN TO INSPECTION' }, accent: '#8eb8d7', motif: 'ledger',
  },
  '/terms': {
    code: 'CRS / 52', collection: 'PLAIN-LANGUAGE RULES', title: 'Customer Terms',
    purpose: 'Set clear expectations for prototype tools, project requests, estimates, commerce, and site use.',
    outcomes: ['Understand the prototype', 'Know the boundaries', 'Find the next contact'],
    action: { href: '/legal', label: 'OPEN TRUST CENTER' }, accent: '#a4a9c8', motif: 'ledger',
  },
  '/accessibility': {
    code: 'CRS / 53', collection: 'ACCESS STANDARD', title: 'Accessibility',
    purpose: 'Make the site easier to navigate, understand, and use across keyboards, touch, motion, and vision needs.',
    outcomes: ['Navigate clearly', 'Control motion', 'Report a barrier'],
    action: { href: '/', label: 'RETURN HOME' }, accent: '#db7840', motif: 'signal',
  },
};

const cityLabels: Record<string, string> = {
  alpharetta: 'Alpharetta', roswell: 'Roswell', milton: 'Milton', 'johns-creek': 'Johns Creek', cumming: 'Cumming',
};

function titleCase(value: string) {
  return value.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

export function resolvePageIdentity(path: string): PageIdentity {
  if (pages[path]) return pages[path];
  if (path.startsWith('/library/')) {
    const fileName = titleCase(path.split('/').filter(Boolean).at(-1) || 'Technical File');
    return {
      code: 'CRS / 21F', collection: 'OPEN TECHNICAL FILE', title: fileName,
      purpose: 'Give one roofing subject the depth, decision points, field signals, and next action it deserves.',
      outcomes: ['Read the field brief', 'Inspect four signals', 'Use the decision steps'],
      action: { href: '/library', label: 'BACK TO LIBRARY' }, accent: '#72bfd2', motif: 'blueprint',
    };
  }
  if (path.startsWith('/service-areas/')) {
    const slug = path.split('/').filter(Boolean).at(-1) || '';
    const city = cityLabels[slug] || titleCase(slug);
    return {
      code: 'CRS / 42L', collection: 'LOCAL SERVICE FILE', title: `${city} Roofing`,
      purpose: `Give ${city} properties a focused service path shaped around local homes, roof details, and crew routing.`,
      outcomes: ['See local signals', 'Choose a service', 'Request an inspection'],
      action: { href: '/free-inspection', label: `START IN ${city.toUpperCase()}` }, accent: '#73c18a', motif: 'topographic',
    };
  }
  if (path.startsWith('/neighbors/')) {
    const slug = path.split('/').filter(Boolean).at(-1) || '';
    const city = cityLabels[slug] || titleCase(slug);
    return {
      code: 'CRS / 43L', collection: 'NEIGHBOR CITY TRAIL', title: `${city} Neighbor Roof Check`,
      purpose: `Turn a trusted ${city} introduction into one friendly request with the city already prepared.`,
      outcomes: ['Share the symptom', 'Keep the source trail', 'Reach a human'],
      action: { href: '/free-inspection', label: 'START LOCAL CHECK' }, accent: '#ee916b', motif: 'topographic',
    };
  }
  return {
    code: 'CRS / XX', collection: 'COWBOY ROOF SUPPORT', title: 'Roof Support',
    purpose: 'Give this roofing decision a focused place, a clear outcome, and one useful next action.',
    outcomes: ['Understand the page', 'Open the right file', 'Take the next step'],
    action: { href: '/directory', label: 'OPEN ALL FILES' }, accent: '#e77b3c', motif: 'cattle-grid',
  };
}
