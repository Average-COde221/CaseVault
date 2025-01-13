import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import UploadCase from './UploadCase';
import './UploadCase.css';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className="grid-container">
        {/* Header and Sidebar are constant across all routes */}
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

        {/* Main content changes based on the route */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Default route */}
            <Route path="/UploadCase.jsx" element={<UploadCase />} /> {/* UploadCase route */}
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
