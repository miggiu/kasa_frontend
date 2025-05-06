import titleCardBackground from '../assets/title-card-background.jpg';
function TitleCard() {
  return (
    <section className="title-card">
      <img src={titleCardBackground} alt="Image de fond représentant des falaises et la mer"/>
      <h1>Chez vous, partout et ailleurs</h1>
    </section>
  );
}

export default TitleCard;