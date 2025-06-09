import Header from "../components/Header/Header.jsx";
import Banner from "../components/Banner/Banner.jsx";
import Card from "../components/Card/Card.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../variables.js";

/**
 * HomePage component renders the main landing page of the application
 * Fetches property listings from API and displays them in a grid
 * Includes a hero banner with tagline and standard page layout
 *
 * @returns {JSX.Element} The complete home page
 */

function HomePage() {
	// State to store the fetched property listings
	const [propertiesData, setPropertiesData] = useState([]);

	// Effect hook to scroll to top when component mounts
	// Ensures consistent user experience when navigating back to home
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Effect hook for data fetching
	// Runs once on component mount to load property listings
	useEffect(() => {
		fetch(`${BASE_API_URL}properties`)
			.then((response) => response.json())
			.then((data) => {
				setPropertiesData(data);
				console.log(data);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<div
			id='root'
			data-testid='home-page'
		>
			<Header className='margin' />
			<main>
				<Banner
					className='margin'
					image='./title-card-background.jpg'
					title={
						<>
							Chez vous,<span className='comma'> partout et ailleurs</span>
						</>
					}
				/>
				<section
					id='global-cards-container'
					className='margin'
				>
					<Card propertiesData={propertiesData.slice(0, 6)} />
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default HomePage;
