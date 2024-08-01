import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import ContactUs from "./Components/ContactUs/ContactUs";
import LandingPage from "./Components/LandingPage/LandingPage";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import SignIn from "./Components/Signup/SignUp";
import Features from "./Components/Features/Features";
import About from "./Components/About/About";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import SignUp from "./Components/Signup/SignUp";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const isDashboard = location.pathname === "/userdashboard";
  const [userId, setUserId] = useState(null);

  const handleSignUpSuccess = (userId) => {
    setUserId(userId);
  };

  return (
    <div>
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/userdashboard"
          element={
            userId ? (
              <UserDashboard userId={userId} />
            ) : (
              <SignUp onSignUpSuccess={handleSignUpSuccess} />
            )
          }
        />
      </Routes>
      {!isDashboard && <Footer />}
    </div>
  );
}

export default App;
