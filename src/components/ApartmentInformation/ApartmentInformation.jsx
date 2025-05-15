import "./ApartmentInformation.scss"
import TagButton from "../TagButton/TagButton.jsx"

export default function ApartmentInformation({ propertyData }) {

    return (
        <section id="apartment-information" className="margin">
            <div className="spacing">
                <div className="appartment-title">
                    <h3 key={propertyData.id}> {propertyData.title} </h3>
                    <p className="location">{propertyData.location}</p>
                </div>
                <div className="host-information">
                    <p className="host-name">{propertyData.host.name}</p>
                    <img
                        className="host-picture"
                        src={propertyData.host.picture}
                        alt={`Photo de ${propertyData.host.name}`} />
                </div>
            </div>
            <div className="tags-rating">
                <TagButton tags={propertyData.tags} />
                <div id="rating-container">
                    {Array(5).fill().map((_, index) => (
                        <i
                            key={index}
                            className={`fa-solid fa-star fa-lg ${index < parseInt(propertyData.rating) ? 'star-active' : 'star-inactive'}`}
                            aria-label={index < parseInt(propertyData.rating) ? 'Étoile active' : 'Étoile inactive'}
                        >
                        </i>

                    ))
                    }
                </div>
            </div>
        </section >
    )
}