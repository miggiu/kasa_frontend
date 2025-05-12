import "./ApartmentInformation.scss"

export default function ApartmentInformation({ propertyData }) {
    return (
        <section id="apartment-information">
            <h3 key={propertyData.id}> {propertyData.title} </h3>
            <p>{propertyData.location}</p>
            <div className="host-information">
                <p>{propertyData.host.name}</p>
                <img
                    src={propertyData.host.picture}
                    alt={`Photo de ${propertyData.host.name}`} />
                <div id="tag-container">
                    {propertyData.tags && propertyData.tags.length > 0 ? (
                        propertyData.tags.map((tags, index) => (
                            <div key={index} className="tag-item">
                                <p>{tags}</p>
                            </div>
                        ))
                    ) : (
                        <div className="tag-error">
                            <p>Il n'y a pas de tags correspondants</p>
                        </div>
                    )}
                </div>
                <div id="rating-container">
                    <p>{propertyData.rating}</p>
                </div>
            </div>

        </section>
    )
}