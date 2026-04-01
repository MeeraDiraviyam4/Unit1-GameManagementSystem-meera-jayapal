import { useState } from "react";
import Button from "../UI/Button.jsx";

function RecordScoreForm({ matches, onSave }) {
  const [selectedId, setSelectedId] = useState(matches?.id ?? "");
  const [score, setScore] = useState("");
  const [winner, setWinner] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedId || !score.trim() || !winner.trim()) {
      setError("Select a match and enter score and winner.");
      return;
    }
    setError("");
    onSave(Number(selectedId), score.trim(), winner.trim());
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <label>
        Match
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {matches.map((m) => (
            <option key={m.id} value={m.id}>
              {m.sport} on {m.date} at {m.time}
            </option>
          ))}
        </select>
      </label>

      <label>
        Score
        <input
          type="text"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="e.g. 6-4, 6-3"
        />
      </label>

      <label>
        Winner
        <input
          type="text"
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
          placeholder="Player name or Team"
        />
      </label>

      <Button type="submit">Save Score</Button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default RecordScoreForm;