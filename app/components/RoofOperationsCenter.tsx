'use client';

import Link from 'next/link';
import { type Dispatch, type SetStateAction, useEffect, useMemo, useState } from 'react';

type OperationsView = 'intake' | 'materials' | 'scope' | 'crew' | 'closeout';

type ProjectContext = {
  projectName: string;
  customerName: string;
  propertyAddress: string;
  city: string;
  projectType: string;
  roofSystem: string;
  roofArea: number;
  wastePercent: number;
  eaveFeet: number;
  rakeFeet: number;
  ridgeFeet: number;
  valleyFeet: number;
  stories: string;
  pitch: string;
  access: string;
  notes: string;
};

type ScopeItem = {
  id: string;
  category: string;
  title: string;
  detail: string;
  selected: boolean;
};

type ChecklistItem = {
  id: string;
  phase: string;
  label: string;
  detail: string;
  done: boolean;
};

type OperationsState = {
  project: ProjectContext;
  scope: ScopeItem[];
  crew: ChecklistItem[];
  closeout: ChecklistItem[];
};

const storageKey = 'cowboy_roof_operations';

const initialProject: ProjectContext = {
  projectName: '',
  customerName: '',
  propertyAddress: '',
  city: 'Alpharetta',
  projectType: 'Residential replacement',
  roofSystem: 'Architectural asphalt shingles',
  roofArea: 3200,
  wastePercent: 12,
  eaveFeet: 190,
  rakeFeet: 140,
  ridgeFeet: 95,
  valleyFeet: 55,
  stories: '2 stories',
  pitch: '6:12 to 8:12',
  access: 'Standard driveway access',
  notes: '',
};

const initialScope: ScopeItem[] = [
  {
    id: 'permit',
    category: 'PRECONSTRUCTION',
    title: 'Permit and requirements check',
    detail: 'Confirm the authority having jurisdiction, neighborhood requirements, and any permit or posting obligations.',
    selected: true,
  },
  {
    id: 'protect',
    category: 'PRECONSTRUCTION',
    title: 'Property protection plan',
    detail: 'Identify driveway, landscaping, siding, windows, HVAC, pools, pets, and neighbor-side protection needs.',
    selected: true,
  },
  {
    id: 'delivery',
    category: 'PRECONSTRUCTION',
    title: 'Delivery and access plan',
    detail: 'Confirm placement, loading limits, street access, staging area, and weather-sensitive material protection.',
    selected: true,
  },
  {
    id: 'tearoff',
    category: 'REMOVAL',
    title: 'Remove existing roof covering',
    detail: 'Remove selected roof covering to expose the deck, subject to the final signed scope and local requirements.',
    selected: true,
  },
  {
    id: 'deck',
    category: 'REMOVAL',
    title: 'Inspect roof deck',
    detail: 'Inspect visible deck conditions after removal and document areas that may require authorized replacement.',
    selected: true,
  },
  {
    id: 'deck-allowance',
    category: 'REMOVAL',
    title: 'Deck replacement allowance',
    detail: 'Define unit pricing or an allowance before work begins; obtain authorization for concealed-condition work.',
    selected: false,
  },
  {
    id: 'ice-water',
    category: 'WATER MANAGEMENT',
    title: 'Self-adhered water barrier',
    detail: 'Install at selected valleys, penetrations, transitions, and other specified vulnerable areas.',
    selected: true,
  },
  {
    id: 'underlayment',
    category: 'WATER MANAGEMENT',
    title: 'Synthetic underlayment',
    detail: 'Install approved underlayment over prepared decking in accordance with the selected roof system.',
    selected: true,
  },
  {
    id: 'drip-edge',
    category: 'WATER MANAGEMENT',
    title: 'Drip edge',
    detail: 'Install compatible metal drip edge at specified eaves and rakes using the approved sequence.',
    selected: true,
  },
  {
    id: 'valley',
    category: 'WATER MANAGEMENT',
    title: 'Valley assembly',
    detail: 'Build the selected valley detail and keep the water path clear of fasteners and debris.',
    selected: true,
  },
  {
    id: 'wall-flashing',
    category: 'FLASHING',
    title: 'Wall and step flashing review',
    detail: 'Evaluate existing flashing for reuse only when appropriate; specify replacement where the assembly requires it.',
    selected: true,
  },
  {
    id: 'chimney',
    category: 'FLASHING',
    title: 'Chimney flashing',
    detail: 'Inspect and address apron, step, counterflashing, cricket, and sealant interfaces as scoped.',
    selected: false,
  },
  {
    id: 'penetrations',
    category: 'FLASHING',
    title: 'Pipe boots and penetrations',
    detail: 'Replace or properly integrate selected pipe boots, vents, curbs, and other roof penetrations.',
    selected: true,
  },
  {
    id: 'starter',
    category: 'ROOF SYSTEM',
    title: 'Manufacturer-compatible starter',
    detail: 'Install starter product at specified perimeter locations as part of the complete roof system.',
    selected: true,
  },
  {
    id: 'field',
    category: 'ROOF SYSTEM',
    title: 'Field roof covering',
    detail: 'Install the selected roof covering to the approved layout, fastening, offset, and exposure requirements.',
    selected: true,
  },
  {
    id: 'ridge',
    category: 'ROOF SYSTEM',
    title: 'Hip and ridge cap',
    detail: 'Install compatible hip and ridge material with required exposure, fastening, and terminal details.',
    selected: true,
  },
  {
    id: 'ventilation',
    category: 'PERFORMANCE',
    title: 'Ventilation assessment',
    detail: 'Review intake and exhaust balance, blocked pathways, building conditions, and compatibility before modifying ventilation.',
    selected: true,
  },
  {
    id: 'gutters',
    category: 'PERFORMANCE',
    title: 'Gutter and drainage coordination',
    detail: 'Protect or replace selected gutters and confirm roof runoff has an intended discharge path.',
    selected: false,
  },
  {
    id: 'cleanup',
    category: 'CLOSEOUT',
    title: 'Daily and final cleanup',
    detail: 'Collect debris, perform ground sweeps, use magnetic collection where appropriate, and remove project waste.',
    selected: true,
  },
  {
    id: 'photos',
    category: 'CLOSEOUT',
    title: 'Condition and completion photos',
    detail: 'Capture useful, permission-aware photos of relevant conditions, corrections, details, and final appearance.',
    selected: true,
  },
  {
    id: 'walkthrough',
    category: 'CLOSEOUT',
    title: 'Customer walkthrough',
    detail: 'Review completed work, property condition, care guidance, documents, and any open items with the customer.',
    selected: true,
  },
  {
    id: 'warranty',
    category: 'CLOSEOUT',
    title: 'Warranty handoff',
    detail: 'Provide applicable workmanship and manufacturer information without promising coverage beyond written terms.',
    selected: true,
  },
];

const initialCrew: ChecklistItem[] = [
  {
    id: 'crew-weather',
    phase: 'GO / NO-GO',
    label: 'Review weather and safe work conditions',
    detail: 'Confirm the forecast, surface conditions, wind, heat, lightning, daylight, and stop-work triggers.',
    done: false,
  },
  {
    id: 'crew-address',
    phase: 'GO / NO-GO',
    label: 'Verify project and scope',
    detail: 'Match the address, system, color, delivery, approved scope, and current work order before mobilizing.',
    done: false,
  },
  {
    id: 'crew-briefing',
    phase: 'GO / NO-GO',
    label: 'Run crew safety briefing',
    detail: 'Review fall protection, ladder setup, access, overhead hazards, housekeeping, emergency response, and assignments.',
    done: false,
  },
  {
    id: 'crew-customer',
    phase: 'ARRIVAL',
    label: 'Confirm arrival with customer',
    detail: 'Identify the working lead, explain the day plan, and verify vehicles, pets, gates, power, and special concerns.',
    done: false,
  },
  {
    id: 'crew-protection',
    phase: 'ARRIVAL',
    label: 'Install property protection',
    detail: 'Protect the agreed landscaping, walls, windows, condenser units, hardscape, and material staging areas.',
    done: false,
  },
  {
    id: 'crew-delivery',
    phase: 'ARRIVAL',
    label: 'Verify materials and lot information',
    detail: 'Check product, color, quantities, accessories, damage, storage, and identifying information before installation.',
    done: false,
  },
  {
    id: 'crew-start-photos',
    phase: 'ARRIVAL',
    label: 'Capture start conditions',
    detail: 'Document relevant pre-existing property and roof conditions without photographing unnecessary private areas.',
    done: false,
  },
  {
    id: 'crew-controlled-tearoff',
    phase: 'OPEN ROOF',
    label: 'Control removal zones',
    detail: 'Limit open-roof exposure to what the crew can safely inspect, dry-in, and protect within conditions.',
    done: false,
  },
  {
    id: 'crew-deck',
    phase: 'OPEN ROOF',
    label: 'Inspect and document decking',
    detail: 'Photograph relevant concealed conditions and obtain required authorization before out-of-scope replacement.',
    done: false,
  },
  {
    id: 'crew-dryin',
    phase: 'OPEN ROOF',
    label: 'Complete dry-in checkpoints',
    detail: 'Confirm deck readiness, water barrier placement, laps, transitions, penetrations, and temporary weather protection.',
    done: false,
  },
  {
    id: 'crew-layout',
    phase: 'INSTALL',
    label: 'Set layout and fastening controls',
    detail: 'Establish courses, offsets, exposure, fastening location, fastener depth, and alignment checks.',
    done: false,
  },
  {
    id: 'crew-flashing',
    phase: 'INSTALL',
    label: 'Verify flashing interfaces',
    detail: 'Check valleys, walls, chimneys, penetrations, transitions, terminations, and sealants at the correct work stage.',
    done: false,
  },
  {
    id: 'crew-ventilation',
    phase: 'INSTALL',
    label: 'Verify ventilation pathway',
    detail: 'Confirm selected intake and exhaust details remain open, balanced, weather-resistant, and system-compatible.',
    done: false,
  },
  {
    id: 'crew-progress',
    phase: 'INSTALL',
    label: 'Capture progress checkpoints',
    detail: 'Record critical details before they are covered, using the project documentation standard.',
    done: false,
  },
  {
    id: 'crew-ground',
    phase: 'CLOSE THE DAY',
    label: 'Complete ground and magnetic sweep',
    detail: 'Clean work areas, driveways, planting beds, walkways, access paths, and neighboring exposure areas as appropriate.',
    done: false,
  },
  {
    id: 'crew-water-path',
    phase: 'CLOSE THE DAY',
    label: 'Inspect roof water paths',
    detail: 'Remove loose debris and confirm valleys, gutters, drains, scuppers, and discharge routes are not obstructed.',
    done: false,
  },
  {
    id: 'crew-count',
    phase: 'CLOSE THE DAY',
    label: 'Reconcile materials and tools',
    detail: 'Secure unused material, identify shortages or overage, and verify tools, ladders, protection, and waste removal.',
    done: false,
  },
  {
    id: 'crew-update',
    phase: 'CLOSE THE DAY',
    label: 'Send factual project update',
    detail: 'Record progress, weather status, discovered conditions, approvals, remaining work, and the next expected step.',
    done: false,
  },
];

const initialCloseout: ChecklistItem[] = [
  {
    id: 'close-roof',
    phase: 'ROOF REVIEW',
    label: 'Final roof surface review',
    detail: 'Inspect alignment, exposed fasteners, damaged material, transitions, ridges, valleys, terminations, and visible workmanship.',
    done: false,
  },
  {
    id: 'close-flashing',
    phase: 'ROOF REVIEW',
    label: 'Flashing and penetration review',
    detail: 'Verify completed details against the approved scope and selected roof system.',
    done: false,
  },
  {
    id: 'close-vent',
    phase: 'ROOF REVIEW',
    label: 'Ventilation completion review',
    detail: 'Confirm openings, accessories, baffles, and weather protection are installed as specified.',
    done: false,
  },
  {
    id: 'close-gutters',
    phase: 'ROOF REVIEW',
    label: 'Drainage path review',
    detail: 'Review gutters, downspouts, drains, scuppers, valleys, and roof-to-wall runoff paths in the completed work area.',
    done: false,
  },
  {
    id: 'close-debris',
    phase: 'PROPERTY REVIEW',
    label: 'Remove project debris',
    detail: 'Complete the final cleanup of the roof, attic access used by the crew, grounds, staging zones, and waste areas.',
    done: false,
  },
  {
    id: 'close-magnet',
    phase: 'PROPERTY REVIEW',
    label: 'Complete magnetic sweeps',
    detail: 'Sweep applicable areas more than once and pay extra attention to driveways, walkways, beds, and access routes.',
    done: false,
  },
  {
    id: 'close-damage',
    phase: 'PROPERTY REVIEW',
    label: 'Review property condition',
    detail: 'Compare documented start and finish conditions and resolve identified project-related issues through the proper process.',
    done: false,
  },
  {
    id: 'close-leftovers',
    phase: 'PROPERTY REVIEW',
    label: 'Confirm leftover material plan',
    detail: 'Remove, return, or leave approved attic stock as documented with the customer.',
    done: false,
  },
  {
    id: 'close-photos',
    phase: 'DOCUMENTS',
    label: 'Organize completion photos',
    detail: 'Keep a useful record of system components, addressed conditions, finished elevations, and project closeout.',
    done: false,
  },
  {
    id: 'close-change',
    phase: 'DOCUMENTS',
    label: 'Reconcile approved changes',
    detail: 'Confirm written authorizations, concealed-condition work, allowances, credits, and scope adjustments.',
    done: false,
  },
  {
    id: 'close-invoice',
    phase: 'DOCUMENTS',
    label: 'Prepare accurate final invoice',
    detail: 'Match the signed agreement and properly authorized changes; do not use this prototype as the accounting record.',
    done: false,
  },
  {
    id: 'close-waiver',
    phase: 'DOCUMENTS',
    label: 'Handle lien documentation',
    detail: 'Use state-appropriate forms, timing, and legal review rather than relying on generic prototype language.',
    done: false,
  },
  {
    id: 'close-warranty',
    phase: 'HANDOFF',
    label: 'Provide written warranty information',
    detail: 'Deliver actual written terms, exclusions, owner obligations, registration information, and service contacts.',
    done: false,
  },
  {
    id: 'close-walk',
    phase: 'HANDOFF',
    label: 'Complete customer walkthrough',
    detail: 'Review the visible result, documentation, cleanup, care guidance, open items, and the contact path for questions.',
    done: false,
  },
  {
    id: 'close-punch',
    phase: 'HANDOFF',
    label: 'Resolve or document punch items',
    detail: 'Assign an owner and due date to every verified open item instead of treating the checklist as proof of completion.',
    done: false,
  },
  {
    id: 'close-followup',
    phase: 'HANDOFF',
    label: 'Schedule human follow-up',
    detail: 'Set the appropriate post-project check-in and ask for feedback only after the work and open issues are addressed.',
    done: false,
  },
];

const views: Array<{ id: OperationsView; number: string; label: string; note: string }> = [
  {
    id: 'intake',
    number: '01',
    label: 'Project intake',
    note: 'Set the planning facts.',
  },
  {
    id: 'materials',
    number: '02',
    label: 'Material planner',
    note: 'Estimate quantities.',
  },
  {
    id: 'scope',
    number: '03',
    label: 'Scope builder',
    note: 'Choose work sections.',
  },
  {
    id: 'crew',
    number: '04',
    label: 'Crew day',
    note: 'Run field checks.',
  },
  {
    id: 'closeout',
    number: '05',
    label: 'Closeout',
    note: 'Finish the file.',
  },
];

const roundUp = (value: number) => Math.max(0, Math.ceil(value));

const formatNumber = (value: number, maximumFractionDigits = 0) => new Intl.NumberFormat('en-US', {
  maximumFractionDigits,
}).format(value);

function checklistProgress(items: ChecklistItem[]) {
  if (!items.length) return 0;
  return Math.round((items.filter((item) => item.done).length / items.length) * 100);
}

function groupByPhase(items: ChecklistItem[]) {
  return items.reduce<Record<string, ChecklistItem[]>>((groups, item) => {
    groups[item.phase] = [...(groups[item.phase] || []), item];
    return groups;
  }, {});
}

export function RoofOperationsCenter() {
  const [view, setView] = useState<OperationsView>('intake');
  const [project, setProject] = useState<ProjectContext>(initialProject);
  const [scope, setScope] = useState<ScopeItem[]>(initialScope);
  const [crew, setCrew] = useState<ChecklistItem[]>(initialCrew);
  const [closeout, setCloseout] = useState<ChecklistItem[]>(initialCloseout);
  const [loaded, setLoaded] = useState(false);
  const [notice, setNotice] = useState('');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved) as Partial<OperationsState>;
          if (parsed.project) setProject({ ...initialProject, ...parsed.project });
          if (parsed.scope) setScope(parsed.scope);
          if (parsed.crew) setCrew(parsed.crew);
          if (parsed.closeout) setCloseout(parsed.closeout);
        }
      } catch {
        setNotice('The saved local operations file could not be read, so a fresh planning file was opened.');
      } finally {
        setLoaded(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      const state: OperationsState = {
        project,
        scope,
        crew,
        closeout,
      };
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      window.setTimeout(() => setNotice('Browser storage is unavailable. This working file will last only for the current visit.'), 0);
    }
  }, [closeout, crew, loaded, project, scope]);

  const materialPlan = useMemo(() => {
    const baseSquares = Math.max(0, project.roofArea) / 100;
    const orderSquares = baseSquares * (1 + Math.max(0, project.wastePercent) / 100);
    const bundlesPerSquare = /metal|membrane/i.test(project.roofSystem) ? 0 : 3;
    const perimeterFeet = Math.max(0, project.eaveFeet) + Math.max(0, project.rakeFeet);
    const waterBarrierSquareFeet = Math.max(0, project.valleyFeet) * 6 + perimeterFeet * 3;
    return {
      baseSquares,
      orderSquares,
      bundles: roundUp(orderSquares * bundlesPerSquare),
      underlaymentRolls: roundUp((orderSquares * 100) / 900),
      waterBarrierRolls: roundUp(waterBarrierSquareFeet / 200),
      starterBundles: roundUp(perimeterFeet / 100),
      dripEdgePieces: roundUp(perimeterFeet / 10),
      ridgeBundles: roundUp(Math.max(0, project.ridgeFeet) / 25),
      coilNails: roundUp(orderSquares / 15),
      capFasteners: roundUp(orderSquares / 20),
      ridgeVentPieces: roundUp(Math.max(0, project.ridgeFeet) / 4),
    };
  }, [project]);

  const crewProgress = useMemo(() => checklistProgress(crew), [crew]);
  const closeoutProgress = useMemo(() => checklistProgress(closeout), [closeout]);
  const crewGroups = useMemo(() => groupByPhase(crew), [crew]);
  const closeoutGroups = useMemo(() => groupByPhase(closeout), [closeout]);

  const selectedScope = useMemo(() => scope.filter((item) => item.selected), [scope]);

  const scopeText = useMemo(() => {
    const title = project.projectName || project.propertyAddress || 'Roof project planning file';
    const lines = selectedScope.map((item, index) => `${index + 1}. ${item.title}: ${item.detail}`);
    return [
      title,
      `${project.projectType} · ${project.roofSystem}`,
      `${project.city} · ${project.stories} · ${project.pitch}`,
      '',
      ...lines,
      '',
      'Planning note: This device-local prototype is not a proposal, contract, construction drawing, permit set, engineering document, material order, safety program, or warranty. A qualified contractor must field-verify conditions and issue the controlling written documents.',
    ].join('\n');
  }, [project, selectedScope]);

  const projectBrief = useMemo(() => {
    return [
      'COWBOY ROOF SUPPORT · DEVICE-LOCAL OPERATIONS BRIEF',
      `Project: ${project.projectName || 'Not named'}`,
      `Customer: ${project.customerName || 'Not entered'}`,
      `Property: ${project.propertyAddress || 'Not entered'}, ${project.city}`,
      `Project type: ${project.projectType}`,
      `System: ${project.roofSystem}`,
      `Geometry: ${formatNumber(project.roofArea)} roof sq ft · ${project.wastePercent}% planning waste · ${project.pitch} · ${project.stories}`,
      `Edges: ${formatNumber(project.eaveFeet)} eave ft · ${formatNumber(project.rakeFeet)} rake ft · ${formatNumber(project.ridgeFeet)} ridge ft · ${formatNumber(project.valleyFeet)} valley ft`,
      `Access: ${project.access}`,
      `Planning quantity: ${formatNumber(materialPlan.orderSquares, 1)} squares`,
      `Selected scope sections: ${selectedScope.length}`,
      `Crew checklist: ${crewProgress}%`,
      `Closeout checklist: ${closeoutProgress}%`,
      `Notes: ${project.notes || 'None entered'}`,
      '',
      'Prototype boundary: Verify all measurements, product coverage, code requirements, safety requirements, written terms, quantities, and site conditions with qualified professionals before ordering or building.',
    ].join('\n');
  }, [closeoutProgress, crewProgress, materialPlan.orderSquares, project, selectedScope.length]);

  const updateProject = <K extends keyof ProjectContext>(key: K, value: ProjectContext[K]) => {
    setProject((current) => ({ ...current, [key]: value }));
  };

  const toggleScope = (id: string) => {
    setScope((current) => current.map((item) => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const toggleChecklist = (
    setter: Dispatch<SetStateAction<ChecklistItem[]>>,
    id: string,
  ) => {
    setter((current) => current.map((item) => item.id === id ? { ...item, done: !item.done } : item));
  };

  const setPhase = (
    setter: Dispatch<SetStateAction<ChecklistItem[]>>,
    phase: string,
    done: boolean,
  ) => {
    setter((current) => current.map((item) => item.phase === phase ? { ...item, done } : item));
  };

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      window.setTimeout(() => setCopied(''), 1800);
    } catch {
      setNotice('Copy is unavailable in this browser. Select the text manually.');
    }
  };

  const resetOperations = () => {
    if (!window.confirm('Reset the device-local operations file to its starting state?')) return;
    setProject(initialProject);
    setScope(initialScope);
    setCrew(initialCrew);
    setCloseout(initialCloseout);
    setView('intake');
    setNotice('The local operations planning file was reset.');
  };

  return <section className="roof-operations-center">
    <header className="operations-command-header">
      <div>
        <span><i/>DEVICE-LOCAL ROOF OPERATIONS</span>
        <h2>{project.projectName || 'Untitled Project File'}</h2>
      </div>
      <div>
        <button type="button" onClick={() => copyText(projectBrief, 'brief')}>
          {copied === 'brief' ? 'BRIEF COPIED ✓' : 'COPY PROJECT BRIEF'}
        </button>
        <button type="button" onClick={resetOperations}>RESET LOCAL FILE</button>
      </div>
    </header>

    <div className="operations-status-rail">
      <span><small>PROJECT</small><b>{project.projectName || 'NOT NAMED'}</b></span>
      <span><small>MARKET</small><b>{project.city.toUpperCase()}</b></span>
      <span><small>PLANNING SIZE</small><b>{formatNumber(materialPlan.orderSquares, 1)} SQ</b></span>
      <span><small>SCOPE ITEMS</small><b>{selectedScope.length}</b></span>
      <span><small>CREW DAY</small><b>{crewProgress}%</b></span>
      <span><small>CLOSEOUT</small><b>{closeoutProgress}%</b></span>
    </div>

    {notice && <div className="operations-notice" role="status">
      <span>{notice}</span>
      <button type="button" onClick={() => setNotice('')}>DISMISS</button>
    </div>}

    <nav className="operations-tabs" role="tablist" aria-label="Roof operations sections">
      {views.map((item) => <button
        type="button"
        role="tab"
        className={view === item.id ? 'active' : ''}
        onClick={() => setView(item.id)}
        aria-selected={view === item.id}
        key={item.id}
      >
        <small>{item.number}</small>
        <b>{item.label}</b>
        <span>{item.note}</span>
      </button>)}
    </nav>

    {view === 'intake' && <section className="operations-panel intake-panel" role="tabpanel">
      <header className="operations-panel-intro">
        <div>
          <small>PROJECT INTAKE</small>
          <h3>Start with field-verifiable facts.</h3>
        </div>
        <p>This information stays in the current browser. It is a working organizer, not the signed customer file or a substitute for site measurements.</p>
      </header>

      <div className="project-intake-grid">
        <label>
          PROJECT NAME
          <input value={project.projectName} onChange={(event) => updateProject('projectName', event.target.value)} placeholder="Example: North elevation replacement"/>
        </label>
        <label>
          CUSTOMER NAME
          <input value={project.customerName} onChange={(event) => updateProject('customerName', event.target.value)} placeholder="Name for this local working file"/>
        </label>
        <label className="wide">
          PROPERTY ADDRESS
          <input value={project.propertyAddress} onChange={(event) => updateProject('propertyAddress', event.target.value)} placeholder="Property address"/>
        </label>
        <label>
          CITY / MARKET
          <select value={project.city} onChange={(event) => updateProject('city', event.target.value)}>
            <option>Alpharetta</option>
            <option>Roswell</option>
            <option>Milton</option>
            <option>Johns Creek</option>
            <option>Cumming</option>
            <option>Woodstock</option>
            <option>Other North Atlanta</option>
          </select>
        </label>
        <label>
          PROJECT TYPE
          <select value={project.projectType} onChange={(event) => updateProject('projectType', event.target.value)}>
            <option>Residential replacement</option>
            <option>Residential repair</option>
            <option>Storm condition inspection</option>
            <option>Estate / complex residential</option>
            <option>Commercial steep-slope</option>
            <option>Commercial low-slope</option>
          </select>
        </label>
        <label>
          ROOF SYSTEM
          <select value={project.roofSystem} onChange={(event) => updateProject('roofSystem', event.target.value)}>
            <option>Architectural asphalt shingles</option>
            <option>Designer asphalt shingles</option>
            <option>Standing seam metal</option>
            <option>Synthetic slate / shake</option>
            <option>Low-slope membrane</option>
            <option>System not selected</option>
          </select>
        </label>
        <label>
          STORIES
          <select value={project.stories} onChange={(event) => updateProject('stories', event.target.value)}>
            <option>1 story</option>
            <option>1.5 stories</option>
            <option>2 stories</option>
            <option>3+ stories</option>
            <option>Commercial height — assess</option>
          </select>
        </label>
        <label>
          PITCH RANGE
          <select value={project.pitch} onChange={(event) => updateProject('pitch', event.target.value)}>
            <option>Low slope — system-specific</option>
            <option>3:12 to 5:12</option>
            <option>6:12 to 8:12</option>
            <option>9:12 to 12:12</option>
            <option>Above 12:12</option>
            <option>Mixed / complex</option>
          </select>
        </label>
        <label>
          SITE ACCESS
          <select value={project.access} onChange={(event) => updateProject('access', event.target.value)}>
            <option>Standard driveway access</option>
            <option>Limited driveway access</option>
            <option>Steep grade / retaining conditions</option>
            <option>Dense landscaping / pool conditions</option>
            <option>Urban / commercial coordination</option>
            <option>Access not yet assessed</option>
          </select>
        </label>
        <label className="wide">
          OPERATIONS NOTES
          <textarea value={project.notes} onChange={(event) => updateProject('notes', event.target.value)} placeholder="Known constraints, inspection observations, decision points, and next action."/>
        </label>
      </div>

      <aside className="intake-guardrails">
        <article>
          <small>01</small>
          <h4>Inspect before promising.</h4>
          <p>Remote details help route the job. They do not establish concealed conditions, code compliance, repairability, or final scope.</p>
        </article>
        <article>
          <small>02</small>
          <h4>Separate planning from price.</h4>
          <p>Planning quantities and customer prices serve different purposes. Only the approved written proposal controls commercial terms.</p>
        </article>
        <article>
          <small>03</small>
          <h4>Keep authorization visible.</h4>
          <p>Document changes, concealed conditions, selections, and who approved them before affected work proceeds.</p>
        </article>
      </aside>
    </section>}

    {view === 'materials' && <section className="operations-panel material-panel" role="tabpanel">
      <header className="operations-panel-intro">
        <div>
          <small>MATERIAL PLANNER</small>
          <h3>Estimate the system—not just the field product.</h3>
        </div>
        <p>Enter measured roof and edge quantities. Every output is a planning allowance that must be reconciled to takeoff geometry, package coverage, system details, and field conditions.</p>
      </header>

      <div className="material-workspace">
        <div className="material-inputs">
          <label>
            MEASURED ROOF AREA
            <span><input type="number" min="0" step="50" value={project.roofArea} onChange={(event) => updateProject('roofArea', Number(event.target.value))}/><b>SQ FT</b></span>
          </label>
          <label>
            PLANNING WASTE
            <span><input type="number" min="0" max="40" step="1" value={project.wastePercent} onChange={(event) => updateProject('wastePercent', Number(event.target.value))}/><b>%</b></span>
          </label>
          <label>
            EAVE LENGTH
            <span><input type="number" min="0" step="5" value={project.eaveFeet} onChange={(event) => updateProject('eaveFeet', Number(event.target.value))}/><b>FT</b></span>
          </label>
          <label>
            RAKE LENGTH
            <span><input type="number" min="0" step="5" value={project.rakeFeet} onChange={(event) => updateProject('rakeFeet', Number(event.target.value))}/><b>FT</b></span>
          </label>
          <label>
            HIP + RIDGE LENGTH
            <span><input type="number" min="0" step="5" value={project.ridgeFeet} onChange={(event) => updateProject('ridgeFeet', Number(event.target.value))}/><b>FT</b></span>
          </label>
          <label>
            VALLEY LENGTH
            <span><input type="number" min="0" step="5" value={project.valleyFeet} onChange={(event) => updateProject('valleyFeet', Number(event.target.value))}/><b>FT</b></span>
          </label>
        </div>

        <div className="material-blueprint" aria-label="Material planning diagram">
          <header>
            <span>COWBOY TAKEOFF LAB</span>
            <b>PLANNING / NOT FOR CONSTRUCTION</b>
          </header>
          <div className="material-blueprint-field">
            <i className="plan-roof-a"/>
            <i className="plan-roof-b"/>
            <i className="plan-ridge"/>
            <i className="plan-valley one"/>
            <i className="plan-valley two"/>
            <span className="plan-label area">AREA · {formatNumber(project.roofArea)} SF</span>
            <span className="plan-label ridge">RIDGE · {formatNumber(project.ridgeFeet)} FT</span>
            <span className="plan-label perimeter">EAVE + RAKE · {formatNumber(project.eaveFeet + project.rakeFeet)} FT</span>
            <span className="plan-label waste">WASTE · {project.wastePercent}%</span>
          </div>
          <footer>
            <span>REV · DEVICE LOCAL</span>
            <span>SYSTEM · {project.roofSystem.toUpperCase()}</span>
          </footer>
        </div>
      </div>

      <section className="material-results">
        <article className="primary-result">
          <small>ORDER-AREA ALLOWANCE</small>
          <strong>{formatNumber(materialPlan.orderSquares, 1)}</strong>
          <b>SQUARES</b>
          <p>{formatNumber(materialPlan.baseSquares, 1)} measured squares plus {project.wastePercent}% planning waste.</p>
        </article>
        <article>
          <small>FIELD BUNDLES</small>
          <strong>{materialPlan.bundles || 'SYSTEM'}</strong>
          <b>{materialPlan.bundles ? 'BUNDLES' : 'SPECIFIC'}</b>
          <p>Uses three bundles per square only for the shingle planning example.</p>
        </article>
        <article>
          <small>UNDERLAYMENT</small>
          <strong>{materialPlan.underlaymentRolls}</strong>
          <b>ROLLS</b>
          <p>Planning at 900 square feet per roll before laps and system-specific coverage.</p>
        </article>
        <article>
          <small>WATER BARRIER</small>
          <strong>{materialPlan.waterBarrierRolls}</strong>
          <b>ROLLS</b>
          <p>Concept allowance for selected eaves, rakes, valleys, and detail zones.</p>
        </article>
        <article>
          <small>STARTER</small>
          <strong>{materialPlan.starterBundles}</strong>
          <b>BUNDLES</b>
          <p>Planning at 100 linear feet per package around entered eaves and rakes.</p>
        </article>
        <article>
          <small>DRIP EDGE</small>
          <strong>{materialPlan.dripEdgePieces}</strong>
          <b>10-FT PIECES</b>
          <p>Does not include overlap, corner, damage, or packaging allowances.</p>
        </article>
        <article>
          <small>HIP + RIDGE</small>
          <strong>{materialPlan.ridgeBundles}</strong>
          <b>BUNDLES</b>
          <p>Planning at 25 linear feet per package; verify selected product coverage.</p>
        </article>
        <article>
          <small>COIL NAILS</small>
          <strong>{materialPlan.coilNails}</strong>
          <b>BOXES</b>
          <p>Illustrative coverage only; fastening patterns and packages vary.</p>
        </article>
        <article>
          <small>CAP FASTENERS</small>
          <strong>{materialPlan.capFasteners}</strong>
          <b>BOXES</b>
          <p>Illustrative allowance. Confirm approved underlayment fastening method.</p>
        </article>
        <article>
          <small>RIDGE VENT</small>
          <strong>{materialPlan.ridgeVentPieces}</strong>
          <b>4-FT PIECES</b>
          <p>Not every ridge should be vented. Verify ventilation design first.</p>
        </article>
      </section>

      <div className="material-warning">
        <span>FIELD VERIFICATION REQUIRED</span>
        <p>Do not place an order from this screen. Confirm the measured takeoff, slopes, starter locations, cut-up, package coverage, batch or lot needs, ventilation design, accessories, flashing, delivery constraints, overage strategy, return policy, and the manufacturer&apos;s current written instructions.</p>
      </div>
    </section>}

    {view === 'scope' && <section className="operations-panel scope-panel" role="tabpanel">
      <header className="operations-panel-intro">
        <div>
          <small>SCOPE BUILDER</small>
          <h3>Make the work visible.</h3>
        </div>
        <p>Select planning sections to build a plain-language outline. A real proposal must add exact quantities, exclusions, price, payment, schedule, change rules, warranties, and legally reviewed terms.</p>
      </header>

      <div className="scope-toolbar">
        <span><b>{selectedScope.length}</b> OF {scope.length} PLANNING SECTIONS SELECTED</span>
        <div>
          <button type="button" onClick={() => setScope((current) => current.map((item) => ({ ...item, selected: true })))}>SELECT ALL</button>
          <button type="button" onClick={() => setScope((current) => current.map((item) => ({ ...item, selected: false })))}>CLEAR ALL</button>
          <button type="button" onClick={() => copyText(scopeText, 'scope')}>{copied === 'scope' ? 'SCOPE COPIED ✓' : 'COPY OUTLINE'}</button>
        </div>
      </div>

      <div className="scope-builder-grid">
        <div className="scope-options">
          {Array.from(new Set(scope.map((item) => item.category))).map((category) => <section key={category}>
            <header>
              <small>{category}</small>
              <span>{scope.filter((item) => item.category === category && item.selected).length}/{scope.filter((item) => item.category === category).length}</span>
            </header>
            {scope.filter((item) => item.category === category).map((item) => <button
              type="button"
              className={item.selected ? 'selected' : ''}
              onClick={() => toggleScope(item.id)}
              key={item.id}
            >
              <i>{item.selected ? '✓' : '+'}</i>
              <span>
                <b>{item.title}</b>
                <small>{item.detail}</small>
              </span>
            </button>)}
          </section>)}
        </div>

        <aside className="scope-preview">
          <header>
            <div><small>WORKING OUTLINE</small><h4>{project.projectName || 'Roof project planning file'}</h4></div>
            <b>{selectedScope.length} ITEMS</b>
          </header>
          <div>
            {selectedScope.map((item, index) => <article key={item.id}>
              <small>{String(index + 1).padStart(2, '0')}</small>
              <span><b>{item.title}</b><p>{item.detail}</p></span>
            </article>)}
            {!selectedScope.length && <p className="scope-empty">Select a planning section to build the outline.</p>}
          </div>
          <footer>
            <p>Prototype outline only. The signed agreement and approved changes control the work.</p>
            <button type="button" onClick={() => copyText(scopeText, 'scope-preview')}>{copied === 'scope-preview' ? 'COPIED ✓' : 'COPY PLAIN-TEXT OUTLINE →'}</button>
          </footer>
        </aside>
      </div>
    </section>}

    {view === 'crew' && <section className="operations-panel checklist-panel" role="tabpanel">
      <header className="operations-panel-intro">
        <div>
          <small>CREW DAY BOARD</small>
          <h3>Control the handoffs.</h3>
        </div>
        <p>A strong day is a sequence: verify, protect, open carefully, inspect, dry in, install, document, and leave the property controlled.</p>
      </header>

      <div className="checklist-progress-card">
        <div>
          <small>DEVICE-LOCAL PROGRESS</small>
          <strong>{crewProgress}%</strong>
          <span>{crew.filter((item) => item.done).length} OF {crew.length} CHECKS MARKED</span>
        </div>
        <div className="operations-progress-track"><i style={{ width: `${crewProgress}%` }}/></div>
        <p>Checked boxes organize the current browser session. They are not proof that work was performed, supervised, inspected, or accepted.</p>
      </div>

      <div className="field-checklist">
        {Object.entries(crewGroups).map(([phase, items], phaseIndex) => <section key={phase}>
          <header>
            <div><small>{String(phaseIndex + 1).padStart(2, '0')}</small><h4>{phase}</h4></div>
            <button type="button" onClick={() => setPhase(setCrew, phase, !items.every((item) => item.done))}>{items.every((item) => item.done) ? 'CLEAR PHASE' : 'MARK PHASE'}</button>
          </header>
          <div>
            {items.map((item) => <label className={item.done ? 'complete' : ''} key={item.id}>
              <input type="checkbox" checked={item.done} onChange={() => toggleChecklist(setCrew, item.id)}/>
              <i>{item.done ? '✓' : ''}</i>
              <span><b>{item.label}</b><small>{item.detail}</small></span>
            </label>)}
          </div>
        </section>)}
      </div>

      <aside className="field-stop-card">
        <div><small>STOP-WORK MINDSET</small><h4>Pause when the facts change.</h4></div>
        <ul>
          <li>Unsafe weather, access, fall exposure, or property condition.</li>
          <li>Wrong product, color, quantity, batch, accessory, or system detail.</li>
          <li>Concealed conditions outside authorized scope.</li>
          <li>Unclear flashing, drainage, ventilation, structural, or code condition.</li>
          <li>Customer instruction that conflicts with the agreement or safe practice.</li>
        </ul>
      </aside>
    </section>}

    {view === 'closeout' && <section className="operations-panel checklist-panel closeout-panel" role="tabpanel">
      <header className="operations-panel-intro">
        <div>
          <small>CLOSEOUT FILE</small>
          <h3>Finish beyond the last shingle.</h3>
        </div>
        <p>Quality is also cleanup, documentation, honest open-item handling, accurate paperwork, and a customer who knows what happens next.</p>
      </header>

      <div className="closeout-dashboard">
        <article>
          <small>COMPLETION CHECKS</small>
          <strong>{closeoutProgress}%</strong>
          <div className="operations-progress-track"><i style={{ width: `${closeoutProgress}%` }}/></div>
        </article>
        <article>
          <small>OPEN ITEMS</small>
          <strong>{closeout.filter((item) => !item.done).length}</strong>
          <span>must be verified or assigned</span>
        </article>
        <article>
          <small>PROJECT BRIEF</small>
          <button type="button" onClick={() => copyText(projectBrief, 'closeout-brief')}>{copied === 'closeout-brief' ? 'COPIED ✓' : 'COPY LOCAL BRIEF →'}</button>
          <span>does not replace the project record</span>
        </article>
      </div>

      <div className="field-checklist closeout-checklist">
        {Object.entries(closeoutGroups).map(([phase, items], phaseIndex) => <section key={phase}>
          <header>
            <div><small>{String(phaseIndex + 1).padStart(2, '0')}</small><h4>{phase}</h4></div>
            <button type="button" onClick={() => setPhase(setCloseout, phase, !items.every((item) => item.done))}>{items.every((item) => item.done) ? 'CLEAR PHASE' : 'MARK PHASE'}</button>
          </header>
          <div>
            {items.map((item) => <label className={item.done ? 'complete' : ''} key={item.id}>
              <input type="checkbox" checked={item.done} onChange={() => toggleChecklist(setCloseout, item.id)}/>
              <i>{item.done ? '✓' : ''}</i>
              <span><b>{item.label}</b><small>{item.detail}</small></span>
            </label>)}
          </div>
        </section>)}
      </div>

      <section className="closeout-boundary">
        <div>
          <small>WHEN THE BOARD REACHES 100%</small>
          <h4>Verify. Do not assume.</h4>
        </div>
        <p>A marked checklist is an organizer, not a certification. The responsible person must inspect the real work, confirm the controlling documents, resolve open items, and preserve the actual project record in approved company systems.</p>
        <Link href="/quality">OPEN QUALITY STANDARD →</Link>
      </section>
    </section>}

    <footer className="operations-command-footer">
      <span>PLANNING PROTOTYPE · DEVICE LOCAL · FIELD VERIFICATION REQUIRED</span>
      <div>
        <Link href="/leads">LEAD DESK</Link>
        <Link href="/growth">GROWTH COMMAND</Link>
        <Link href="/project-center">CUSTOMER ROUTER</Link>
        <Link href="/privacy">DATA BOUNDARY</Link>
      </div>
    </footer>
  </section>;
}
