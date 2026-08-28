export const neighborCities = [
  { slug: 'alpharetta', name: 'Alpharetta', note: 'Complex rooflines, mature trees, HOA details, flashing intersections, and high-finish expectations.', signals: ['Complex valleys and walls', 'Tree and debris exposure', 'HOA-ready material choices'] },
  { slug: 'roswell', name: 'Roswell', note: 'Established homes often combine older roof sections, additions, chimney details, and repair history.', signals: ['Mixed roof ages', 'Chimney and wall flashing', 'Repairability review'] },
  { slug: 'milton', name: 'Milton', note: 'Large homes, detached structures, steep sections, long valleys, and property-access planning deserve a complete brief.', signals: ['Estate-scale geometry', 'Detached structures', 'Access and protection plan'] },
  { slug: 'johns-creek', name: 'Johns Creek', note: 'Drainage, attic airflow, tree cover, and dense roof geometry can turn small details into recurring problems.', signals: ['Ventilation balance', 'Drainage paths', 'Landscape protection'] },
  { slug: 'cumming', name: 'Cumming', note: 'Fast growth, mixed roof ages, lakeside moisture, storm exposure, and varied property types call for clean routing.', signals: ['Storm condition record', 'Moisture clues', 'Mixed system planning'] },
] as const;

export function getNeighborCity(slug: string) { return neighborCities.find((city) => city.slug === slug); }
