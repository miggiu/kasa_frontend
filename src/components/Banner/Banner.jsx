import "./Banner.scss";
import PropTypes from "prop-types";

/**
 * Banner component displays a full-width image banner with an optional title overlay
 * Used for page headers throughout the application
 * 
 * @param {string} title - Optional text to display over the banner (defaults to empty string)
 * @param {string} image - Path to the banner image (required)
 * @param {string} id - Unique identifier for the banner (required, also used for alt text)
 * @param {string} className - Optional additional CSS classes
 */

function Banner({title = "", image, alt, className}) {

  
  /**
   * Conditionally renders the title element
   * Returns null when title is empty, which prevents rendering an empty h1 element
   * @returns {JSX.Element|null} The title element or null
   */

  function showTitle() {
    if (title === "") {
      return null;
    } else {
      return <h1>{title}</h1>;
    }
  }

  return (
    <section id="title-card" className={className}>
      <img src={image} alt={alt} id="banner-img" /> 
      {showTitle()}
    </section>
  );

  
}

// PropTypes validation ensures component receives the expected data structure
// Used as a transition to TypeScript in the future
Banner.propTypes = {
   title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node]),
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Banner;