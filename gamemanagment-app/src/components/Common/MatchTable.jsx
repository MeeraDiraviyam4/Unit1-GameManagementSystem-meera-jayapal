function MatchTable({ matches }) {
  if (!matches.length) return <p>No matches yet.</p>;

  return (
    <table className="match-table">
      <thead>
        <tr>
          <th>Sport</th>
          <th>Date</th>
          <th>Time</th>
          <th>Location</th>
          <th>Score</th>
          <th>Winner</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((m) => (
          <tr key={m.id}>
            <td>{m.sport}</td>
            <td>{m.date}</td>
            <td>{m.time}</td>
            <td>{m.location}</td>
            <td>{m.score || "-"}</td>
            <td>{m.winner || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MatchTable;