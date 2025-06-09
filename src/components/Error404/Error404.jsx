import "./Error404.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Error404 component displays a standardized error page when users navigate
 * to non-existent routes or when resources cannot be found.
 * It includes a prominent 404 error code, a customizable error message,
 * and a link to return to the home page.
 *
 * @param {string} errorMessage - Optional custom error message
 * @param {string} linkText - Optional custom text for the home page link
 * @returns {JSX.Element} The rendered error page
 */

function Error404({ 
  errorMessage = "Oups! La page que vous demandez n'existe pas.",
  linkText = "Retourner sur la page d'accueil" 
}) {
    return (
	<section id='error-container'>
		<h1>404</h1>
		<p>{errorMessage}</p>
		<Link
			data-testid='home-redirection'
			id='home-redirection'
			to='/'
		>
			{linkText}
		</Link>
	</section>
    );
}

// PropTypes validation ensures component receives the expected data structure
// Used as a transition to TypeScript in the future
Error404.propTypes = {
    errorMessage: PropTypes.string,
    linkText: PropTypes.string
};

export default Error404;
