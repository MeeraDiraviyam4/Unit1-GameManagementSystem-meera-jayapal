const KEY = "gameData";

export function loadGameData() {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    return {
      upcomingMatches: [],
      pastMatches: [],
      availability: "Evenings & weekends",
    };
  }
  return JSON.parse(raw);
}

export function saveGameData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}