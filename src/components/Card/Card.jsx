import "./Card.scss"

export default function Card({ propertiesData }) {

    function handleClick(event) {
        const cardId = event.currentTarget.id;
       console.log('you clicked on', cardId);
       window.open(`${BASE_API_URL}properties/` + cardId)
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

