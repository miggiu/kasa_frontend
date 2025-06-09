import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import "./Header.scss";
import kasaLogo from "/logo.svg";

/**
 * Header component provides consistent navigation across all pages
 * Contains the Kasa logo (linked to home page) and navigation links
 * Handles active link styling based on current route
 *
 * @param {string} className - Optional CSS class for additional styling
 * @returns {JSX.Element} The rendered header with navigation
 */

function Header({ className }) {
	const location = useLocation();

	return (
		<header
			id='header'
			className={className}
		>
			<div id='logo-container'>
				<Link to='/'>
					<img
						src={kasaLogo}
						alt='Kasa Logo'
						className='header-logo'
					/>
				</Link>
			</div>

			<div id='navigation-container'>
				<ul id='navigation-list'>
					{/* Home link with conditional 'current' class applied when on home page */}
					{/* data-testid attribute is used for targeting in automated tests */}
					<Link
						data-testid='nav-home'
						className={location.pathname === "/" ? "current" : ""}
						to='/'
					>
						Accueil
					</Link>
					{/* About link with conditional 'current' class applied when on about page */}
					{/* data-testid attribute is used for targeting in automated tests */}
					<Link
						data-testid='nav-about'
						className={location.pathname === "/about" ? "current" : ""}
						to='/about'
					>
						A Propos
					</Link>
				</ul>
			</div>
		</header>
	);
}

// PropTypes validation ensures component receives the expected data structure
// Used as a transition to TypeScript in the future
Header.propTypes = {
	className: PropTypes.string,
};

export default Header;
