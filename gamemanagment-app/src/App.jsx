import { Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header.jsx";
import Footer from "./components/Layout/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import PlayerDashboard from "./components/Player/PlayerDashboard.jsx";
import OrganizerDashboard from "./components/Organizer/OrganizerDashboard.jsx";
import LoginForm from "./components/LoginForm.jsx";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Login routes */}
          <Route path="/player-login" element={<LoginForm role="player" />} />
          <Route path="/organizer-login" element={<LoginForm role="organizer" />} />

          {/* Dashboards (accessible only after login) */}
          <Route path="/player" element={<PlayerDashboard />} />
          <Route path="/organizer" element={<OrganizerDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;