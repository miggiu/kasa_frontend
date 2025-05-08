import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import kasaLogo from "/logo.png";


export default function Header() {
  const location = useLocation();

  return (
    <header id="header">
      <div id="header-logo">
        <img src={kasaLogo} alt="Kasa Logo" />
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


