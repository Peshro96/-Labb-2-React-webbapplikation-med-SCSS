import { NavLink } from "react-router-dom";

// Navigeringsmeny som syns på alla sidor
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">Receptsamling</div>

      <ul className="navbar__links">
        <li>
          {/* end-prop behövs för att / inte ska matcha alla URL:er */}
          <NavLink to="/" end>
            Hem
          </NavLink>
        </li>
        <li>
          <NavLink to="/recipes">Recept</NavLink>
        </li>
        <li>
          <NavLink to="/add">Lägg till</NavLink>
        </li>
      </ul>
    </nav>
  );
}