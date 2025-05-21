import "./Card.scss"
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

function Card({ propertiesData }) {

    const navigate = useNavigate()
    
    function handleClick(event) {
        const cardId = event.currentTarget.id;
        const apartmentId = cardId.split('-')[1];
        console.log('you clicked on', cardId);
        if (cardId) {
          navigate(`/apartment/${apartmentId}`)
        }
        
    }

    return (
        <div id="card-container">
            {propertiesData && propertiesData.length > 0 ? (
                propertiesData.map((property) => (
                    <div
                        className="card"
                        id={"apartment-" + property.id}
                        key={property.id}
                        onClick={handleClick}
                    >
                        <img src={property.cover} alt={property.title} className="card-img" />
                        <h2 className="card-title"
                            key={property.id}>{property.title}</h2>
                    </div>
                ))
            ) : (
                <div className="loading-container">
                    <p>Chargement de nos locations...</p>
                </div>
            )
            }
        </div>
    );
}

Card.propTypes = {
    propertiesData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
            title: PropTypes.string.isRequired,
            cover: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Card;

