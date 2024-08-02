// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './utils/useContext';

import "./App.css";
import ContactUs from "./Components/ContactUs/ContactUs";
import LandingPage from "./Components/LandingPage/LandingPage";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Signup/SignUp";
import Features from "./Components/Features/Features";
import About from "./Components/About/About";
import UserDashboard from "./Components/UserDashboard/UserDashboard";

function App() {
  return (
    <UserProvider>
      <Router>
        <Main />
      </Router>
    </UserProvider>
  );
}

function Main() {
  const location = useLocation();
  const isDashboard = location.pathname === "/userdashboard";

  return (
    <div className="app-container">
      {!isDashboard && <Navbar />} {/* Conditionally render Navbar */}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />} 
    </div>
  );
}

export default App;
