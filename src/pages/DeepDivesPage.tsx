import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Clock, List } from 'lucide-react';
import { deepDives, findDeepDive } from './deep-dives';
import type { DeepDive } from './deep-dives';
import TableOfContents from '../components/deepdives/TableOfContents';
import { Sources, StatGrid } from '../components/deepdives/ArticleBlocks';
import SiteFooter from '../components/SiteFooter';
import './deep-dives/deep-dives.css';

const accentStyle = (color: string) => ({ '--dd-accent': color }) as CSSProperties;

const topicHref = (id: string) => `/deep-dives?topic=${id}`;

/* ------------------------------------------------------------------ */
/*  Library: the landing view with one card per deep dive              */
/* ------------------------------------------------------------------ */

function Library() {
  useEffect(() => {
    document.title = 'Deep Dives · Canada Energy Atlas';
    return () => {
      document.title = 'Canada Energy Atlas';
    };
  }, []);

  return (
    <div className="page-container dd-page">
      <header className="dd-hero">
        <div className="dd-hero-inner">
          <span className="dd-eyebrow">Deep dives</span>
          <h1>Long reads on how the continent is powered</h1>
          <p>
            Eight explainers on the geology, infrastructure and economics behind the map. Each one links back to the
            layer it describes.
          </p>
        </div>
      </header>

      <main className="dd-library">
        <div className="dd-grid">
          {deepDives.map((dive, i) => {
            const Icon = dive.icon;
            return (
              <Link key={dive.id} to={topicHref(dive.id)} className="dd-card" style={accentStyle(dive.color)}>
                <div className="dd-card-top">
                  <span className="dd-card-icon">
                    <Icon size={22} />
                  </span>
                  <span className="dd-card-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div>
                  <div className="dd-card-kicker">{dive.kicker}</div>
                  <h2>{dive.headline}</h2>
                </div>
                <p>{dive.dek}</p>
                <div className="dd-card-meta">
                  <span>
                    <Clock size={14} /> {dive.readingMinutes} min read
                  </span>
                  <span>
                    <List size={14} /> {dive.sections.length} sections
                  </span>
                </div>
                <span className="dd-card-cta">
                  Read <ArrowUpRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Article: one deep dive with a sticky table of contents             */
/* ------------------------------------------------------------------ */

function useScrollSpy(dive: DeepDive, rootRef: RefObject<HTMLElement | null>) {
  const [activeId, setActiveId] = useState<string | null>(dive.sections[0]?.id ?? null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-dd-anchor]'));
    let frame = 0;

    const update = () => {
      frame = 0;
      // The last section whose top has scrolled past the header offset is current.
      const offset = 130;
      let current = targets[0]?.id ?? null;
      for (const el of targets) {
        if (el.getBoundingClientRect().top - offset <= 0) current = el.id;
        else break;
      }
      // At the very bottom of the page the final section (Sources) is the one in view.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && targets.length) current = targets[targets.length - 1].id;
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [dive, rootRef]);

  return activeId;
}

function Article({ dive }: { dive: DeepDive }) {
  const index = deepDives.findIndex((d) => d.id === dive.id);
  const prev = deepDives[(index - 1 + deepDives.length) % deepDives.length];
  const next = deepDives[(index + 1) % deepDives.length];
  const Icon = dive.icon;

  const bodyRef = useRef<HTMLDivElement>(null);
  const mobileTocRef = useRef<HTMLDetailsElement>(null);
  const activeId = useScrollSpy(dive, bodyRef);

  useEffect(() => {
    // Only jump to the top when the reader arrives without a section anchor.
    if (!window.location.hash) window.scrollTo({ top: 0 });
    document.title = `${dive.headline} · Canada Energy Atlas`;
    return () => {
      document.title = 'Canada Energy Atlas';
    };
  }, [dive]);

  const closeMobileToc = () => mobileTocRef.current?.removeAttribute('open');

  return (
    <div className="page-container dd-page" style={accentStyle(dive.color)}>
      <article className="dd-article">
        <nav className="dd-chapters" aria-label="Deep dive topics">
          {deepDives.map((d) => {
            const ChipIcon = d.icon;
            const active = d.id === dive.id;
            return (
              <Link
                key={d.id}
                to={topicHref(d.id)}
                className={`dd-chip ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
                style={accentStyle(d.color)}
              >
                <ChipIcon size={15} />
                {d.title}
              </Link>
            );
          })}
        </nav>

        <header className="dd-article-header">
          <Link to="/deep-dives" className="dd-back">
            <ArrowLeft size={16} /> All deep dives
          </Link>
          <div className="dd-kicker">
            <Icon size={15} /> {dive.kicker}
          </div>
          <h1 className="dd-headline">{dive.headline}</h1>
          <p className="dd-dek">{dive.dek}</p>
          <div className="dd-meta">
            <span>
              <Clock size={14} /> {dive.readingMinutes} min read
            </span>
            <span>
              <List size={14} /> {dive.sections.length} sections
            </span>
            <span>
              <BookOpen size={14} /> {dive.sources.length} sources
            </span>
          </div>
        </header>

        <div className="dd-article-stats">
          <StatGrid items={dive.stats} />
        </div>

        <div className="dd-article-layout">
          <aside className="dd-toc-col">
            <TableOfContents sections={dive.sections} activeId={activeId} />
          </aside>

          <div className="dd-body" ref={bodyRef}>
            <details className="dd-toc-mobile" ref={mobileTocRef}>
              <summary>
                On this page <List size={16} />
              </summary>
              <TableOfContents sections={dive.sections} activeId={activeId} onNavigate={closeMobileToc} />
            </details>

            {dive.sections.map((section, i) => (
              <section key={section.id} id={section.id} data-dd-anchor className="dd-section">
                <h2>
                  <span className="dd-section-num">{String(i + 1).padStart(2, '0')}</span>
                  {section.title}
                </h2>
                <div className="dd-prose">{section.body}</div>
              </section>
            ))}

            <section id="sources" data-dd-anchor className="dd-section">
              <h2>
                <span className="dd-section-num">§</span>
                Sources
              </h2>
              <Sources items={dive.sources} />
            </section>
          </div>
        </div>

        <nav className="dd-pager" aria-label="Other deep dives">
          <Link to={topicHref(prev.id)} style={accentStyle(prev.color)}>
            <span className="dd-pager-label">
              <ArrowLeft size={14} /> Previous
            </span>
            <span className="dd-pager-title">{prev.headline}</span>
            <span className="dd-pager-sub">{prev.kicker}</span>
          </Link>
          <Link to={topicHref(next.id)} className="dd-pager-next" style={accentStyle(next.color)}>
            <span className="dd-pager-label">
              Next <ArrowRight size={14} />
            </span>
            <span className="dd-pager-title">{next.headline}</span>
            <span className="dd-pager-sub">{next.kicker}</span>
          </Link>
        </nav>
      </article>

      <SiteFooter />
    </div>
  );
}

export default function DeepDivesPage() {
  const [params] = useSearchParams();
  const dive = findDeepDive(params.get('topic'));
  return dive ? <Article key={dive.id} dive={dive} /> : <Library />;
}
