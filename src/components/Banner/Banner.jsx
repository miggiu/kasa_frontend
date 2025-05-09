import "./Banner.scss";

export default function Banner({title = "", image, id, className}) {

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
