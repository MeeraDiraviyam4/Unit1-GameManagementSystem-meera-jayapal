import { useState } from "react";
import Button from "../UI/Button.jsx";
import { isPlayerLoggedIn } from "../../utils/authHelpers.js";  // Import helper

function AvailabilityForm({ initialValue, onSave }) {
  const [value, setValue] = useState(initialValue || "");
  const [error, setError] = useState("");
  
  // STEP 1: Check login status
  const loggedIn = isPlayerLoggedIn();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // STEP 2: Block if not logged in
    if (!loggedIn) {
      setError("Please log in first.");
      return;
    }
        
    if (!value.trim()) {
      setError("Availability cannot be empty.");
      return;
    }
    
    setError("");
    onSave(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline">
      <label htmlFor="availability" className="visually-hidden">
        Availability
      </label>
      <input
        id="availability"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. Weeknights after 6 pm"
        disabled={!loggedIn}  // STEP 4: Disable input if not logged in
      />
      <Button 
        type="submit" 
        disabled={!loggedIn}  // STEP 5: Disable button if not logged in
      >
        {loggedIn ? "Update" : "Log in to update"}
      </Button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default AvailabilityForm;