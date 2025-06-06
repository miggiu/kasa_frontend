import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import "./Header.scss";
import kasaLogo from "/logo.svg";


function Header({ className }) {
  const location = useLocation();

  return (
    <header id="header" className={className}>
      <div id="logo-container">
        <Link to="/">
          <img src={kasaLogo} alt="Kasa Logo" className="header-logo" />
        </Link>
      </div>

      <div id="navigation-container">
        <ul id="navigation-list">
        <Link data-testid="nav-home" className={location.pathname === "/" ? "current" : ""} to="/">
            Accueil
          </Link>
        <Link data-testid ="nav-about" className={location.pathname === "/about" ? "current" : ""} to="/about">
            A Propos
        </Link>
        </ul>
      </div>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;