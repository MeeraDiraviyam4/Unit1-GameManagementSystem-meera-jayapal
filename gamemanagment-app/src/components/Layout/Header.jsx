import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <nav className="nav">
        <h1 className="logo">Game Management System</h1>
        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
             <NavLink to="/player-login">Player Login</NavLink>
          </li>
          <li>
           <NavLink to="/organizer-login">Organizer Login</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;