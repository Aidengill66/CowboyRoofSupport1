export type Confidence = 'SAFETY FIRST' | 'STRONG MATCH' | 'GOOD START' | 'NEEDS FIELD CHECK';

export type RoofProfile = {
  age?: number;
  city?: string;
  issue?: string;
  material?: string;
  property?: string;
  priority?: string;
  urgency?: string;
};

export type AdvisorReply = {
  category: string;
  confidence: Confidence;
  text: string;
  steps?: string[];
  href: string;
  label: string;
  followUps: string[];
  profile: RoofProfile;
};

export type AdvisorContext = {
  label: string;
  intro: string;
  prompts: string[];
};

type Intent = {
  id: string;
  category: string;
  phrases: string[];
  terms: string[];
  href: string;
  label: string;
  confidence: Confidence;
  followUps: string[];
};

const cityNames = ['Alpharetta', 'Roswell', 'Milton', 'Johns Creek', 'Cumming'];

const phraseReplacements: Record<string, string> = {
  'how mutch': 'how much',
  howmuch: 'how much',
  'roof leakking': 'roof leaking',
  'roof leeking': 'roof leaking',
  'free qoute': 'free quote',
  'free quoute': 'free quote',
  'john creek': 'johns creek',
};

const wordReplacements: Record<string, string> = {
  ai: 'advisor',
  attick: 'attic',
  comercial: 'commercial',
  contracor: 'contractor',
  contrator: 'contractor',
  damge: 'damage',
  deductable: 'deductible',
  estimte: 'estimate',
  flashin: 'flashing',
  guters: 'gutters',
  inspecion: 'inspection',
  inspecton: 'inspection',
  insurence: 'insurance',
  leeking: 'leaking',
  materal: 'material',
  metel: 'metal',
  prce: 'price',
  qoute: 'quote',
  repace: 'replace',
  replacment: 'replacement',
  rof: 'roof',
  shinglees: 'shingles',
  shingels: 'shingles',
  skylite: 'skylight',
  ventillation: 'ventilation',
  warrenty: 'warranty',
};

const intents: Intent[] = [
  {
    id: 'collapse', category: 'STRUCTURAL / ELECTRICAL DANGER',
    phrases: ['ceiling sagging', 'ceiling bulging', 'roof collapsing', 'roof caving', 'water near electricity', 'water in light', 'downed power line'],
    terms: ['collapse', 'collapsed', 'sagging', 'bulging', 'sparks', 'electrical', 'powerline'],
    href: '/storm-damage', label: 'OPEN EMERGENCY SAFETY PATH', confidence: 'SAFETY FIRST',
    followUps: ['Water is near a light fixture', 'My ceiling is sagging', 'Start urgent inspection'],
  },
  {
    id: 'active-leak', category: 'ACTIVE LEAK TRIAGE',
    phrases: ['active leak', 'water coming in', 'roof is leaking', 'ceiling stain', 'dripping now'],
    terms: ['leak', 'leaking', 'drip', 'dripping', 'watermark', 'stain'],
    href: '/roof-repair', label: 'START LEAK REQUEST', confidence: 'SAFETY FIRST',
    followUps: ['Leak near a chimney', 'Leak after hard rain', 'Repair or replace?'],
  },
  {
    id: 'storm', category: 'STORM DAMAGE',
    phrases: ['hail damage', 'wind damage', 'missing shingles', 'tree hit roof', 'after the storm'],
    terms: ['storm', 'hail', 'wind', 'tornado', 'branch', 'tree', 'missing'],
    href: '/storm-damage', label: 'OPEN STORM PATH', confidence: 'GOOD START',
    followUps: ['What photos should I take?', 'Can you handle my claim?', 'Book storm inspection'],
  },
  {
    id: 'repair-replace', category: 'REPAIR VS. REPLACEMENT',
    phrases: ['repair or replace', 'need a new roof', 'replace my roof', 'roof too old'],
    terms: ['repair', 'replace', 'replacement', 'old', 'aging', 'worn'],
    href: '/roof-advisor', label: 'RUN REPAIR / REPLACE ADVISOR', confidence: 'NEEDS FIELD CHECK',
    followUps: ['My roof is 18 years old', 'What makes repairable damage?', 'Start inspection'],
  },
  {
    id: 'pricing', category: 'PRICE PLANNING',
    phrases: ['how much', 'price range', 'roof cost', 'cost per square', 'free estimate'],
    terms: ['price', 'pricing', 'cost', 'quote', 'estimate', 'budget', 'financing'],
    href: '/customize', label: 'BUILD A PLANNING RANGE', confidence: 'NEEDS FIELD CHECK',
    followUps: ['What changes the price?', 'Metal vs shingles cost', 'Start free inspection'],
  },
  {
    id: 'materials', category: 'ROOF SYSTEM MATCH',
    phrases: ['metal vs shingles', 'best roofing material', 'best roof', 'longest lasting roof', 'class 4'],
    terms: ['material', 'materials', 'shingle', 'shingles', 'metal', 'slate', 'tile', 'membrane', 'tpo'],
    href: '/roof-systems', label: 'COMPARE COMPLETE SYSTEMS', confidence: 'GOOD START',
    followUps: ['Best overall value', 'Longest-life option', 'Best for storm resistance'],
  },
  {
    id: 'low-slope', category: 'LOW-SLOPE ROOFING',
    phrases: ['flat roof', 'low slope', 'ponding water', 'water sits on roof'],
    terms: ['ponding', 'flat', 'membrane', 'tpo', 'epdm', 'pvc'],
    href: '/commercial-roofing', label: 'OPEN LOW-SLOPE PLANNING', confidence: 'NEEDS FIELD CHECK',
    followUps: ['Why not use shingles?', 'Water is ponding', 'Commercial roof inspection'],
  },
  {
    id: 'ventilation', category: 'ATTIC + VENTILATION',
    phrases: ['attic is hot', 'attic moisture', 'ridge vent', 'soffit vent', 'bath fan'],
    terms: ['vent', 'vents', 'ventilation', 'attic', 'humidity', 'moisture', 'mold', 'condensation'],
    href: '/performance-upgrades', label: 'OPEN AIRFLOW SYSTEMS', confidence: 'NEEDS FIELD CHECK',
    followUps: ['How is ventilation balanced?', 'Attic smells damp', 'Which upgrade matters first?'],
  },
  {
    id: 'flashing', category: 'FLASHING + PENETRATIONS',
    phrases: ['chimney leak', 'skylight leak', 'wall flashing', 'kickout flashing', 'pipe boot'],
    terms: ['flashing', 'chimney', 'skylight', 'valley', 'penetration', 'boot', 'wall'],
    href: '/roof-repair', label: 'OPEN REPAIR DETAILS', confidence: 'NEEDS FIELD CHECK',
    followUps: ['Leak only in hard rain', 'What is kickout flashing?', 'Can flashing be reused?'],
  },
  {
    id: 'gutters', category: 'DRAINAGE + GUTTERS',
    phrases: ['gutter overflowing', 'water at foundation', 'gutter guards', 'downspout problem'],
    terms: ['gutter', 'gutters', 'downspout', 'drainage', 'overflow', 'foundation'],
    href: '/performance-upgrades', label: 'OPEN DRAINAGE UPGRADES', confidence: 'GOOD START',
    followUps: ['Do I need gutter guards?', 'Water overshoots the gutter', 'Plan roof drainage'],
  },
  {
    id: 'insurance', category: 'INSURANCE + CLAIM BOUNDARIES',
    phrases: ['insurance claim', 'file a claim', 'meet the adjuster', 'insurance pay', 'waive deductible'],
    terms: ['insurance', 'claim', 'adjuster', 'deductible', 'coverage'],
    href: '/legal#control-center', label: 'SEE CLAIM BOUNDARIES', confidence: 'GOOD START',
    followUps: ['What damage gets documented?', 'Should I call insurance first?', 'What belongs in the contract?'],
  },
  {
    id: 'warranty', category: 'WARRANTIES + QUALITY',
    phrases: ['workmanship warranty', 'manufacturer warranty', 'roof warranty', 'quality checks'],
    terms: ['warranty', 'warranties', 'quality', 'certificate', 'credential'],
    href: '/quality', label: 'OPEN QUALITY STANDARD', confidence: 'GOOD START',
    followUps: ['How is work checked?', 'What records do I receive?', 'How is my yard protected?'],
  },
  {
    id: 'commercial', category: 'COMMERCIAL + LARGE PROPERTY',
    phrases: ['commercial roof', 'office building', 'high rise', 'large property', 'occupied building'],
    terms: ['commercial', 'office', 'warehouse', 'arena', 'highrise', 'skyscraper', 'multifamily'],
    href: '/commercial-roofing', label: 'OPEN COMMERCIAL PLANNING', confidence: 'GOOD START',
    followUps: ['Plan an occupied-site project', 'Low-slope system options', 'Schedule a commercial assessment'],
  },
  {
    id: 'estate-design', category: 'ESTATE + DESIGN',
    phrases: ['mansion roof', 'luxury home', 'designer shingles', 'curb appeal', 'hoa approval'],
    terms: ['mansion', 'estate', 'luxury', 'designer', 'color', 'hoa', 'architecture'],
    href: '/transformations', label: 'OPEN ESTATE ROOF DESIGN', confidence: 'GOOD START',
    followUps: ['Designer shingles vs metal', 'How do colors get approved?', 'Plan a complex roofline'],
  },
  {
    id: 'solar', category: 'SOLAR-READY ROOF',
    phrases: ['solar panels', 'solar ready', 'remove solar', 'roof under solar'],
    terms: ['solar', 'panels', 'photovoltaic'],
    href: '/performance-upgrades', label: 'PLAN A SOLAR-READY ROOF', confidence: 'NEEDS FIELD CHECK',
    followUps: ['Roof first or solar first?', 'Best roof under solar', 'How are penetrations planned?'],
  },
  {
    id: 'maintenance', category: 'MAINTENANCE',
    phrases: ['roof maintenance', 'clean my roof', 'moss on roof', 'how often inspect'],
    terms: ['maintenance', 'moss', 'algae', 'debris', 'cleaning', 'canopy'],
    href: '/guides', label: 'OPEN MAINTENANCE GUIDES', confidence: 'GOOD START',
    followUps: ['How often should I inspect?', 'Heavy tree cover', 'Is pressure washing safe?'],
  },
  {
    id: 'service-area', category: 'LOCAL SERVICE ROUTING',
    phrases: ['service area', 'do you serve', 'near me', 'north atlanta'],
    terms: ['alpharetta', 'roswell', 'milton', 'cumming', 'local', 'area'],
    href: '/service-areas', label: 'CHECK SERVICE AREAS', confidence: 'STRONG MATCH',
    followUps: ['Alpharetta roof help', 'Roswell roof repair', 'Book a local inspection'],
  },
  {
    id: 'scheduling', category: 'INSPECTION + NEXT STEP',
    phrases: ['book inspection', 'schedule inspection', 'make appointment', 'next step', 'free inspection'],
    terms: ['schedule', 'appointment', 'book', 'inspect', 'inspection', 'prepare', 'timeline'],
    href: '/free-inspection', label: 'START FREE INSPECTION', confidence: 'STRONG MATCH',
    followUps: ['What will you inspect?', 'How should I prepare?', 'I have an active leak'],
  },
  {
    id: 'tax-legal', category: 'TAX + LEGAL READINESS',
    phrases: ['tax credit', 'tax deduction', 'legal contract', 'permit required'],
    terms: ['tax', 'credit', 'deduction', 'legal', 'contract', 'permit', 'code'],
    href: '/legal', label: 'OPEN TRUST CENTER', confidence: 'NEEDS FIELD CHECK',
    followUps: ['What belongs in my contract?', 'Where are official tax sources?', 'How are permits handled?'],
  },
  {
    id: 'weather-live', category: 'LIVE INFORMATION LIMIT',
    phrases: ['weather today', 'storm coming', 'weather tomorrow', 'current weather', 'hail today'],
    terms: ['forecast', 'radar', 'today', 'tomorrow'],
    href: '/storm-damage', label: 'OPEN STORM PREP', confidence: 'NEEDS FIELD CHECK',
    followUps: ['How do I prepare for a storm?', 'What should I photograph?', 'I have damage now'],
  },
];

export const routeContexts: Record<string, AdvisorContext> = {
  '/': { label: 'HOME GUIDE', intro: 'Describe the symptom, roof age, and city. I’ll separate what is likely from what must be inspected.', prompts: ['Water is coming in now', 'Repair or replace?', 'Compare roof systems'] },
  '/roof-advisor': { label: 'SYSTEM GUIDE', intro: 'I remember details during this chat. Tell me the age, symptom, slope, or goal and I’ll build a sharper starting recommendation.', prompts: ['My roof is 18 years old', 'Metal vs shingles', 'Attic runs very hot'] },
  '/start': { label: 'PROJECT GUIDE', intro: 'Tell me what is happening and when you need help. I’ll choose the cleanest project path.', prompts: ['I need help now', 'What changes the price?', 'How should I prepare?'] },
  '/customize': { label: 'DESIGN GUIDE', intro: 'Ask about materials, roof shape, finish, performance upgrades, or planning ranges.', prompts: ['Best overall value', 'Longest-life system', 'Which upgrades matter?'] },
  '/marketplace': { label: 'SHOP GUIDE', intro: 'I can separate essential roof-system components from optional upgrades and field goods.', prompts: ['Build a roof system', 'Show performance upgrades', 'Shop hats and boots'] },
  '/legal': { label: 'TRUST GUIDE', intro: 'Ask about contract basics, claim boundaries, consent, permits, or tax-readiness. Current professional advice still controls.', prompts: ['What belongs in a contract?', 'Can you handle my claim?', 'Are roof tax credits available?'] },
  '/project-center': { label: 'PROJECT GUIDE', intro: 'I can route the job, prepare the property, and explain the path from inspection to closeout.', prompts: ['I have an active leak', 'How should I prepare?', 'What happens after inspection?'] },
  '/quality': { label: 'QUALITY GUIDE', intro: 'Ask about inspection evidence, flashing, property protection, cleanup, warranties, or credentials.', prompts: ['How is work checked?', 'What records do I receive?', 'How do you protect my yard?'] },
  '/services': { label: 'SERVICE GUIDE', intro: 'Describe the property and problem. I’ll point to the right residential, storm, or commercial service.', prompts: ['Residential replacement', 'Commercial roof', 'Storm inspection'] },
  '/guides': { label: 'ROOF EXPLAINER', intro: 'Ask a roofing question in plain language—even with typos. I’ll give the field-safe answer and next file.', prompts: ['Explain roof layers', 'What moves price?', 'Storm checklist'] },
  '/library': { label: 'LIBRARY GUIDE', intro: 'Name the roofing detail and I’ll route you to the most relevant technical file.', prompts: ['Explain roof layers', 'Standing seam metal', 'Storm documentation'] },
  '/transformations': { label: 'ESTATE GUIDE', intro: 'Ask about premium systems, complex rooflines, mansion planning, or finish tradeoffs.', prompts: ['Designer shingles', 'Standing seam metal', 'Estate roof planning'] },
  '/free-inspection': { label: 'INSPECTION GUIDE', intro: 'Tell me the symptom and timing. I’ll explain what to document, what the visit checks, and how to prepare.', prompts: ['What will you inspect?', 'I have an active leak', 'How should I prepare?'] },
};

function getRouteContext(path: string): AdvisorContext {
  if (routeContexts[path]) return routeContexts[path];
  if (path.startsWith('/service-areas/') || path.startsWith('/neighbors/')) {
    return { label: 'LOCAL ROOF GUIDE', intro: 'Tell me your city, roof age, and symptom. I’ll route the local next step.', prompts: ['Do you serve my city?', 'Leak after hard rain', 'Book local inspection'] };
  }
  return { label: 'COWBOY ROOF GUIDE', intro: 'Ask about leaks, materials, pricing factors, quality, storm documentation, or the next step.', prompts: ['Start a project', 'Book inspection', 'Compare roof systems'] };
}

function normalize(input: string) {
  let cleaned = input.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();
  for (const [wrong, right] of Object.entries(phraseReplacements)) cleaned = cleaned.replaceAll(wrong, right);
  return cleaned.split(' ').map((word) => wordReplacements[word] || word).join(' ');
}

function scoreIntent(text: string, intent: Intent) {
  let score = 0;
  for (const phrase of intent.phrases) if (text.includes(phrase)) score += 6;
  const tokens = new Set(text.split(' '));
  for (const term of intent.terms) if (tokens.has(term) || text.includes(term)) score += 2;
  return score;
}

function extractProfile(input: string, existing: RoofProfile): RoofProfile {
  const text = normalize(input);
  const next = { ...existing };
  const ageMatch = text.match(/\b(\d{1,2})\s*(?:year|years|yr|yrs)(?:\s+old)?\b/);
  if (ageMatch) next.age = Math.min(Number(ageMatch[1]), 80);
  const city = cityNames.find((name) => text.includes(name.toLowerCase()));
  if (city) next.city = city;
  if (/\b(commercial|office|warehouse|arena|highrise|multifamily)\b/.test(text)) next.property = 'commercial / large property';
  else if (/\b(mansion|estate|luxury|custom home)\b/.test(text)) next.property = 'estate / custom home';
  else if (/\b(home|house|residential)\b/.test(text)) next.property = 'home';
  if (/\bmetal|standing seam\b/.test(text)) next.material = 'standing seam metal';
  else if (/\bshingle|shingles|architectural\b/.test(text)) next.material = 'architectural shingles';
  else if (/\b(tpo|epdm|pvc|membrane|flat roof)\b/.test(text)) next.material = 'low-slope membrane';
  if (/\b(leak|leaking|drip|stain)\b/.test(text)) next.issue = 'water entry';
  else if (/\b(storm|hail|wind|missing shingles)\b/.test(text)) next.issue = 'storm concern';
  else if (/\b(moss|algae|debris)\b/.test(text)) next.issue = 'maintenance';
  if (/\b(now|urgent|emergency|active|immediately)\b/.test(text)) next.urgency = 'urgent';
  if (/\b(longest|longevity|decades)\b/.test(text)) next.priority = 'long service life';
  else if (/\b(value|budget|affordable)\b/.test(text)) next.priority = 'overall value';
  else if (/\b(design|curb appeal|luxury)\b/.test(text)) next.priority = 'design';
  else if (/\b(storm resistant|impact|class 4)\b/.test(text)) next.priority = 'storm resilience';
  return next;
}

function profileFact(profile: RoofProfile) {
  const facts: string[] = [];
  if (profile.age !== undefined) facts.push(`${profile.age}-year roof`);
  if (profile.issue) facts.push(profile.issue);
  if (profile.material) facts.push(profile.material);
  if (profile.property) facts.push(profile.property);
  if (profile.city) facts.push(profile.city);
  return facts.length ? ` I’m using: ${facts.join(' · ')}.` : '';
}

function responseFor(intent: Intent, profile: RoofProfile): Pick<AdvisorReply, 'text' | 'steps'> {
  const age = profile.age;
  switch (intent.id) {
    case 'collapse': return {
      text: 'Treat this as a building-safety problem, not a normal roof appointment. Keep everyone away from the affected area. If water is touching wiring, fixtures, or the electrical panel, do not touch the water or equipment. Call 911 for immediate danger and a qualified emergency professional.',
      steps: ['Move people and pets away from the room.', 'Do not enter a wet attic or climb onto the roof.', 'Arrange urgent structural, electrical, and roofing evaluation as the condition requires.'],
    };
    case 'active-leak': return {
      text: 'A leak location indoors rarely proves the entry point above it; water can travel along decking and framing. Protect the room first, then document the stain and request a field inspection that checks the roof surface, flashing, penetrations, attic path, and drainage.',
      steps: ['Move valuables and place a container only if it is safe.', 'Photograph the ceiling and exterior from the ground.', 'Stay off wet roofing and out of any unsafe attic area.'],
    };
    case 'storm': return {
      text: 'Storm triage starts with safety and evidence. Missing materials, lifted edges, impacted vents, soft metals, tree strikes, and interior moisture all matter. A roofer can document construction damage; the insurer decides coverage.',
      steps: ['Take wide and close photos from safe ground level.', 'Record the date, rooms affected, and temporary protection.', 'Avoid agreements that promise claim approval or a waived deductible.'],
    };
    case 'repair-replace': {
      const ageRead = age === undefined
        ? 'Roof age is still unknown, so I cannot responsibly lean toward repair or replacement yet.'
        : age < 12
          ? `At about ${age} years, a localized repair can be reasonable when the surrounding system is healthy and matching material is available.`
          : age < 20
            ? `At about ${age} years, compare the repair area with the remaining roof life, repair history, and matching-material availability.`
            : `At about ${age} years, replacement deserves a serious comparison because repeated repairs can spend money on a system near the end of its useful window.`;
      return { text: `${ageRead} Field condition controls: deck integrity, leak count, flashing, brittleness, granule loss, ventilation, and how isolated the failure is.`, steps: ['Inspect the failure and the surrounding roof.', 'Price a warranted repair and a full system separately.', 'Compare remaining life—not only today’s invoice.'] };
    }
    case 'pricing': return { text: `A trustworthy price needs measured roof area—not just house square footage—plus pitch, geometry, stories, access, tear-off layers, decking allowance, flashing, ventilation, material, permits, and disposal.${profile.material ? ` You mentioned ${profile.material}; that narrows the system, but not the final number.` : ''}`, steps: ['Build an online planning range.', 'Verify measurements and hidden conditions on site.', 'Require a written scope with allowances and change-order rules.'] };
    case 'materials': return { text: `${profile.priority === 'long service life' ? 'For a long-ownership goal, standing seam metal is the first system to compare.' : profile.priority === 'design' ? 'For design, compare premium laminated shingles and standing seam metal against the home’s architecture.' : 'For many North Atlanta homes, architectural shingles are the value baseline; standing seam metal is the long-life comparison.'} The correct answer still depends on slope, geometry, deck, flashing compatibility, ventilation, maintenance, and budget.`, steps: ['Choose the complete assembly, not a sample board.', 'Match every roof area to its slope.', 'Compare installer details and warranty requirements.'] };
    case 'low-slope': return { text: 'Low-slope areas need a continuous membrane and deliberate drainage plan. Conventional shingles rely on faster water shedding and are not the automatic answer. TPO, PVC, EPDM, or another approved assembly must be selected around slope, substrate, penetrations, heat, traffic, and tie-ins.', steps: ['Measure actual slope and identify ponding.', 'Inspect drains, scuppers, edges, and penetrations.', 'Design the transition to adjacent steep-slope roofing.'] };
    case 'ventilation': return { text: 'Ventilation is an intake-and-exhaust system, not a ridge-vent purchase. Hot or damp attics can also involve air leakage, insulation, blocked soffits, disconnected bath fans, or moisture sources. Field measurements should establish the net-free vent area and airflow path.', steps: ['Confirm bath and kitchen exhaust terminates outdoors.', 'Measure unobstructed intake and exhaust.', 'Correct moisture sources before adding more exhaust.'] };
    case 'flashing': return { text: 'Leaks around chimneys, walls, valleys, skylights, and pipe penetrations often come from transition details rather than the field shingles. The inspection should distinguish failed sealant from failed or missing step, counter, apron, valley, kickout, or boot flashing.', steps: ['Track when the leak occurs and photograph the interior.', 'Inspect the complete transition, not only the visible caulk.', 'Replace incompatible or fatigued flashing where required.'] };
    case 'gutters': return { text: 'Drainage performance depends on roof area, valley concentration, gutter size and pitch, outlet count, downspout routing, debris, and the ground system. Overflow can come from blockage, undersized outlets, poor pitch, or water overshooting at a fast valley.', steps: ['Observe where overflow begins during safe conditions.', 'Check outlets and downspout discharge.', 'Keep roof water moving away from the foundation.'] };
    case 'insurance': return { text: 'A roofing contractor can inspect, photograph, measure, and price construction work. The carrier and appropriately licensed claim professionals decide policy coverage. Be cautious with guaranteed approvals, deductible waivers, or pressure to sign before you understand scope and price.', steps: ['Document damage before temporary work when safe.', 'Read authorization and contingency language.', 'Keep scope, price, deductible, and changes in writing.'] };
    case 'warranty': return { text: 'A strong warranty conversation separates manufacturer material coverage from contractor workmanship coverage. Ask what is covered, excluded, transferable, required for registration, and affected by ventilation or maintenance. Quality photos and closeout records make both more useful.', steps: ['Verify the exact product and installer status.', 'Get workmanship terms in writing.', 'Save registration, invoices, photos, and maintenance records.'] };
    case 'commercial': return { text: 'Large-property roofing begins with use of the building: access, fall protection, occupants, staging, deliveries, noise, dust, drainage, rooftop equipment, shutdowns, and weather windows. System selection follows the field survey and moisture strategy.', steps: ['Map roof zones, drains, equipment, and access.', 'Plan occupied-space and business-continuity protection.', 'Set documentation, safety, and closeout requirements before mobilization.'] };
    case 'estate-design': return { text: 'Complex and luxury roofs should be designed elevation by elevation. Material scale, shadow line, metal accents, valleys, cricket geometry, wall transitions, gutters, and accessory colors must read as one architectural system.', steps: ['Create a roof plan and photo-marked elevations.', 'Review full-size samples in exterior light.', 'Resolve low-slope tie-ins and drainage before choosing color.'] };
    case 'solar': return { text: 'If the roof has limited remaining life, coordinate roofing before solar so panels are not removed twice. The roof plan should locate attachment zones, preserve drainage, protect underlayment, maintain access, and document every penetration and flashing method.', steps: ['Compare roof life with the solar ownership horizon.', 'Coordinate roofer and solar responsibilities in writing.', 'Keep attachment and waterproofing records.'] };
    case 'maintenance': return { text: 'Safe maintenance is mostly observation, drainage, debris control, and early repair—not aggressive washing. High-pressure washing can damage shingles and may affect warranties. Heavy tree cover increases valley, gutter, branch, algae, and moisture checks.', steps: ['Inspect from the ground and use qualified professionals for roof access.', 'Keep gutters, valleys, and downspouts clear.', 'Document changes after major storms and at regular intervals.'] };
    case 'service-area': return { text: `${profile.city ? `${profile.city} is included in the site’s North Atlanta planning area.` : 'The site currently highlights Alpharetta, Roswell, Milton, Johns Creek, and Cumming.'} Final availability should be confirmed when the request is submitted.`, steps: ['Open the local city page.', 'Describe the roof and timing.', 'Submit the inspection request for route confirmation.'] };
    case 'scheduling': return { text: 'The cleanest start is a short inspection request with property address, roof symptom, timing, safe photos, and access notes. The visit should check surface materials, flashing, penetrations, drainage, attic signals when accessible, and ventilation—not only the obvious spot.', steps: ['Choose the service and urgency.', 'Add safe photos and preferred timing.', 'Review the crew-ready brief before sending.'] };
    case 'tax-legal': return { text: 'I can organize roofing questions, but I cannot verify current law, code, permit rules, incentives, or tax eligibility without live official sources and the facts of the project. Use the trust center as a checklist, then confirm with the applicable authority, attorney, or tax professional.', steps: ['Identify jurisdiction, taxpayer, project type, and tax year.', 'Check current official sources.', 'Keep contracts, invoices, product records, and approvals.'] };
    case 'weather-live': return { text: 'This no-API advisor cannot see live radar, forecasts, storm reports, appointment availability, or your property. Use a current official weather source for timing. I can still help you prepare the property and document damage safely.', steps: ['Check current official weather alerts.', 'Move loose exterior items if it is safe.', 'Do not climb onto the roof before or after the storm.'] };
    default: return { text: 'I can help organize the roofing decision, but the property still needs a field inspection before diagnosis, price, or scope is final.' };
  }
}

export function getAdvisorContext(path: string) {
  return getRouteContext(path);
}

export function answerRoofQuestion(input: string, existingProfile: RoofProfile = {}): AdvisorReply {
  const normalized = normalize(input);
  const profile = extractProfile(input, existingProfile);
  const ranked = intents.map((intent) => ({ intent, score: scoreIntent(normalized, intent) })).filter((item) => item.score > 0).sort((a, b) => b.score - a.score);
  const urgentDanger = intents.find((intent) => intent.id === 'collapse')!;
  const hasDangerPhrase = urgentDanger.phrases.some((phrase) => normalized.includes(phrase)) || /\b(collapse|collapsed|sagging|bulging|sparks|electrical|powerline)\b/.test(normalized);
  const selected = hasDangerPhrase ? urgentDanger : ranked[0]?.intent;

  if (!selected) return {
    category: 'CLARIFY THE ROOF QUESTION', confidence: 'GOOD START',
    text: `I’m a purpose-built, no-API roofing advisor—not a general internet chatbot. I can reason from curated roofing rules, remember details during this chat, and route leaks, storm concerns, repair-versus-replace decisions, materials, pricing factors, ventilation, flashing, gutters, warranties, commercial work, and inspections.${profileFact(profile)}`,
    steps: ['Tell me the symptom.', 'Add the approximate roof age.', 'Add the city and whether this is a home or commercial property.'],
    href: '/roof-advisor', label: 'OPEN FULL ROOF ADVISOR',
    followUps: ['Water is coming in now', 'My roof is 18 years old', 'Compare metal and shingles'], profile,
  };

  const response = responseFor(selected, profile);
  return {
    category: selected.category, confidence: selected.confidence,
    text: `${response.text}${profileFact(profile)}`, steps: response.steps,
    href: selected.href, label: selected.label, followUps: selected.followUps, profile,
  };
}

export function summarizeProfile(profile: RoofProfile) {
  const values = [profile.city, profile.property, profile.age !== undefined ? `${profile.age} years` : undefined, profile.issue, profile.material, profile.priority].filter(Boolean);
  return values.length ? values.join(' · ') : 'NO ROOF DETAILS SAVED YET';
}
