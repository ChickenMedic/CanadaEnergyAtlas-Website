import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Map as MapIcon } from 'lucide-react';
import type { SidebarLayerKey } from '../map/mapLayers';
import type { DeepDiveSource, DeepDiveStat } from '../../pages/deep-dives/types';

/* ------------------------------------------------------------------ */
/*  Building blocks shared by every deep dive. All colour comes from   */
/*  the --dd-accent custom property set on the article root.           */
/* ------------------------------------------------------------------ */

/** Opening paragraph, set larger than body copy. */
export function Lead({ children }: { children: ReactNode }) {
  return <p className="dd-lead">{children}</p>;
}

interface CalloutProps {
  title?: string;
  children: ReactNode;
}

/** An aside with an accent rule: a definition, a key insight, a caveat. */
export function Callout({ title, children }: CalloutProps) {
  return (
    <aside className="dd-callout">
      {title && <div className="dd-callout-title">{title}</div>}
      <div className="dd-callout-body">{children}</div>
    </aside>
  );
}

/** A row of key figures. Used in the article header and inside sections. */
export function StatGrid({ items, compact = false }: { items: DeepDiveStat[]; compact?: boolean }) {
  return (
    <div className={`dd-stats ${compact ? 'dd-stats-compact' : ''}`}>
      {items.map((s) => (
        <div key={s.label} className="dd-stat">
          <div className="dd-stat-value">{s.value}</div>
          <div className="dd-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export interface BarItem {
  label: string;
  /** Numeric value used to scale the bar. */
  value: number;
  /** Formatted value shown at the end of the bar. Defaults to value.toLocaleString(). */
  display?: string;
  /** Small grey note under the label. */
  note?: string;
}

interface BarListProps {
  title?: string;
  unit?: string;
  items: BarItem[];
  /** Footnote under the chart. */
  note?: string;
}

/**
 * Single-series horizontal bars. One hue (the article accent), thin marks,
 * value at the tip. Every value is also in the DOM as text, so no tooltip is
 * needed to read the chart.
 */
export function BarList({ title, unit, items, note }: BarListProps) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <figure className="dd-figure">
      {(title || unit) && (
        <figcaption className="dd-figure-title">
          {title}
          {unit && <span className="dd-figure-unit">{unit}</span>}
        </figcaption>
      )}
      <div className="dd-bars" role="table" aria-label={title}>
        {items.map((item) => {
          const pct = item.value > 0 && max > 0 ? Math.max((item.value / max) * 100, 1.5) : 0;
          return (
            <div key={item.label} className="dd-bar-row" role="row">
              <div className="dd-bar-label" role="cell">
                <span>{item.label}</span>
                {item.note && <span className="dd-bar-note">{item.note}</span>}
              </div>
              <div className="dd-bar-track" role="cell">
                <div className="dd-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="dd-bar-value" role="cell">
                {item.display ?? item.value.toLocaleString('en-CA')}
              </div>
            </div>
          );
        })}
      </div>
      {note && <div className="dd-figure-note">{note}</div>}
    </figure>
  );
}

export interface TableColumn {
  header: string;
  align?: 'left' | 'right';
}

interface DataTableProps {
  title?: string;
  columns: TableColumn[];
  rows: ReactNode[][];
  note?: string;
}

/** A proper data table: heavy header, hairline rows, right-aligned numbers. */
export function DataTable({ title, columns, rows, note }: DataTableProps) {
  return (
    <figure className="dd-figure">
      {title && <figcaption className="dd-figure-title">{title}</figcaption>}
      <div className="dd-table-wrap">
        <table className="dd-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.header} className={c.align === 'right' ? 'num' : undefined}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className={columns[j]?.align === 'right' ? 'num' : undefined}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <div className="dd-figure-note">{note}</div>}
    </figure>
  );
}

export interface TimelineItem {
  /** The marker text: a year, or a step number. */
  marker: string;
  title: string;
  text: ReactNode;
}

/** A vertical sequence of dated events or ordered steps. */
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="dd-timeline">
      {items.map((item) => (
        <li key={`${item.marker}-${item.title}`} className="dd-timeline-item">
          <div className="dd-timeline-marker">{item.marker}</div>
          <div className="dd-timeline-body">
            <div className="dd-timeline-title">{item.title}</div>
            <div className="dd-timeline-text">{item.text}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

interface MapLinkProps {
  layer: SidebarLayerKey;
  title: string;
  children: ReactNode;
}

/** A card that opens the interactive map with the relevant layer switched on. */
export function MapLink({ layer, title, children }: MapLinkProps) {
  return (
    <Link to={`/map?layer=${layer}`} className="dd-maplink">
      <div className="dd-maplink-icon">
        <MapIcon size={22} />
      </div>
      <div className="dd-maplink-text">
        <div className="dd-maplink-title">{title}</div>
        <div className="dd-maplink-desc">{children}</div>
      </div>
      <ArrowUpRight size={20} className="dd-maplink-arrow" />
    </Link>
  );
}

/** Numbered source list at the end of an article. */
export function Sources({ items }: { items: DeepDiveSource[] }) {
  return (
    <ol className="dd-sources">
      {items.map((s) => (
        <li key={`${s.org}-${s.title}`}>
          <span className="dd-source-org">{s.org}</span>
          {' '}
          {s.url ? (
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              {s.title}
            </a>
          ) : (
            <span>{s.title}</span>
          )}
        </li>
      ))}
    </ol>
  );
}
