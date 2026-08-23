interface MapPopupContentProps {
  layerId: string;
  properties: Record<string, string | number | undefined>;
}

const rowStyle = { margin: '0 0 4px 0', fontSize: '0.8rem', color: 'var(--text-muted)' } as const;

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.replace('_', ' ').slice(1);

export default function MapPopupContent({ layerId, properties }: MapPopupContentProps) {
  const p = properties;
  return (
    <div style={{ padding: '2px', minWidth: '160px' }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', fontWeight: 600, borderBottom: '1px solid var(--border-light)', paddingBottom: '6px' }}>
        {p.Pipeline_Name || p.name || p.Name || 'Energy Asset'}
      </h3>

      {layerId.startsWith('pipelines-') ? (
        <>
          <p style={rowStyle}>
            <strong>Commodity:</strong> {p.Commodity}
          </p>
          {p.Company && p.Company !== 'Unknown' && (
            <p style={rowStyle}>
              <strong>Operator:</strong> {p.Company}
            </p>
          )}
        </>
      ) : (
        <>
          <p style={rowStyle}>
            <strong>Type:</strong> {
              (p.type === 'non-renewable' || p.type === 'nuclear' || p.type === 'renewable')
                ? `${titleCase(String(p.subtype || ''))} Power Plant`
                : `${titleCase(String(p.subtype || ''))} ${String(p.type || '').charAt(0).toUpperCase() + String(p.type || '').slice(1)}`
            }
          </p>
          {p.operator && p.operator !== 'Unknown' && (
            <p style={rowStyle}>
              <strong>Operator:</strong> {p.operator}
            </p>
          )}
          {p.capacity && p.capacity !== 'Unknown' && (
            <p style={rowStyle}>
              <strong>Capacity:</strong> {p.capacity}
            </p>
          )}
          {p.capacity_num && (layerId.startsWith('renewable-') || layerId.startsWith('nonRenewable-')) ? (
            <p style={rowStyle}>
              <strong>Powers:</strong> {Math.round(Number(p.capacity_num) * 800).toLocaleString()} Homes
            </p>
          ) : null}
          {p.status && (
            <p style={rowStyle}>
              <strong>Status:</strong> {p.status}
            </p>
          )}
          {p.description && (
            <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: '#888', fontStyle: 'italic', maxWidth: '200px' }}>
              {p.description}
            </p>
          )}
        </>
      )}
    </div>
  );
}
