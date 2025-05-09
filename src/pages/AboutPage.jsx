import Header from "../components/Header/Header.jsx";
import Banner from "../components/Banner/Banner.jsx";
import AccordionList from "../components/Accordion/AccordionList.jsx";
import Footer from "../components/Footer/Footer.jsx";


import { CORE_CONCEPTS } from "../components/Accordion/accordion-data.js";
import ".././Index.scss";


export default function AboutPage() {
  return (
    <div>
      <Header className="margin"/>
      <section id="about-container">
      <Banner
      image="./about-banner.png"
      className="margin"
      />
        <AccordionList 
        className="margin"/>
      </section>
      <Footer />
    </div>
  );
}
