import "./Slideshow.scss";

import { useState } from "react";
import PropTypes from "prop-types";

import leftArrow from "/arrow-back.svg"
import rightArrow from "/arrow-forward.svg"


function Slideshow({ propertyData }) {

    const [currentIndex, setCurrentIndex] = useState(0);

    if (!propertyData || propertyData.length === 0) {
        return (
            <div className="loading-container">
                <p>Chargement de la location...</p>
            </div>
        );
    }

    const property = propertyData[0];

    if (!property.pictures || property.pictures.length === 0) {
        return (
            <div className="no-images">
                <p>Aucune image disponible</p>
            </div>
        );
    }

    const totalImages = property.pictures.length;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === totalImages - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? totalImages - 1 : prevIndex - 1
        );
    };

    return (
        <section id="apartment-page" className="margin">
            <div className="slideshow-container">
                <div className="slideshow-images">
                    <img
                        id="apt-pictures"
                        src={property.pictures[currentIndex]}
                        alt={`${property.title} - Image ${currentIndex + 1}`}
                    />

                    {totalImages > 1 && (
                        <>
                            <div className="arrows">
                                <button className="arrow left-arrow" onClick={prevSlide}>
                                    <img src={leftArrow} alt="Précédent" />
                                </button>

                                <button className="arrow right-arrow" onClick={nextSlide}>
                                    <img src={rightArrow} alt="Suivant" />
                                </button>

                                <div className="image-counter">
                                    {currentIndex + 1}/{totalImages}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}


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