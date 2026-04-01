import Button from "../UI/Button.jsx";

function GameRow({ match, onRsvp }) {
  const { id, sport, opponent, date, time, location, rsvpStatus } = match;

  return (
    <tr>
      <td>{sport}</td>
      <td>{opponent}</td>
      <td>{date}</td>
      <td>{time}</td>
      <td>{location}</td>
      <td>
        <Button
          variant={rsvpStatus === "accepted" ? "success" : "secondary"}
          onClick={() => onRsvp(id, "accepted")}
        >
          Going
        </Button>
        <Button
          variant={rsvpStatus === "declined" ? "danger" : "secondary"}
          onClick={() => onRsvp(id, "declined")}
        >
          Decline
        </Button>
      </td>
    </tr>
  );
}

export default GameRow;