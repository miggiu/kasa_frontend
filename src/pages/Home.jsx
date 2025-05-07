import Header from "../components/Header";
import Banner from "../components/Banner";
import Cards from "../components/Cards";
import Footer from "../components/Footer";

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