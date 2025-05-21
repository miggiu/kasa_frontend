import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Slideshow from "../components/Slideshow/Slideshow.jsx";
import ApartmentInformation from "../components/ApartmentInformation/ApartmentInformation.jsx";
import CollapseList from "../components/Collapse/CollapseList.jsx";
import ErrorPage from "./ErrorPage.jsx";

import { BASE_API_URL } from "../variables.js"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

export default function ApartmentPage() {

  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    if(error) {
      navigate("/error")
    }
  }, [error, navigate]);

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
      <Slideshow
        propertyData={[property]} />
      <ApartmentInformation
        propertyData={property} />
      <CollapseList className={"for-apartment-page component-margin"} dataSource={apartmentData} />
      <Footer />
    </div>
  );
}
