import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Carousel from "../components/Carousel/Carousel.jsx";
import ApartmentInformation from "../components/ApartmentInformation/ApartmentInformation.jsx";
import AccordionList from "../components/Accordion/AccordionList.jsx";

import { BASE_API_URL } from "../variables.js"
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ApartmentPage() {

  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function fetchProperty() {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_API_URL}properties/${id}`);
        if (!response.ok) {
          throw new Error('Appartement non trouvé');
        }


        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  if (loading) return <div>Chargement en cours ...</div>
  if (error) return <div>Nous avons des difficultés à charger l'appartement : {error} </div>
  if (!property) return <div>Appartement non trouvé</div>

  const apartmentData = [
    {
      title: "Description",
      content: property.description
    },
    {
      title: "Équipements",
      content: property.equipments || [],
      isArray: true
    }
  ];

  return (
    <div>
      <Header className="margin" />
      <Carousel
        propertyData={[property]} />
      <ApartmentInformation
        propertyData={property} />
      <AccordionList dataSource={apartmentData} />
      <Footer />
    </div>
  );
}
