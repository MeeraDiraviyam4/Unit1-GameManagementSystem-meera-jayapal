import { useState } from "react";
import Card from "../UI/Card.jsx";
import Button from "../UI/Button.jsx";
import MatchTable from "../Common/MatchTable.jsx";
import CreateMatchForm from "./CreateMatchForm.jsx";
import RecordScoreForm from "./RecordScoreForm.jsx";

function OrganizerDashboard() {
  const [matches, setMatches] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showRecord, setShowRecord] = useState(false);

  const handleCreateMatch = (match) => {
    setMatches((prev) => [...prev, { ...match, id: Date.now() }]);
    setShowCreate(false);
  };

  const handleRecordScore = (id, score, winner) => {
    setMatches((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, score, winner, completed: true } : m
      )
    );
    setShowRecord(false);
  };

  return (
    <div className="page organizer-dashboard">
      <h1>Organizer Dashboard</h1>

      <Card title="Actions">
        <Button onClick={() => setShowCreate((s) => !s)}>Create Match</Button>
        <Button
          variant="secondary"
          onClick={() => setShowRecord((s) => !s)}
        >
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