import "./Footer.scss";
import logoFooter from "/logo-footer.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="footer-container">
      <Link to="/">
      <img src={logoFooter} alt="Kasa Logo in Footer" />
      </Link>
      <p>© 2020 Kasa. All rights reserved</p>
    </footer>
  );
}
