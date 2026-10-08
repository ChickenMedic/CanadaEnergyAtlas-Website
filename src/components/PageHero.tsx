interface PageHeroProps {
  title: string;
  subtitle: string;
}

// Compact hero used by the secondary pages (Deep Dives, Data Sources, 404).
export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <div className="hero-section page-hero">
      <h1 className="hero-title">{title}</h1>
      <p className="hero-subtitle">{subtitle}</p>
    </div>
  );
}
