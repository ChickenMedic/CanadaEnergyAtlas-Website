import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import DeepDivesPage from './pages/DeepDivesPage';
import DataSourcesPage from './pages/DataSourcesPage';
import './index.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/deep-dives" element={<DeepDivesPage />} />
        <Route path="/data-sources" element={<DataSourcesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
