import Header from "../components/Header/Header.jsx";
import Banner from "../components/Banner/Banner.jsx";
import Cards from "../components/Cards/Cards.jsx";
import Footer from "../components/Footer/Footer.jsx";

function Homepage() {
  return (
    <div>
      <Header />
      <Banner />
      <section id="cards-container">
      <Cards />
      <Cards />
      <Cards />
      <Cards />
      <Cards />
      <Cards />
      </section>
      <Footer />
    </div>
  );
}

export default Homepage; 