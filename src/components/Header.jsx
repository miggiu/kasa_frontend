import kasaLogo from '../assets/logo.svg';
function Header() {
  return (
    <header className="bg-gray-800 text-black p-4">
      <svg src={kasaLogo} alt="Kasa Logo"/>
      <p>Accueil</p>
      <p>A Propos</p>
    </header>
  );
}

export default Header;