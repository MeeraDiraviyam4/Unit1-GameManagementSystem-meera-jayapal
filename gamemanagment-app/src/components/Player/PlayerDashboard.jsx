import { useState } from "react";
import Card from "../UI/Card.jsx";
import UpcomingGamesList from "./UpcomingGamesList.jsx";
import AvailabilityForm from "./AvailabilityForm.jsx";
import MatchHistory from "../Common/MatchHistory.jsx";
import {
  upcomingMatches as initialUpcoming,
  pastMatches,
} from "../../data/mockData.js";

function PlayerDashboard() {
  const [upcoming, setUpcoming] = useState(initialUpcoming);
  const [availability, setAvailability] = useState("Evenings & weekends");

  const handleRsvp = (id, status) => {
    setUpcoming((prev) =>
      prev.map((match) =>
        match.id === id ? { ...match, rsvpStatus: status } : match
      )
    );
  };

  const handleAvailabilityChange = (newAvailability) => {
    setAvailability(newAvailability);
  };

  return (
    <div className="page player-dashboard">
      <h1>Player Dashboard</h1>

      <Card title="Next Games">
        <UpcomingGamesList matches={upcoming} onRsvp={handleRsvp} />
      </Card>

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