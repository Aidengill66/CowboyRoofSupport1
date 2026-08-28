'use client';

import Link from 'next/link';
import { type CSSProperties, useMemo, useState } from 'react';
import { directoryRoots, flattenDirectory, type DirectoryNode } from '../site-directory';

function nodeCount(nodes: DirectoryNode[]): number {
  return nodes.reduce((total, node) => total + 1 + nodeCount(node.children || []), 0);
}

function pathLabel(parents: DirectoryNode[], node: DirectoryNode) {
  return [...parents.map((parent) => parent.label), node.label].join(' / ');
}

export function DirectoryExplorer() {
  const roofing = directoryRoots.find((node) => node.id === 'roofing');
  const firstCabinet = roofing?.children?.[0];
  const [trail, setTrail] = useState<DirectoryNode[]>([roofing, firstCabinet].filter(Boolean) as DirectoryNode[]);
  const [query, setQuery] = useState('');

  const flatDirectory = useMemo(() => flattenDirectory(directoryRoots), []);
  const totalNodes = useMemo(() => nodeCount(directoryRoots), []);
  const normalizedQuery = query.trim().toLowerCase();
  const results = normalizedQuery
    ? flatDirectory
      .filter(({ node, parents }) => `${node.label} ${node.description} ${parents.map((parent) => parent.label).join(' ')}`.toLowerCase().includes(normalizedQuery))
      .slice(0, 24)
    : [];

  const columns = useMemo(() => {
    const directoryColumns: Array<{ parent: DirectoryNode | null; nodes: DirectoryNode[] }> = [
      { parent: null, nodes: directoryRoots },
    ];
    trail.forEach((node) => {
      if (node.children?.length) directoryColumns.push({ parent: node, nodes: node.children });
    });
    return directoryColumns;
  }, [trail]);

  const chooseNode = (node: DirectoryNode, depth: number) => {
    if (!node.children?.length) return;
    setTrail((current) => [...current.slice(0, depth), node]);
  };

  const resetDirectory = () => {
    setTrail([]);
    setQuery('');
  };

  const backOne = () => {
    setTrail((current) => current.slice(0, -1));
  };

  return <section className="directory-explorer">
    <header className="directory-command-bar">
      <div>
        <span><i/>LIVE SITE DIRECTORY</span>
        <h2>Keep opening the next split.</h2>
      </div>
      <div className="directory-command-actions">
        <Link href="/">⌂ HOME</Link>
        <button type="button" onClick={backOne} disabled={!trail.length}>← BACK ONE SPLIT</button>
        <button type="button" onClick={resetDirectory}>RESET DIRECTORY</button>
      </div>
    </header>

    <div className="directory-stats">
      <span><small>ROUTES + NODES</small><b>{totalNodes}</b></span>
      <span><small>VISIBLE DEPTH</small><b>{columns.length}</b></span>
      <span><small>CURRENT TRAIL</small><b>{trail.length ? trail.map((node) => node.label).join(' → ') : 'ROOT'}</b></span>
      <span><small>HOME ACCESS</small><b>ALWAYS ON</b></span>
    </div>

    <section className="directory-search">
      <label htmlFor="directory-query">
        SEARCH EVERY CABINET, FOLDER, AND FILE
        <span>
          <i aria-hidden="true">⌕</i>
          <input id="directory-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try leak, metal, inspection, commercial, privacy…"/>
          {query && <button type="button" onClick={() => setQuery('')}>CLEAR</button>}
        </span>
      </label>
      <p>Every result opens a real page. Directory buttons marked with a split reveal another level without leaving this screen.</p>
    </section>

    {normalizedQuery && <section className="directory-results" aria-label="Directory search results">
      <header><span>SEARCH RESULTS</span><b>{results.length} MATCH{results.length === 1 ? '' : 'ES'}</b></header>
      <div>
        {results.map(({ node, parents }) => <Link href={node.href} key={`${pathLabel(parents, node)}-${node.id}`}>
          <small>{pathLabel(parents, node)}</small>
          <b>{node.label}</b>
          <p>{node.description}</p>
          <span>OPEN PAGE →</span>
        </Link>)}
        {!results.length && <article className="directory-no-results"><small>NO MATCH</small><h3>Try a broader roofing word.</h3><p>Search a need, material, property type, company system, city, or technical topic.</p></article>}
      </div>
    </section>}

    {!normalizedQuery && <>
      <nav className="directory-breadcrumb" aria-label="Current directory trail">
        <Link href="/">HOME</Link>
        <button type="button" onClick={() => setTrail([])}>ALL FILES</button>
        {trail.map((node, index) => <button type="button" onClick={() => setTrail((current) => current.slice(0, index + 1))} key={`${node.id}-${index}`}>{node.label}</button>)}
      </nav>

      <div className="directory-columns" style={{ '--directory-columns': Math.min(columns.length, 5) } as CSSProperties}>
        {columns.map((column, depth) => <section className="directory-column" key={`${column.parent?.id || 'root'}-${depth}`}>
          <header>
            <span><small>LEVEL {String(depth + 1).padStart(2, '0')}</small><b>{column.parent?.label || 'All files'}</b></span>
            <i>{column.nodes.length} ITEMS</i>
          </header>
          <div>
            {column.nodes.map((node, index) => {
              const selected = trail[depth]?.id === node.id;
              const hasChildren = !!node.children?.length;
              return <article className={selected ? 'selected' : ''} key={`${node.id}-${index}`}>
                {hasChildren ? <button type="button" className="directory-node-main" onClick={() => chooseNode(node, depth)}>
                  <small>{node.eyebrow || `FOLDER ${String(index + 1).padStart(2, '0')}`}</small>
                  <b>{node.label}</b>
                  <p>{node.description}</p>
                  <span>{node.children?.length} MORE SPLITS <i>›</i></span>
                </button> : <Link className="directory-node-main terminal" href={node.href}>
                  <small>{node.eyebrow || `FILE ${String(index + 1).padStart(2, '0')}`}</small>
                  <b>{node.label}</b>
                  <p>{node.description}</p>
                  <span>OPEN FILE <i>→</i></span>
                </Link>}
                {hasChildren && <Link className="directory-node-open" href={node.href} aria-label={`Open ${node.label} page`}>OPEN PAGE →</Link>}
              </article>;
            })}
          </div>
        </section>)}
      </div>

      <footer className="directory-infinite-note">
        <div><small>RECURSIVE DIRECTORY LOGIC</small><h3>Every folder can hold another folder.</h3></div>
        <p>The structure is designed to keep expanding as Cowboy Roof Support adds cities, products, technical files, project tools, and family businesses. Each level stays tied to a useful page and a clear way home.</p>
        <Link href="/">RETURN HOME →</Link>
      </footer>
    </>}
  </section>;
}
