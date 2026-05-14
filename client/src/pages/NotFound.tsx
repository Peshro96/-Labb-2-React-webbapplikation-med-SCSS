import { Link } from "react-router-dom";

// Visas när URL:en inte matchar någon route
export default function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__code">404</h1>
      <p className="not-found__text">Sidan du letar efter finns inte.</p>

      <Link to="/" className="not-found__link">
        Tillbaka till startsidan
      </Link>
    </div>
  );
}