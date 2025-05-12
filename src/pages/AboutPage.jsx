import Header from "../components/Header/Header.jsx";
import Banner from "../components/Banner/Banner.jsx";
import AccordionList from "../components/Accordion/AccordionList.jsx";
import aboutAccordionData from "../components/Accordion/accordion-data.js"
import Footer from "../components/Footer/Footer.jsx";

import "../index.scss";

export default function AboutPage() {

  return (
    <div>
      <Header className="margin" />
      <section id="about-container">
        <Banner image="./about-banner.png" className="margin" />
        <AccordionList dataSource={aboutAccordionData} className="margin" />
      </section>
      <Footer />
    </div>
  );
}
