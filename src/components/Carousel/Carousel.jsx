import "./Carousel.scss";

import { useState } from "react";
import leftArrow from "/arrow-back.png"
import rightArrow from "/arrow-forward.png"


export default function Carousel({ propertyData }) {

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
        <section id="apartment-page">
            <div className="carousel-container">
                <div className="carousel-images">
                    <img
                        src={property.pictures[currentIndex]}
                        alt={`${property.title} - Image ${currentIndex + 1}`}
                    />

                    {totalImages > 1 && (
                        <>
                            <button className="arrow left-arrow" onClick={prevSlide}>
                                <img src={leftArrow} alt="Précédent" />
                            </button>

                            <button className="arrow right-arrow" onClick={nextSlide}>
                                <img src={rightArrow} alt="Suivant" />
                            </button>

                            <div className="image-counter">
                                {currentIndex + 1}/{totalImages}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}