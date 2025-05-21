import "./ApartmentInformation.scss"
import PropTypes from "prop-types"
import TagButton from "../TagButton/TagButton.jsx"

function ApartmentInformation({ propertyData }) {

    return (
        <section id="apartment-information" className="component-margin">
            <div className="spacing">
                <div className="appartment-title">
                    <h3 key={propertyData.id}> {propertyData.title} </h3>
                    <p className="location">{propertyData.location}</p>
                </div>
                <div className="host-information host-desktop">
                    <p className="host-name">{propertyData.host.name}</p>
                    <img
                        className="host-picture"
                        src={propertyData.host.picture}
                        alt={`Photo de ${propertyData.host.name}`} />
                </div>
            </div>
            <div className="tags-rating">
                <TagButton tags={propertyData.tags} />
                 <div className="mobile-spacing">
                <div id="rating-container">
                    {Array(5).fill().map((_, index) => (
                        <i
                            key={index}
                            className={`fa-solid fa-star star ${index < parseInt(propertyData.rating) ? 'star-active' : 'star-inactive'}`}
                            aria-label={index < parseInt(propertyData.rating) ? 'Étoile active' : 'Étoile inactive'}
                        >
                        </i>

                    ))
                    }
                </div>
                  <div className="host-information-mobile host-mobile">
                    <p className="host-name">{propertyData.host.name}</p>
                    <img
                        className="host-picture"
                        src={propertyData.host.picture}
                        alt={`Photo de ${propertyData.host.name}`} />
                </div>
                </div>
            </div>
        </section >
    )
}

ApartmentInformation.propTypes = {
    propertyData: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        host: PropTypes.shape({
            name: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired
        }).isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        rating: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
    }).isRequired
}

export default ApartmentInformation