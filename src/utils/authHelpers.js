export const isPlayerLoggedIn = () => {
  try {
    const authData = localStorage.getItem("playerAuth");
    if (!authData) return false;
    
    const auth = JSON.parse(authData);
    return auth && auth.role === "player";
  } catch (error) {
    console.error("Error checking player login:", error);
    return false;
  }
};

// Helper for Organizer login check  
export const isOrganizerLoggedIn = () => {
  try {
    const authData = localStorage.getItem("organizerAuth");
    if (!authData) return false;
    
    const auth = JSON.parse(authData);
    return auth && auth.role === "organizer";
  } catch (error) {
    console.error("Error checking organizer login:", error);
    return false;
  }
};

// Helper to get current user loginId (for both roles)
export const getCurrentUser = () => {
  const playerAuth = localStorage.getItem("playerAuth");
  const organizerAuth = localStorage.getItem("organizerAuth");
  
  if (playerAuth) {
    try {
      return JSON.parse(playerAuth);
    } catch {}
  }
  
  if (organizerAuth) {
    try {
      return JSON.parse(organizerAuth);
    } catch {}
  }
  
  return null;
};