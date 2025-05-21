import Header from "../components/Header/Header.jsx";
import Banner from "../components/Banner/Banner.jsx";
import Card from "../components/Card/Card.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../variables.js";

function HomePage() {
  const [propertiesData, setPropertiesData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(`${BASE_API_URL}properties`)
      .then((response) => response.json())
      .then((data) => {
        setPropertiesData(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Header className="margin" />
      <Banner
        className="margin"
        image="./title-card-background.jpg"
        title={<>Chez vous,<span className="comma"> partout et ailleurs</span></>}
      />
      <section id="global-cards-container" className="margin">
        <Card propertiesData={propertiesData.slice(0, 6)} />
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;
