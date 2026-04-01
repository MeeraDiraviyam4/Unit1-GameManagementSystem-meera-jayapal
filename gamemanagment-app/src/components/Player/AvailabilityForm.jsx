import { useState } from "react";
import Button from "../UI/Button.jsx";

function AvailabilityForm({ initialValue, onSave }) {
  const [value, setValue] = useState(initialValue || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
      />
      <Button type="submit">Update</Button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default AvailabilityForm;