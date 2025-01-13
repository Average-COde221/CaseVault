import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignIn from './Components/SignIn';
import Login from './Components/Login';
import './styles.css'; // Importing the CSS file

const App = () => {
  return (
    <Router>
      <header className="navbar">
        <div className="navbar-brand">
          <h1>Case-Vault</h1>
        </div>
        <div className="navbar-buttons">
          <Link to="/signin" className="navbar-button">Sign In</Link>
          <Link to="/login" className="navbar-button">Login</Link>
        </div>
      </header>
      <div className="content">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
