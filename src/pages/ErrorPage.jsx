import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Error404 from "../components/Error404/Error404.jsx";

/**
 * ErrorPage component serves as the 404 Not Found page for the application
 * Provides a consistent layout with header and footer around the error message
 * Used when users navigate to non-existent routes or when resources can't be found
 *
 * @returns {JSX.Element} The complete error page with standard layout
 */

function ErrorPage() {
	return (
		<div id='root'>
			<Header className='margin' />
			<main>
				<Error404 />
			</main>
			<Footer />
		</div>
	);
}

export default ErrorPage;
