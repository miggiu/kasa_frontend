import "./Card.scss";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

/**
 * Card component displays apartment/property cards in a grid layout
 * Each card shows an image and title, and is clickable to navigate to the apartment details
 *
 * @param {Array} propertiesData - Array of property objects to display as cards
 */

function Card({ propertiesData }) {
	const navigate = useNavigate();

	/**
	 * Handles click events on property cards
	 * Extracts the apartment ID from the card's ID attribute and navigates to the detail page
	 * Includes error handling for invalid or missing IDs
	 *
	 * @param {Object} event - The click event object
	 */

	function handleClick(event) {
		const cardId = event.currentTarget.id;
		const apartmentId = cardId.split("-")[1];

		// Validate the ID before navigating
		// This prevents navigation attempts with invalid IDs

		if (apartmentId && apartmentId !== "undefined") {
			navigate(`/apartment/${apartmentId}`);
		} else {
			// If ID is missing or invalid, navigate to error page
			navigate("/error");
		}
	}

	return (
		<div id='card-container'>
			{propertiesData && propertiesData.length > 0 ? (
				propertiesData.map((property) => (
					<div
						className='card'
						id={"apartment-" + property.id}
						key={property.id}
						onClick={handleClick}
					>
						<img
							src={property.cover}
							alt={property.title}
							className='card-img'
						/>
						<h2
							className='card-title'
							key={property.id}
						>
							{property.title}
						</h2>
					</div>
				))
			) : (
				// Loading state shown when data is not yet available
				<div className='loading-container'>
					<p>Chargement de nos locations...</p>
				</div>
			)}
		</div>
	);
}

// PropTypes validation ensures component receives the expected data structure
// Used as a transition to TypeScript in the future
Card.propTypes = {
	propertiesData: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			title: PropTypes.string.isRequired,
			cover: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default Card;
