import "./accordion-data.js";
import "./Accordion.scss";

import { useAccordionContext } from "./Accordion.jsx";
export default function AccordionItem({ title, content, index }) {
    const { openItemId, openItem, closeItem } = useAccordionContext();

    const isOpen = openItemId === index;

    function handleClick() {
        if (isOpen) {
            closeItem();
        } else {
            openItem(index);
        }
    }

    return (
        <li id="accordion-item">
        <h3 onClick={handleClick} class="accordion-item-title">{title}</h3>
        <article  className={isOpen ? 'accordion-item-content open' : 'accordion-item-content'}>
        <p>{content}</p>
        </article>
    </li>
    )
}