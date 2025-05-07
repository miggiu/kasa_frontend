import "./Footer.scss";
import logoFooter from "/logo-footer.png";

export default function Footer() {
  return (
    <footer id="footer-container">
      <img src={logoFooter} alt="Kasa Logo in Footer" />
      <p>© 2020 Kasa. All rights reserved</p>
    </footer>
  );
}

// todo : full size the footer 