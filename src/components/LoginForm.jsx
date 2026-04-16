import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ role }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loginId || !password) {
      setError("Please enter both login ID and password.");
      return;
    }

    const userData = { loginId, role };

    if (role === "player") {
      localStorage.setItem("playerAuth", JSON.stringify(userData));
      navigate("/player");
    } else {
      localStorage.setItem("organizerAuth", JSON.stringify(userData));
      navigate("/organizer");
    }

    setLoginId("");
    setPassword("");
    setError("");
  };

  return (
    <div 
      className="login-page"
      style={{
        backgroundImage: role === "player" 
          ? "url('/images/Tennis3.jpeg')" 
          : "url('/images/Pick1.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}
    >
      <div className="login-overlay"></div>
      
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{role === "player" ? "Player Login" : "Organizer Login"}</h2>

        <input
          type="text"
          placeholder="Login ID"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}