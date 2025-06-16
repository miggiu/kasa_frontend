import Header from "../components/Header/Header.jsx";
import Banner from "../components/Banner/Banner.jsx";
import CollapseList from "../components/Collapse/CollapseList.jsx";
import aboutCollapseData from "../components/Collapse/collapse-data.js";
import Footer from "../components/Footer/Footer.jsx";

import "../index.scss";

/**
 * AboutPage component renders the "À Propos" (About) page of the application
 * This page displays company values at the moment 
 * Uses a banner image and collapsible sections for information organization
 *
 * @returns {JSX.Element} The complete About page
 */

export default function AboutPage() {
	return (
		<div
			id='root'
			data-testid='about-page'
		>
			<Header className='margin' />
			<main>
				<section id='about-container'>
					<Banner
						image='./about-banner.webp'
						alt="About page banner, mountains landscape"
						className='margin'
					/>
					<CollapseList
						dataSource={aboutCollapseData}
						className='margin collapse-margin'
					/>
				</section>
			</main>
			<Footer />
		</div>
	);
}
