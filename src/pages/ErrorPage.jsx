import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../index.scss";
import { Link } from "react-router";

function ErrorPage() {
  return (
    <div id="root">
      <Header className="margin" />
      <main>
      <section id="error-container">
        <h1>404</h1>
        <p>Oups! La page que vous demandez n'existe pas.</p>
        <Link id="home-redirection" to="/">
          Retourner sur la page d’accueil
        </Link>
      </section>
      <Footer />
      </main>
    </div>
  );
}


export default ErrorPage;