import "./Error404.scss";
import { Link } from "react-router";

function Error404() {
    return (
	<section id='error-container'>
		<h1>404</h1>
		<p>Oups! La page que vous demandez n'existe pas.</p>
		<Link
			id='home-redirection'
			to='/'
		>
			Retourner sur la page d’accueil
		</Link>
	</section>
    );
}

export default Error404;
