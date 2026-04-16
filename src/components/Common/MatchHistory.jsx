function MatchHistory({ matches }) {
  return (
    <ul className="history-list">
      {matches.map((m) => (
        <li key={m.id} className="history-item">
          <span className="match-line">
            {m.sport}: {m.player1} vs {m.player2} - {m.score}. Winner: {m.winner}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default MatchHistory;