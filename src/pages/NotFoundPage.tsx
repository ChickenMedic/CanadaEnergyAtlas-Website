import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SiteFooter from '../components/SiteFooter';

export default function NotFoundPage() {
  return (
    <div className="page-container" style={{ overflowY: 'auto' }}>
      <PageHero title="Page not found" subtitle="That address doesn't match anything in the atlas." />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 20px 80px' }}>
        <Link to="/" className="primary-btn">Back to Home</Link>
      </div>
      <SiteFooter />
    </div>
  );
}
