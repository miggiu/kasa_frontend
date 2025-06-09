import "./Slideshow.scss";

import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";

import leftArrow from "/arrow-back.svg";
import rightArrow from "/arrow-forward.svg";

/**
 * Slideshow component displays a carousel of property images
 * Features navigation arrows, image counter, and responsive behavior
 *
 * @param {Array} propertyData - Array containing property information including images
 * @returns {JSX.Element} The rendered slideshow
 */

function Slideshow({ propertyData }) {
	// State to track the currently displayed image index
	const [currentIndex, setCurrentIndex] = useState(0);
	// State to track if the device is in mobile viewport
	const [isMobile, setIsMobile] = useState(false);

	/**
	 * Effect hook to handle responsive design behavior
	 * Sets isMobile state based on viewport width and adds resize listener
	 */
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.matchMedia("(max-width: 767px)").matches);
		};

		// Initial check on component mount
		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	// If propertyData is empty or undefined, show loading state
	if (!propertyData || propertyData.length === 0) {
		return (
			<div className='loading-container'>
				<p>Chargement de la location...</p>
			</div>
		);
	}

	// If propertyData is not an array or has no items, show error state
	const property = propertyData[0];

	if (!property.pictures || property.pictures.length === 0) {
		return (
			<div className='no-images'>
				<p>Aucune image disponible</p>
			</div>
		);
	}

	// Store total number of images for navigation and counter display
	const totalImages = property.pictures.length;

	/**
	 * Advances to the next image in the slideshow
	 * Loops back to the first image after reaching the end
	 */
	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === totalImages - 1 ? 0 : prevIndex + 1
		);
	};

	/**
	 * Goes to the previous image in the slideshow
	 * Loops to the last image when at the first image
	 */
	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? totalImages - 1 : prevIndex - 1
		);
	};

	return (
		<section
			id='apartment-page'
			className='margin'
		>
			<div className='slideshow-container'>
				<div className='slideshow-images'>
					<img
						id='apt-pictures'
						src={property.pictures[currentIndex]}
						alt={`${property.title} - Image ${currentIndex + 1}`}
					/>

					{totalImages > 1 && (
						<>
							<div className='arrows'>
								<button
									className='arrow left-arrow'
									onClick={prevSlide}
								>
									<img
										src={leftArrow}
										alt='Précédent'
									/>
								</button>

								<button
									className='arrow right-arrow'
									onClick={nextSlide}
								>
									<img
										src={rightArrow}
										alt='Suivant'
									/>
								</button>
								{!isMobile && totalImages > 1 && (
									<div className='image-counter'>
										{currentIndex + 1}/{totalImages}
									</div>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
}

// PropTypes validation ensures component receives the expected data structure
// Used as a transition to TypeScript in the future
Slideshow.propTypes = {
	propertyData: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
		})
	).isRequired,
};

export default Slideshow;
