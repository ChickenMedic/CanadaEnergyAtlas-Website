import { ChevronUp, ChevronDown } from 'lucide-react';
import { LAYER_GROUPS, isGroupActive, visibilityKey } from './mapLayers';
import type { ActiveLayers, LayerCategory } from './mapLayers';

interface MapLegendProps {
  activeLayers: ActiveLayers;
  categoryVisibility: Record<string, boolean>;
  onToggleCategory: (groupId: string, categoryKey: string) => void;
  isLegendOpen: boolean;
  setIsLegendOpen: (open: boolean) => void;
  minRenewableCapacity: number;
  setMinRenewableCapacity: (v: number) => void;
}

function Swatch({ cat }: { cat: LayerCategory }) {
  if (cat.swatch === 'line') {
    return <span style={{ width: '16px', height: '4px', backgroundColor: cat.color, borderRadius: '2px' }}></span>;
  }
  if (cat.swatch === 'ring') {
    return <span style={{ width: '10px', height: '10px', backgroundColor: '#111', border: `2px solid ${cat.color}`, borderRadius: '50%' }}></span>;
  }
  return <span style={{ width: '12px', height: '12px', backgroundColor: cat.color, border: '1.5px solid #fff', borderRadius: '50%' }}></span>;
}

function LegendToggleRow({ cat, checked, isLast, onToggle }: { cat: LayerCategory; checked: boolean; isLast: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className="legend-row"
      style={{ marginBottom: isLast ? 0 : '8px', opacity: checked ? 1 : 0.6 }}
      onClick={onToggle}
    >
      <Swatch cat={cat} />
      <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1, textAlign: 'left' }}>{cat.label}</span>
      <span style={{ width: '28px', height: '14px', backgroundColor: checked ? cat.color : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
        <span style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: checked ? '16px' : '2px', transition: 'left 0.2s' }}></span>
      </span>
    </button>
  );
}

const CAPACITY_OPTIONS = [
  { value: 0, label: 'All' },
  { value: 100, label: 'Over 100MW' },
  { value: 250, label: 'Over 250MW' },
  { value: 400, label: '400MW+' },
];

export default function MapLegend({
  activeLayers, categoryVisibility, onToggleCategory,
  isLegendOpen, setIsLegendOpen, minRenewableCapacity, setMinRenewableCapacity,
}: MapLegendProps) {
  const activeGroups = LAYER_GROUPS.filter((g) => isGroupActive(g, activeLayers));

  return (
    <div style={{ position: 'absolute', top: 50, right: 20, display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 10 }}>
      {activeGroups.length > 0 && (
        <button
          type="button"
          onClick={() => setIsLegendOpen(!isLegendOpen)}
          className="glass-panel legend-toggle-btn"
          aria-expanded={isLegendOpen}
          title={isLegendOpen ? 'Collapse Legend' : 'Expand Legend'}
        >
          <span style={{ fontSize: '1.1rem', fontWeight: 600, marginRight: '8px' }}>Legend</span>
          {isLegendOpen ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
        </button>
      )}

      {isLegendOpen && activeGroups.map((group) => {
        // Facilities panel shows refining vs storage rows independently.
        const visibleCats = group.categories.filter((cat) => activeLayers[cat.sidebarKey]);
        return (
          <div key={group.id} className="glass-panel" style={{ padding: '12px 16px', borderRadius: '8px', minWidth: '200px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>{group.legendTitle}</h4>
            {visibleCats.map((cat, i) => (
              <LegendToggleRow
                key={cat.key}
                cat={cat}
                checked={categoryVisibility[visibilityKey(group.id, cat.key)]}
                isLast={i === visibleCats.length - 1 && !group.supportsCapacityFilter}
                onToggle={() => onToggleCategory(group.id, cat.key)}
              />
            ))}
            {group.supportsCapacityFilter && (
              <fieldset style={{ marginTop: '16px', border: 'none', padding: 0, margin: '16px 0 0' }}>
                <legend style={{ fontSize: '0.8rem', color: '#e5e7eb', marginBottom: '8px', padding: 0 }}>Min Capacity</legend>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {CAPACITY_OPTIONS.map((opt) => (
                    <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', color: '#e5e7eb' }}>
                      <input
                        type="radio"
                        name="renewable-capacity"
                        checked={minRenewableCapacity === opt.value}
                        onChange={() => setMinRenewableCapacity(opt.value)}
                      /> {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
          </div>
        );
      })}
    </div>
  );
}
