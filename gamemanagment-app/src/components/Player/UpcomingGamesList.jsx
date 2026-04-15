import GameRow from "./GameRow.jsx";

function UpcomingGamesList({ matches, onRsvp }) {
  if (!matches.length) {
    return <p>No upcoming games. Check back soon!</p>;
  }

  return (
    <table className="match-table">
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
        {matches.map((match) => (
          <GameRow key={match.id} match={match} onRsvp={onRsvp}
           players={`${match.player1} vs ${match.player2}`}/>
        ))}
      </tbody>
    </table>
  );
}

export default UpcomingGamesList;