import "./accordion-data.js";
import "./Accordion.scss";
import accordionArrow from "/accordion-arrow.png";


export default function AccordionItem({title, content, index, openItems, openItem, closeItem}) {

    const isOpen = openItems.has(index);

    function handleClick() {
        if (isOpen) {
            closeItem(index);
        } else {
            openItem(index);
        }
    }

    return (
        <li
            id="accordion-item"
            className="fade-in"
        >
            <div id="title-container">
                <h3 className="accordion-item-title">{title}</h3>
                <img 
                    src={accordionArrow} 
                    id="accordion-arrow" 
                    alt="accordion-arrow" 
                    onClick={handleClick}
                    style={{ 
                        transform: isOpen ? 'rotate(-180deg)' : 'rotate(0)', 
                        transition: 'transform 0.6s ease' 
                    }}
                />
            </div>
            <article className={isOpen ? 'accordion-item-content open' : 'accordion-item-content'}>
                <p>{content}</p>
            </article>
        </li>
    );
}
