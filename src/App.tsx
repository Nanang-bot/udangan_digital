import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Invitation from './pages/Invitation';
import Admin from './pages/Admin';
import { invitationData as defaultData } from './config/invitationData';
import { useEffect, useState } from 'react';
import { storage } from './utils/storage';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [data, setData] = useState(defaultData);

  const loadData = () => {
    const savedData = storage.getInvitationData(defaultData);
    setData(savedData);
  };

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Initial load
    loadData();

    // Listen for storage changes (for multiple tabs)
    window.addEventListener('storage', loadData);
    
    // Custom event for same-tab changes
    window.addEventListener('invitationDataChanged', loadData);

    return () => {
      window.removeEventListener('storage', loadData);
      window.removeEventListener('invitationDataChanged', loadData);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Invitation data={data} />} />
        <Route path="/admin" element={<Admin onDataChange={loadData} />} />
      </Routes>
    </Router>
  );
}

export default App;
