import { useState } from "react";
import Button from "../UI/Button.jsx";

function CreateMatchForm({ onCreate }) {
  const [form, setForm] = useState({
    sport: "Tennis",
    date: "",
    time: "",
    location: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.time || !form.location.trim()) {
      setError("Please fill out date, time, and location.");
      return;
    }
    setError("");
    onCreate(form);
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <label>
        Sport
        <select name="sport" value={form.sport} onChange={handleChange}>
          <option value="Tennis">Tennis</option>
          <option value="Pickleball">Pickleball</option>
        </select>
      </label>

      <label>
        Date
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
      </label>

      <label>
        Time
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />
      </label>

      <label>
        Location
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
        />
      </label>

      <Button type="submit">Create</Button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default CreateMatchForm;