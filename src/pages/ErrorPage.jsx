import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Error404 from "../components/Error404/Error404.jsx";


function ErrorPage() {
  return (
    <div id="root">
      <Header className="margin" />
      <main>
      <Error404 />
      </main>
      <Footer />
    </div>
  );
}


export default ErrorPage;