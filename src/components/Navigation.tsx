import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/map', label: 'Interactive Map' },
  { to: '/deep-dives', label: 'Deep Dives' },
  { to: '/data-sources', label: 'Data Sources' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar" aria-label="Primary">
      <div className="navbar-brand">
        <div className="navbar-logo">
          <img src="/maple-leaf.svg" alt="" width={28} height={28} />
          <Link to="/" className="navbar-title" onClick={closeMenu}>
            Canada Energy Atlas
          </Link>
        </div>
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="primary-nav-links"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div id="primary-nav-links" className={`nav-links ${isOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            {label}
          </NavLink>
        ))}

        {/* Button linking out to the AR project */}
        <a
          href="https://ar.canadaenergyatlas.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ar-btn"
          onClick={closeMenu}
        >
          Launch AR Map
        </a>
      </div>
    </nav>
  );
}
