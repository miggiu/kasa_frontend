import "./Banner.scss";
import PropTypes from "prop-types";

function Banner({title = "", image, id, className}) {

  function showTitle() {
    if (title === "") {
      return null;
    } else {
      return <h1>{title}</h1>;
    }
  }

  return (
    <section id="title-card" className={className}>
      <img src={image} alt={id} id="banner-img" /> 
      {showTitle()}
    </section>
  );

  
}

Banner.propTypes = {
   title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node]),
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Banner;