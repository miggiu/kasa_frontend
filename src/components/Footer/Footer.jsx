import "./Footer.scss";
import logoFooter from "/logo-footer.png";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

function Footer() {
  return (
    <footer id="footer-container">
      <Link to="/">
      <img src={logoFooter} alt="Kasa Logo in Footer" />
      </Link>
      <p>© 2020 Kasa. All rights reserved</p>
    </footer>
  );
}


Footer.propTypes = {
  logoFooter: PropTypes.string,
};

export default Footer;