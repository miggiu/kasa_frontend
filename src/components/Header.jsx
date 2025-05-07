import "./Header.scss";
import kasaLogo from "/logo.png";

export default function Header() {
  return (
    <header id="header">
      <div id="header-logo">
        <img src={kasaLogo} alt="Kasa Logo" />
      </div>

      <div id="navigation">
        <p>Accueil</p>
        <p>A Propos</p>
      </div>
    </header>
  );
}

// function ifCurrent() {
//   document.querySelectorAll("a").forEach((link) => {
//     if (link.href === window.location.href) {
//       link.classList.add("current");
//     }
//   });
// }
