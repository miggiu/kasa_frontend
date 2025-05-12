import "./Carousel.scss";

export default function Carousel({ propertiesData }) {
    return (
        <div className="carousel-container">
            {propertiesData && propertiesData.length > 0 ? (
                propertiesData.map((property) => (
                    <div className="carousel-images">
                        <img key={property.index} src={property.picture} />
                    </div>
                ))
            ) : (
                <div className="loading-container">
                    <p>Chargement de la location...</p>
                </div>
            )
            }
        </div>
    )
}
