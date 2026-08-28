export type DirectoryNode = {
  id: string;
  label: string;
  href: string;
  description: string;
  eyebrow?: string;
  children?: DirectoryNode[];
};

export type NavigationGroup = DirectoryNode & {
  kicker: string;
  featureLabel: string;
};

export const navigationGroups: NavigationGroup[] = [
  {
    id: 'roofing',
    label: 'Roofing',
    href: '/roofing',
    description: 'The complete roofing hub: diagnose the need, compare systems, plan the property, and move the project forward.',
    eyebrow: 'PLAN · PROTECT · BUILD',
    kicker: 'ROOFING DIRECTORY',
    featureLabel: 'OPEN ROOFING HUB',
    children: [
      {
        id: 'roofing-needs',
        label: 'Start by roof need',
        href: '/services',
        description: 'Choose the problem first, then open the exact service and planning files.',
        eyebrow: 'CABINET 01',
        children: [
          {
            id: 'roofing-replacement',
            label: 'Roof replacement',
            href: '/roof-replacement',
            description: 'System selection, scope, price drivers, installation, and closeout.',
            children: [
              { id: 'replacement-inspection', label: 'Start with an inspection', href: '/free-inspection?service=replacement', description: 'Prepare the property and request a field assessment.' },
              { id: 'replacement-customize', label: 'Customize the roof', href: '/customize', description: 'Explore shape, material, color, upgrades, and planning ranges.' },
              { id: 'replacement-systems', label: 'Compare roof systems', href: '/roof-systems', description: 'Open the material system cabinet.' },
            ],
          },
          {
            id: 'roofing-repair',
            label: 'Leak or roof repair',
            href: '/roof-repair',
            description: 'Trace the symptom, assess repairability, and choose the next field step.',
            children: [
              { id: 'repair-emergency', label: 'Emergency leak plan', href: '/library/emergency-leak-plan', description: 'People first, evidence second, roof last.' },
              { id: 'repair-inspection', label: 'Inspection checklist', href: '/library/inspection-checklist', description: 'See what useful roof evidence looks like.' },
              { id: 'repair-request', label: 'Request repair triage', href: '/free-inspection?service=repair', description: 'Prepare a concise request for the team.' },
            ],
          },
          {
            id: 'roofing-storm',
            label: 'Storm concern',
            href: '/storm-damage',
            description: 'Priority triage, condition records, temporary-work logic, and claim-safe guidance.',
            children: [
              { id: 'storm-leak', label: 'Active leak safety', href: '/library/emergency-leak-plan', description: 'Use the safe first-response file.' },
              { id: 'storm-field', label: 'Hail + wind field guide', href: '/library/hail-wind-field-guide', description: 'Separate observed condition from coverage decisions.' },
              { id: 'storm-documentation', label: 'Claim documentation', href: '/library/claim-documentation', description: 'Build a clean construction record without claim promises.' },
            ],
          },
          {
            id: 'roofing-not-sure',
            label: 'Not sure what you need',
            href: '/roof-advisor',
            description: 'Answer six roof questions and get a useful starting route.',
            children: [
              { id: 'advisor-run', label: 'Run Smart Roof Advisor', href: '/roof-advisor', description: 'Combine age, symptoms, pitch, attic, trees, and priorities.' },
              { id: 'advisor-library', label: 'Browse technical files', href: '/library', description: 'Open all cabinets, folders, and roofing files.' },
              { id: 'advisor-human', label: 'Ask for a human inspection', href: '/free-inspection', description: 'Prepare the facts for a real field visit.' },
            ],
          },
        ],
      },
      {
        id: 'roofing-systems',
        label: 'Plan the roof system',
        href: '/roof-systems',
        description: 'Move from material family into performance details and technical files.',
        eyebrow: 'CABINET 02',
        children: [
          {
            id: 'system-architectural',
            label: 'Architectural shingles',
            href: '/library/architectural-shingles',
            description: 'The practical North Atlanta all-rounder.',
            children: [
              { id: 'architectural-compare', label: 'Compare all systems', href: '/roof-systems', description: 'See architectural, designer, metal, and low-slope paths.' },
              { id: 'architectural-color', label: 'Model color + upgrades', href: '/customize', description: 'Use the interactive roof configurator.' },
              { id: 'architectural-brief', label: 'Build a project brief', href: '/project-center', description: 'Route the decision toward inspection and scope.' },
            ],
          },
          {
            id: 'system-designer',
            label: 'Designer shingles',
            href: '/library/designer-shingles',
            description: 'Luxury depth while preserving system logic.',
            children: [
              { id: 'designer-transform', label: 'View estate concepts', href: '/transformations', description: 'Compare mansion and luxury-home roof transformations.' },
              { id: 'designer-estate', label: 'Estate planning file', href: '/library/estate-roof-planning', description: 'Control geometry, finish, protection, and logistics.' },
              { id: 'designer-customize', label: 'Customize profile + color', href: '/customize', description: 'Build a visual planning direction.' },
            ],
          },
          {
            id: 'system-metal',
            label: 'Standing seam metal',
            href: '/library/standing-seam-metal',
            description: 'Precision panels, movement, penetrations, fabrication, and finish.',
            children: [
              { id: 'metal-compare', label: 'Compare system families', href: '/roof-systems', description: 'Understand when metal belongs in the option set.' },
              { id: 'metal-transform', label: 'View metal transformations', href: '/transformations', description: 'See premium residential concepts.' },
              { id: 'metal-inspection', label: 'Request system inspection', href: '/free-inspection?service=replacement', description: 'Start with actual geometry and conditions.' },
            ],
          },
          {
            id: 'system-water-air',
            label: 'Water + ventilation',
            href: '/performance-upgrades',
            description: 'Coordinate barriers, flashing, drainage, intake, and exhaust.',
            children: [
              { id: 'water-file', label: 'Water-control file', href: '/library/water-control-upgrades', description: 'Spend detail money where water concentrates.' },
              { id: 'air-file', label: 'Ventilation balance file', href: '/library/ventilation-balance', description: 'Treat airflow as a system, not a product.' },
              { id: 'upgrade-market', label: 'Performance marketplace', href: '/performance-upgrades', description: 'Explore water, ventilation, gutter, and storm-readiness upgrades.' },
            ],
          },
        ],
      },
      {
        id: 'roofing-property',
        label: 'Choose the property scale',
        href: '/roofing#property-scale',
        description: 'Route a normal home, estate, commercial building, or unusual roof correctly.',
        eyebrow: 'CABINET 03',
        children: [
          {
            id: 'property-home',
            label: 'Home roofing',
            href: '/services',
            description: 'Repair, replacement, storm response, ventilation, gutters, and planning.',
            children: [
              { id: 'home-services', label: 'Every home service', href: '/services', description: 'See the complete residential capability map.' },
              { id: 'home-local', label: 'Find your city page', href: '/service-areas', description: 'Open the North Atlanta service-area directory.' },
              { id: 'home-start', label: 'Start the project', href: '/start', description: 'Choose the need and create the next action.' },
            ],
          },
          {
            id: 'property-estate',
            label: 'Estate + complex home',
            href: '/transformations',
            description: 'Large geometry, specialty finishes, landscaping, access, and controlled execution.',
            children: [
              { id: 'estate-gallery', label: 'Transformation gallery', href: '/transformations', description: 'Explore luxury-home roof concepts.' },
              { id: 'estate-file', label: 'Estate planning file', href: '/library/estate-roof-planning', description: 'Open the complex-property execution guide.' },
              { id: 'estate-quality', label: 'Quality controls', href: '/quality', description: 'Review protection, documentation, and closeout standards.' },
            ],
          },
          {
            id: 'property-commercial',
            label: 'Commercial roofing',
            href: '/commercial-roofing',
            description: 'Facility-first planning for low-slope, steep-slope, and operating properties.',
            children: [
              { id: 'commercial-service', label: 'Commercial service page', href: '/commercial-roofing', description: 'Open facility-first repair and replacement planning.' },
              { id: 'commercial-file', label: 'Commercial logistics file', href: '/library/commercial-logistics', description: 'Protect the operation while protecting the building.' },
              { id: 'commercial-ops', label: 'Operations center', href: '/operations', description: 'Build material, scope, crew-day, and closeout plans.' },
            ],
          },
        ],
      },
      {
        id: 'roofing-project',
        label: 'Move the project forward',
        href: '/project-center',
        description: 'Turn an early question into inspection, scope, crew planning, and closeout.',
        eyebrow: 'CABINET 04',
        children: [
          { id: 'project-start', label: 'Project starter', href: '/start', description: 'Route the need and urgency.', children: [
            { id: 'project-start-now', label: 'Start now', href: '/start', description: 'Open the guided starting route.' },
            { id: 'project-free-check', label: 'Free inspection', href: '/free-inspection', description: 'Prepare a crew-ready request.' },
          ] },
          { id: 'project-command', label: 'Roof Command Center', href: '/project-center', description: 'Plan the inspection and understand the project path.', children: [
            { id: 'project-advisor', label: 'Smart Roof Advisor', href: '/roof-advisor', description: 'Get a structured initial recommendation.' },
            { id: 'project-guides', label: 'Blueprints + guides', href: '/guides', description: 'Understand the roof before buying.' },
          ] },
          { id: 'project-field', label: 'Roof Operations Center', href: '/operations', description: 'Plan intake, materials, scope, crew day, and closeout.', children: [
            { id: 'project-quality', label: 'Quality standard', href: '/quality', description: 'See the field checkpoints behind the work.' },
            { id: 'project-legal', label: 'Trust + legal readiness', href: '/legal', description: 'Open the operating-control center.' },
          ] },
        ],
      },
    ],
  },
  {
    id: 'shop',
    label: 'Shop',
    href: '/shop',
    description: 'Browse the marketplace by roof system, performance upgrade, field goods, or rewards path.',
    eyebrow: 'SYSTEMS · UPGRADES · FIELD GOODS',
    kicker: 'MARKETPLACE DIRECTORY',
    featureLabel: 'OPEN SHOP HUB',
    children: [
      {
        id: 'shop-roof-systems',
        label: 'Roof systems',
        href: '/roof-systems',
        description: 'Compare the assemblies that become the actual roof.',
        eyebrow: 'DEPARTMENT 01',
        children: [
          { id: 'shop-architectural', label: 'Architectural shingle', href: '/library/architectural-shingles', description: 'Practical dimensional system.', children: [
            { id: 'shop-architectural-build', label: 'Build this direction', href: '/customize', description: 'Choose color and performance options.' },
            { id: 'shop-architectural-start', label: 'Request a field review', href: '/free-inspection?service=replacement', description: 'Confirm actual property conditions.' },
          ] },
          { id: 'shop-designer', label: 'Designer shingle', href: '/library/designer-shingles', description: 'Premium profile and architectural depth.', children: [
            { id: 'shop-designer-gallery', label: 'See luxury concepts', href: '/transformations', description: 'Open the estate gallery.' },
            { id: 'shop-designer-build', label: 'Customize the concept', href: '/customize', description: 'Model shape, color, and upgrades.' },
          ] },
          { id: 'shop-metal', label: 'Standing seam metal', href: '/library/standing-seam-metal', description: 'Custom-fabricated precision roof system.', children: [
            { id: 'shop-metal-compare', label: 'Compare systems', href: '/roof-systems', description: 'Place metal in the full option set.' },
            { id: 'shop-metal-plan', label: 'Plan an inspection', href: '/free-inspection?service=replacement', description: 'Verify geometry, substrate, and details.' },
          ] },
        ],
      },
      {
        id: 'shop-performance',
        label: 'Performance upgrades',
        href: '/performance-upgrades',
        description: 'Water control, airflow, drainage, and storm-readiness options.',
        eyebrow: 'DEPARTMENT 02',
        children: [
          { id: 'shop-water', label: 'Water-control package', href: '/library/water-control-upgrades', description: 'Target valleys, walls, eaves, and openings.' },
          { id: 'shop-air', label: 'Ventilation planning', href: '/library/ventilation-balance', description: 'Balance intake, exhaust, pathways, and boundaries.' },
          { id: 'shop-upgrades-all', label: 'All performance upgrades', href: '/performance-upgrades', description: 'Browse the full performance department.' },
        ],
      },
      {
        id: 'shop-field-goods',
        label: 'Cowboy field goods',
        href: '/field-goods',
        description: 'Hats, boots, tees, buckles, and limited supporter drops.',
        eyebrow: 'DEPARTMENT 03',
        children: [
          { id: 'shop-hats', label: 'Hats + headwear', href: '/field-goods#hats', description: 'Open the trail-boss shelf.' },
          { id: 'shop-boots', label: 'Boots + workwear', href: '/field-goods#boots', description: 'Browse the field-ready shelf.' },
          { id: 'shop-drops', label: 'Limited drops', href: '/marketplace', description: 'Open the current marketplace collection.' },
        ],
      },
      {
        id: 'shop-rewards',
        label: 'Rewards + game',
        href: '/rewards',
        description: 'Explore points, levels, useful perks, and the Leak Wrangler game.',
        eyebrow: 'DEPARTMENT 04',
        children: [
          { id: 'shop-reward-levels', label: 'Reward levels', href: '/rewards', description: 'See the prototype level path and perks.' },
          { id: 'shop-game', label: 'Leak Wrangler game', href: '/rewards#game', description: 'Open the interactive roof game.' },
          { id: 'shop-market-list', label: 'Build a project list', href: '/marketplace', description: 'Select products into a local marketplace list.' },
        ],
      },
    ],
  },
  {
    id: 'company',
    label: 'Company',
    href: '/company',
    description: 'Meet the standard, explore the family network, and open the systems that run growth and field delivery.',
    eyebrow: 'PEOPLE · CAPABILITY · FAMILY',
    kicker: 'COMPANY DIRECTORY',
    featureLabel: 'OPEN COMPANY HUB',
    children: [
      {
        id: 'company-customer',
        label: 'Customer experience',
        href: '/quality',
        description: 'Friendly people, serious roofs, visible protection, and useful documentation.',
        eyebrow: 'DIVISION 01',
        children: [
          { id: 'company-quality', label: 'Quality + protection', href: '/quality', description: 'Open the Cowboy field standard.', children: [
            { id: 'company-quality-checks', label: 'Inspection + checkpoints', href: '/library/inspection-checklist', description: 'See how evidence is organized.' },
            { id: 'company-quality-project', label: 'Customer project path', href: '/project-center', description: 'Follow the route from concern to closeout.' },
          ] },
          { id: 'company-start', label: 'Start a project', href: '/start', description: 'Choose the need and get one clear next step.' },
          { id: 'company-area', label: 'North Atlanta service areas', href: '/service-areas', description: 'Find the correct local page.' },
        ],
      },
      {
        id: 'company-growth',
        label: 'Organic growth systems',
        href: '/growth',
        description: 'Turn trusted introductions into an organized, permission-based local funnel.',
        eyebrow: 'DIVISION 02',
        children: [
          { id: 'company-growth-command', label: 'Growth Command Center', href: '/growth', description: 'Model, plan, prioritize, and prepare content.', children: [
            { id: 'company-growth-share', label: 'Family Share Desk', href: '/share', description: 'Prepare useful Facebook and referral posts.' },
            { id: 'company-growth-neighbors', label: 'Neighbor funnel', href: '/neighbors', description: 'Open the focused homeowner handoff.' },
          ] },
          { id: 'company-leads', label: 'Local Lead Desk', href: '/leads', description: 'Organize permission-based inquiries on this device.' },
          { id: 'company-network', label: 'Referral Partner Network', href: '/network', description: 'Build distinct trails for legitimate relationships.' },
        ],
      },
      {
        id: 'company-operations',
        label: 'Roofing operations',
        href: '/operations',
        description: 'Move from job facts into material, scope, crew-day, and closeout controls.',
        eyebrow: 'DIVISION 03',
        children: [
          { id: 'company-ops-center', label: 'Roof Operations Center', href: '/operations', description: 'Open the device-local field planning surface.', children: [
            { id: 'company-ops-guides', label: 'Blueprints + guides', href: '/guides', description: 'Understand assembly logic before buying.' },
            { id: 'company-ops-commercial', label: 'Commercial operations', href: '/commercial-roofing', description: 'Open the facility-first service route.' },
          ] },
          { id: 'company-ops-quality', label: 'Quality controls', href: '/quality', description: 'Review property protection and documentation.' },
          { id: 'company-ops-library', label: 'Technical library', href: '/library', description: 'Open every technical cabinet and file.' },
        ],
      },
      {
        id: 'company-trust',
        label: 'Company + trust',
        href: '/company',
        description: 'Family ventures, operating boundaries, legal readiness, and accessible service.',
        eyebrow: 'DIVISION 04',
        children: [
          { id: 'company-family', label: 'Family companies', href: '/family', description: 'Cowboy Roof Support, Airoze, and commercial property care.' },
          { id: 'company-legal', label: 'Legal + tax readiness', href: '/legal', description: 'Open the business-protection layer.', children: [
            { id: 'company-privacy', label: 'Privacy file', href: '/privacy', description: 'See how prototype data is handled.' },
            { id: 'company-terms', label: 'Terms file', href: '/terms', description: 'Review the prototype use boundaries.' },
            { id: 'company-accessibility', label: 'Accessibility file', href: '/accessibility', description: 'Open the inclusive-use commitment.' },
          ] },
          { id: 'company-service-map', label: 'Service-area map', href: '/service-areas', description: 'Browse Alpharetta, Roswell, Milton, Johns Creek, Cumming, and nearby.' },
        ],
      },
    ],
  },
];

export const directoryRoots: DirectoryNode[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    description: 'Return to the Cowboy Roof Support front door.',
    eyebrow: 'START HERE',
    children: navigationGroups,
  },
  ...navigationGroups,
  {
    id: 'inspection',
    label: 'Free inspection',
    href: '/free-inspection',
    description: 'Prepare a concise roof request and choose the next human step.',
    eyebrow: 'FAST ACTION',
    children: [
      { id: 'inspection-repair', label: 'Leak or repair', href: '/free-inspection?service=repair', description: 'Open the repair-focused request.' },
      { id: 'inspection-storm', label: 'Storm concern', href: '/free-inspection?service=storm', description: 'Open the storm-focused request.' },
      { id: 'inspection-replacement', label: 'Replacement planning', href: '/free-inspection?service=replacement', description: 'Open the replacement-focused request.' },
    ],
  },
];

export function getNavigationGroup(id: string) {
  return navigationGroups.find((group) => group.id === id);
}

export function flattenDirectory(
  nodes: DirectoryNode[],
  parents: DirectoryNode[] = [],
): Array<{ node: DirectoryNode; parents: DirectoryNode[] }> {
  return nodes.flatMap((node) => [
    { node, parents },
    ...flattenDirectory(node.children || [], [...parents, node]),
  ]);
}
