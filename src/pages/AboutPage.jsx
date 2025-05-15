import Header from "../components/Header/Header.jsx";
import Banner from "../components/Banner/Banner.jsx";
import CollapseList from "../components/Collapse/CollapseList.jsx";
import aboutCollapseData from "../components/Collapse/collapse-data.js"
import Footer from "../components/Footer/Footer.jsx";

import "../index.scss";

export default function AboutPage() {

  return (
    <div>
      <Header className="margin" />
      <section id="about-container">
        <Banner image="./about-banner.png" className="margin" />
        <CollapseList dataSource={aboutCollapseData} className="margin collapse-margin" />
      </section>
      <Footer />
    </div>
  );
}
