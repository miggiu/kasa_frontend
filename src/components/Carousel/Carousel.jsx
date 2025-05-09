import "./Carousel.scss";

export default function Carousel({ pictures }) {
    
    return (
        <div className="carousel-container">
            <div className="carousel-images">
                {pictures.map((picture, index) => (
                    <img key={index} src={picture} />))}
            </div>
        </div>)
}