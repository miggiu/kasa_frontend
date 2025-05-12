import Header from "../components/Header/Header.jsx";
import Banner from "../components/Banner/Banner.jsx";
import AccordionList from "../components/Accordion/AccordionList.jsx";
import Footer from "../components/Footer/Footer.jsx";

import { CORE_CONCEPTS } from "../components/Accordion/accordion-data.js";
import "../index.scss";

export default function AboutPage() {
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
      <section id="about-container">
        <Banner image="./about-banner.png" className="margin" />
        <AccordionList className="margin" />
      </section>
      <Footer />
    </div>
  );
}
