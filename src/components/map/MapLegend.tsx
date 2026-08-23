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
    return <div style={{ width: '16px', height: '4px', backgroundColor: cat.color, borderRadius: '2px' }}></div>;
  }
  if (cat.swatch === 'ring') {
    return <div style={{ width: '10px', height: '10px', backgroundColor: '#111', border: `2px solid ${cat.color}`, borderRadius: '50%' }}></div>;
  }
  return <div style={{ width: '12px', height: '12px', backgroundColor: cat.color, border: '1.5px solid #fff', borderRadius: '50%' }}></div>;
}

function LegendToggleRow({ cat, checked, isLast, onToggle }: { cat: LayerCategory; checked: boolean; isLast: boolean; onToggle: () => void }) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: isLast ? 0 : '8px', cursor: 'pointer', opacity: checked ? 1 : 0.6 }}
      onClick={onToggle}
    >
      <Swatch cat={cat} />
      <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>{cat.label}</span>
      <div style={{ width: '28px', height: '14px', backgroundColor: checked ? cat.color : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
        <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: checked ? '16px' : '2px', transition: 'left 0.2s' }}></div>
      </div>
    </div>
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
  const anyGroupActive = LAYER_GROUPS.some((g) => isGroupActive(g, activeLayers));

  return (
    <div style={{ position: 'absolute', top: 50, right: 20, display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 10 }}>
      {anyGroupActive && (
        <button
          onClick={() => setIsLegendOpen(!isLegendOpen)}
          className="glass-panel"
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '1px solid var(--border-light)',
            color: '#fff',
            background: 'var(--bg-panel)',
            alignSelf: 'flex-end',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            backdropFilter: 'var(--glass-blur)'
          }}
          title={isLegendOpen ? "Collapse Legend" : "Expand Legend"}
        >
          <span style={{ fontSize: '1.1rem', fontWeight: 600, marginRight: '8px' }}>Legend</span>
          {isLegendOpen ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
        </button>
      )}

      {isLegendOpen && LAYER_GROUPS.filter((g) => isGroupActive(g, activeLayers)).map((group) => {
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
              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#e5e7eb', marginBottom: '8px' }}>
                  <span>Min Capacity</span>
                </div>
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
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
