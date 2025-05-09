import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import kasaLogo from "/logo.png";


export default function Header({ className }) {
  const location = useLocation();

  return (
    <header id="header" className={className}>
      <div id="header-logo">
        <Link to="/">
          <img src={kasaLogo} alt="Kasa Logo" />
        </Link>
      </div>

      <div id="navigation-container">
        <ul id="navigation-list">
        <Link className={location.pathname === "/" ? "current" : ""} to="/">
            Accueil
          </Link>
        <Link className={location.pathname === "/about" ? "current" : ""} to="/about">
            A Propos
        </Link>
        </ul>
      </div>
    </header>
  );
}


