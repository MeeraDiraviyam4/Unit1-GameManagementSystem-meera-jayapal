function MatchHistory({ matches }) {
  return (
    <ul className="history-list">
      {matches.map((m) => (
        <li key={m.id} className="history-item">
          <span>{m.sport} vs {m.opponent}</span>
          <span>{m.score}</span>
          <span className={m.result === "Win" ? "badge-win" : "badge-loss"}>
            {m.result}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default MatchHistory;