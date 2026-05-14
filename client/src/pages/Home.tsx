import { Link } from "react-router-dom";

// Startsidan, hälsar besökaren välkommen och länkar vidare till recepten
export default function Home() {
  return (
    <div className="home">
      <h1 className="home__title">Receptsamling</h1>

      <p className="home__intro">
        Hitta dina favoriter, lägg till nya recept och dela med dig av dina
        bästa rätter.
      </p>

      <Link to="/recipes" className="home__cta">
        Bläddra bland recepten
      </Link>
    </div>
  );
}