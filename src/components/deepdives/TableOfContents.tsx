import type { DeepDiveSection } from '../../pages/deep-dives/types';

interface TableOfContentsProps {
  sections: DeepDiveSection[];
  activeId: string | null;
  onNavigate?: () => void;
}

export default function TableOfContents({ sections, activeId, onNavigate }: TableOfContentsProps) {
  return (
    <nav className="dd-toc" aria-label="On this page">
      <div className="dd-toc-heading">On this page</div>
      <ol>
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={activeId === s.id ? 'active' : undefined}
              aria-current={activeId === s.id ? 'location' : undefined}
              onClick={onNavigate}
            >
              <span className="dd-toc-num">{String(i + 1).padStart(2, '0')}</span>
              <span>{s.title}</span>
            </a>
          </li>
        ))}
        <li>
          <a href="#sources" className={activeId === 'sources' ? 'active' : undefined} onClick={onNavigate}>
            <span className="dd-toc-num">§</span>
            <span>Sources</span>
          </a>
        </li>
      </ol>
    </nav>
  );
}
