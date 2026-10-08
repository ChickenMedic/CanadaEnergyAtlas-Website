import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';

// Every route except Home is code-split so the landing page doesn't pay for
// MapLibre (~1 MB) or the long-form Deep Dives content up front.
const MapPage = lazy(() => import('./pages/MapPage'));
const DeepDivesPage = lazy(() => import('./pages/DeepDivesPage'));
const DataSourcesPage = lazy(() => import('./pages/DataSourcesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function RouteFallback() {
  return <div className="route-fallback">Loading…</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/deep-dives" element={<DeepDivesPage />} />
          <Route path="/data-sources" element={<DataSourcesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
