import { useState } from "react";
import Card from "../UI/Card.jsx";
import Button from "../UI/Button.jsx";
import MatchTable from "../Common/MatchTable.jsx";
import CreateMatchForm from "./CreateMatchForm.jsx";
import RecordScoreForm from "./RecordScoreForm.jsx";
import { isOrganizerLoggedIn } from "../../utils/authHelpers.js";
import { loadGameData, saveGameData } from "../../utils/storage.js";

function OrganizerDashboard() {
  const loggedIn = isOrganizerLoggedIn();
  const data = loadGameData();

  const [matches, setMatches] = useState(data.upcomingMatches);
  const [showCreate, setShowCreate] = useState(false);
  const [showRecord, setShowRecord] = useState(false);

  const handleCreateMatch = (match) => {
    const newMatch = { ...match, id: Date.now(), score: "", winner: "" };
    const updated = [...matches, newMatch];
    setMatches(updated);

    const current = loadGameData();
    saveGameData({ ...current, upcomingMatches: updated });
    setShowCreate(false);
  };

  const handleRecordScore = (id, score, winner) => {
    const updated = matches.map((m) =>
      m.id === id ? { ...m, score, winner, completed: true } : m
    );
    setMatches(updated);

    const current = loadGameData();
    saveGameData({ ...current, upcomingMatches: updated });
    setShowRecord(false);
  };

  if (!loggedIn) {
    return (
      <div className="page organizer-dashboard">
        <h1>Organizer Dashboard</h1>
        <p>Please <a href="/organizer-login">log in</a> to access your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="page organizer-dashboard">
      <h1>Organizer Dashboard</h1>

      <Card title="Actions">
        <Button onClick={() => setShowCreate((s) => !s)}>Create Match</Button>
        <Button variant="secondary" onClick={() => setShowRecord((s) => !s)}>
          Record Scores
        </Button>
      </Card>

      {showCreate && (
        <Card title="New Match">
          <CreateMatchForm onCreate={handleCreateMatch} />
        </Card>
      )}

      {showRecord && matches.length > 0 && (
        <Card title="Record Score">
          <RecordScoreForm matches={matches} onSave={handleRecordScore} />
        </Card>
      )}

      <Card title="All Matches">
        <MatchTable matches={matches} />
      </Card>
    </div>
  );
}

export default OrganizerDashboard;