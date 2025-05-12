import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../index.scss";
import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div>
      <Header className="margin" />
      <section id="error-container">
        <h1>404</h1>
        <p>Oups! La page que vous demandez n'existe pas.</p>
        <Link id="home-redirection" to="/">
          Retourner sur la page d’accueil
        </Link>
      </section>
      <Footer />
    </div>
  );
}

//rename pages avec nom de fonction
