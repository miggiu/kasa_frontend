import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Slideshow from "../components/Slideshow/Slideshow.jsx";
import ApartmentInformation from "../components/ApartmentInformation/ApartmentInformation.jsx";
import CollapseList from "../components/Collapse/CollapseList.jsx";

import { BASE_API_URL } from "../variables.js";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

/**
 * ApartmentPage component displays detailed information about a specific apartment
 * Fetches data from API based on URL parameter and displays it with specialized components
 * Handles loading states, errors, and data organization
 *
 * @returns {JSX.Element} The complete apartment details page
 */

export default function ApartmentPage() {
	const { id } = useParams();
	const [property, setProperty] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	// Effect hook to handle error redirection
	// Redirects to error page when any API errors occur
	useEffect(() => {
		if (error) {
			navigate("/error");
		}
	}, [error, navigate]);

	// Effect hook for data fetching
	// Runs on component mount and whenever the apartment ID changes
	useEffect(() => {
		async function fetchProperty() {
			try {
				setLoading(true);
				const response = await fetch(`${BASE_API_URL}properties/${id}`);
				if (!response.ok) {
					throw new Error("Appartement non trouvé");
				}

				const data = await response.json();
				setProperty(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchProperty();
	}, [id]);

	if (loading) return <div>Chargement en cours ...</div>;
	if (!property) return <div>Appartement non trouvé</div>;

	const apartmentData = [
		{
			title: "Description",
			content: property.description,
		},
		{
			title: "Équipements",
			content: property.equipments || [],
			isArray: true,
		},
	];

	return (
		<div id='root'>
			<Header className='margin' />
			<main>
				<Slideshow propertyData={[property]} />
				<ApartmentInformation propertyData={property} />
				<CollapseList
					className={"for-apartment-page component-margin"}
					dataSource={apartmentData}
				/>
			</main>
			<Footer />
		</div>
	);
}
