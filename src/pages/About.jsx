import Header from "../components/Header/Header.jsx";
import AccordionList from "../components/Accordion/AccordionList.jsx";
import Footer from "../components/Footer/Footer.jsx";

import bannerImg from "/about-banner.png";

import { CORE_CONCEPTS } from "../components/Accordion/accordion-data.js";
import ".././Index.scss";


export default function AboutPage() {
  return (
    <div>
      <Header />
      <section id="about-container">
      <div id="banner-img">
              <img src={bannerImg} alt="photography of moutains" />
      </div>
      <div id="dropdown-container">
        <AccordionList />
      </div>
      </section>
      <Footer />
    </div>
  );
}
