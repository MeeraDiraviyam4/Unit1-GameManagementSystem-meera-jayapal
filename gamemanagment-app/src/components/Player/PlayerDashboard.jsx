import { useState, useEffect } from "react";
import Card from "../UI/Card.jsx";
import AvailabilityForm from "./AvailabilityForm.jsx";
import { isPlayerLoggedIn } from "../../utils/authHelpers.js";
import { loadGameData, saveGameData } from "../../utils/storage.js";

function PlayerDashboard() {
  const loggedIn = isPlayerLoggedIn();
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [availability, setAvailability] = useState("Evenings & weekends");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loggedIn) {
      const data = loadGameData();
      setUpcomingMatches(data.upcomingMatches || []);
      setPastMatches(data.pastMatches || []);
      setAvailability(data.availability || "Evenings & weekends");
      setLoading(false);
    }
  }, [loggedIn]);

  const handleRsvp = (id, status) => {
    setUpcomingMatches((prev) =>
      prev.map((match) =>
        match.id === id 
          ? { ...match, rsvpStatus: status } 
          : match
      )
    );
    
    // Save to localStorage
    const data = loadGameData();
    const updatedMatches = upcomingMatches.map((match) =>
      match.id === id 
        ? { ...match, rsvpStatus: status } 
        : match
    );
    saveGameData({ ...data, upcomingMatches: updatedMatches });
  };

  const handleAvailabilityChange = (newAvailability) => {
    setAvailability(newAvailability);
    const data = loadGameData();
    saveGameData({ ...data, availability: newAvailability });
  };

  if (!loggedIn) {
    return (
      <div className="page player-dashboard">
        <h1>Player Dashboard</h1>
        <div className="login-required">
          <p>Please <a href="/player-login">log in</a> to access your dashboard.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="page player-dashboard"><h1>Loading...</h1></div>;
  }

  return (
    <div className="page player-dashboard">
      <h1>Player Dashboard</h1>

      {/* Availability */}
      <Card title="My Availability">
        <div className="availability-section">
          <p className="current-availability">
            Current: <strong>{availability}</strong>
          </p>
          <AvailabilityForm
            initialValue={availability}
            onSave={handleAvailabilityChange}
          />
        </div>
      </Card>

      {/* Upcoming Matches with RSVP */}
      <Card title="Upcoming Matches">
        {upcomingMatches.length === 0 ? (
          <p>No upcoming matches. Check back soon!</p>
        ) : (
          <div className="upcoming-matches-table">
            <table className="matches-table">
              <thead>
                <tr>
                  <th>Sport</th>
                  <th>Opponent</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>RSVP</th>
                </tr>
              </thead>
              <tbody>
                {upcomingMatches.map((match) => (
                  <tr key={match.id} className={`match-row ${match.rsvpStatus}`}>
                    <td>{match.sport}</td>
                    <td>{match.opponent}</td>
                    <td>{match.date}</td>
                    <td>{match.time}</td>
                    <td>{match.location}</td>
                    <td className="rsvp-actions">
                      {match.rsvpStatus === "accepted" ? (
                        <span className="rsvp-status going">✅ Going</span>
                      ) : match.rsvpStatus === "denied" ? (
                        <span className="rsvp-status declined">❌ Declined</span>
                      ) : (
                        <>
                          <button
                            className="rsvp-btn going-btn"
                            onClick={() => handleRsvp(match.id, "accepted")}
                          >
                            Going
                          </button>
                          <button
                            className="rsvp-btn decline-btn"
                            onClick={() => handleRsvp(match.id, "denied")}
                          >
                            Decline
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Past Matches */}
      <Card title="Match History">
        {pastMatches.length === 0 ? (
          <p>No past matches yet.</p>
        ) : (
          <div className="match-history">
            {pastMatches.slice(0, 5).map((match) => (
              <div key={match.id} className="match-item">
                <span className="match-sport">{match.sport}:</span>
                <span className="match-players">{match.player1} vs {match.player2}</span>
                <span className="match-score">({match.score})</span>
                <span className="match-winner">→ {match.winner}</span>
              </div>
            ))}
            {pastMatches.length > 5 && (
              <p className="more-matches">+{pastMatches.length - 5} more...</p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

export default PlayerDashboard;