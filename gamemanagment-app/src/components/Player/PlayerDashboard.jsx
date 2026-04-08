import { useState } from "react";
import Card from "../UI/Card.jsx";
import AvailabilityForm from "./AvailabilityForm.jsx";
import MatchHistory from "../Common/MatchHistory.jsx";
import { isPlayerLoggedIn } from "../../utils/authHelpers.js";
import { loadGameData, saveGameData } from "../../utils/storage.js";

function PlayerDashboard() {
  const loggedIn = isPlayerLoggedIn();
  const data = loadGameData();

  const [availability, setAvailability] = useState(data.availability);
  const [pastMatches] = useState(data.pastMatches);

  const handleAvailabilityChange = (newAvailability) => {
    setAvailability(newAvailability);
    const current = loadGameData();
    saveGameData({ ...current, availability: newAvailability });
  };

  if (!loggedIn) {
    return (
      <div className="page player-dashboard">
        <h1>Player Dashboard</h1>
        <p>Please <a href="/player-login">log in</a> to access your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="page player-dashboard">
      <h1>Player Dashboard</h1>

      <Card title="My Availability">
        <p>Current: {availability}</p>
        <AvailabilityForm
          initialValue={availability}
          onSave={handleAvailabilityChange}
        />
      </Card>

      <Card title="Match History">
        <MatchHistory matches={pastMatches} />
      </Card>
    </div>
  );
}

export default PlayerDashboard;