export function seedGameData() {
  if (!localStorage.getItem("gameData")) {
    localStorage.setItem("gameData", JSON.stringify(initialData));
  }
}

const initialData = {
  upcomingMatches: [
    { id: 1, sport: "Tennis", opponent: "Ganesh", date: "04-06-2026", time: "18:00", location: "Vlasis Park", rsvpStatus: "none" },
    { id: 2, sport: "Pickleball", opponent: "Bala", date: "04-06-2026", time: "10:30", location: "Ballwin Pointe", rsvpStatus: "accepted" },
    { id: 3, sport: "Tennis", opponent: "Ravi", date: "04-08-2026", time: "16:00", location: "Chesterfield Courts", rsvpStatus: "denied" }
  ],
  pastMatches: [
    { id: 101, sport: "Tennis", player1: "Meera", player2: "Shan", score: "6-4, 6-3", winner: "Shan" },
    { id: 102, sport: "Pickleball", player1: "Karthik", player2: "Gokul", score: "11-9, 10-12, 11-7", winner: "Karthik" },
    { id: 103, sport: "Tennis", player1: "Ravi", player2: "Raam", score: "6-2, 7-5", winner: "Ravi" },
    { id: 104, sport: "Pickleball", player1: "Meera", player2: "Priya", score: "11-8, 12-10", winner: "Meera" },
    { id: 105, sport: "Tennis", player1: "Ganesh", player2: "Karthik", score: "4-6, 6-7", winner: "Karthik" }
  ],
  availability: "Evenings & weekends",
};

