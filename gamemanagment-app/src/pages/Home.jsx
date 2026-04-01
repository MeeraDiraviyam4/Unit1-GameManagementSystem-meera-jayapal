import { Link } from "react-router-dom";
import Button from "../components/UI/Button.jsx";

function Home() {
  return (
    <section className="home-hero">
      <div>
        <h2>Organize tennis & pickleball</h2>
        <p>RSVP, track scores, and manage tournaments.</p>
        <div className="hero-actions">
          <Link to="/player">
            <Button>Player Dashboard</Button>
          </Link>
          <Link to="/organizer">
            <Button variant="secondary">Organizer Dashboard</Button>
          </Link>
        </div>
      </div>
      
    </section>
  );
}

export default Home;