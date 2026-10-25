import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import Workflow from "./components/Workflow";
import TrustSection from "./components/TrustSection";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import DigitalLocker from "./pages/DigitalLocker";
import Certificates from "./pages/Certificates";
import Projects from "./pages/Projects";
import Internships from "./pages/Internships";
import Achievements from "./pages/Achievements";
import AlumniNetwork from "./pages/AlumniNetwork";

import CommitteeDashboard from "./pages/committee/CommitteeDashboard";
import CommitteeStudents from "./pages/committee/CommitteeStudents";
import CommitteeDocuments from "./pages/committee/CommitteeDocuments";
import PlacementDashboard from "./pages/placement/PlacementDashboard";
import PublicVerify from "./pages/PublicVerify";
import PublicStudentProfile from "./pages/PublicStudentProfile";



import Dashboard from "./pages/Dashboard";

function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="w-full pt-20">
        <Hero />
        <Stats />
        <Features />
        <Workflow />
        <TrustSection />
        <CTA />
      </main>

      <Footer />
    </>
  );
}


function App() {
  return (
    <Routes>

      {/* Landing Page */}
      <Route
        path="/"
        element={<LandingPage />}
      />

      {/* Login Page */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Register Page */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* dashboard Page */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* Profile Page */}
      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/digital-locker"
        element={<DigitalLocker />}
      />

      <Route
        path="/certificates"
        element={<Certificates />}
      />

      <Route
        path="/projects"
        element={<Projects />}
      />

      <Route
        path="/internships"
        element={<Internships />}
      />

      <Route
        path="/achievements"
        element={<Achievements />}
      />

      <Route
  path="/committee/dashboard"
  element={<CommitteeDashboard />}
/>

<Route
  path="/committee/students"
  element={<CommitteeStudents />}
/>

      <Route
        path="/committee/documents"
        element={<CommitteeDocuments />}
      />

      <Route
        path="/placement/dashboard"
        element={<PlacementDashboard />}
      />

      <Route
        path="/alumni-network"
        element={<AlumniNetwork />}
      />

      <Route
        path="/verify"
        element={<PublicVerify />}
      />

      <Route
        path="/verify/:code"
        element={<PublicVerify />}
      />

      <Route
        path="/student/:id"
        element={<PublicStudentProfile />}
      />

      <Route
        path="/candidate/:id"
        element={<PublicStudentProfile />}
      />

    </Routes>
  );
}

export default App;


