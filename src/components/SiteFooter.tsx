import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

const FOOTER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/map', label: 'Map Dashboard' },
  { to: '/deep-dives', label: 'Deep Dives' },
  { to: '/data-sources', label: 'Data Sources' },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Globe size={24} color="var(--accent-blue)" />
          <h2>Canada Energy Atlas</h2>
        </div>
        <p>
          An interactive exploration of North America's energy architecture and resources. Built to educate and
          highlight the critical role of energy infrastructure in powering the modern world.
        </p>
        <nav className="site-footer-links" aria-label="Footer">
          {FOOTER_LINKS.map(({ to, label }) => (
            <Link key={to} to={to}>{label}</Link>
          ))}
        </nav>
        <div className="site-footer-copyright">
          &copy; {new Date().getFullYear()} Canada Energy Atlas. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
