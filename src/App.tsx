import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Invitation from './pages/Invitation';
import Admin from './pages/Admin';
import { invitationData } from './config/invitationData';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Invitation data={invitationData} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
