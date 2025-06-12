import "./Footer.scss";
import logoFooter from "/logo-footer.png";
import { Link } from "react-router-dom";

/**
 * Footer component provides a consistent footer across all pages
 * Contains the Kasa logo (linked to home page) and copyright information
 * Positioned at the bottom of the page with specific styling
 *
 * @returns {JSX.Element} The rendered footer
 */

function Footer() {
	return (
		<footer id='footer-container' role="contentinfo">
			<Link to='/'>
				<img
					src={logoFooter}
					alt='Kasa Logo in Footer'
				/>
			</Link>
			<p>© 2020 Kasa. All rights reserved</p>
		</footer>
	);
}

export default Footer;
