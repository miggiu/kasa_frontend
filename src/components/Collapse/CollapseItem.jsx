import "./collapse-data.js";
import "./Collapse.scss";
import collapseArrow from "/collapse-arrow.png";


export default function CollapseItem({ title, content, index, openItems, openItem, closeItem, className = '' }) {

    const isOpen = openItems.has(index);

    function handleClick() {
        if (isOpen) {
            closeItem(index);
        } else {
            openItem(index);
        }
    }

    const renderContent = () => {
        if (Array.isArray(content)) {
            return (
                <ul className={`equipment-list ${className}`}>
                    {content.map((item, i) => (
                        <li key={i} className={className}>{item}</li>
                    ))}
                </ul>
            );
        }

        return <p>{content}</p>;
    };

    return (
        <li
            id="collapse-item"
            className={`fade-in ${className}`}
        >
            <div id="title-container">
                <h3 className="collapse-item-title">{title}</h3>
                <img
                    src={collapseArrow}
                    id="collapse-arrow"
                    alt="collapse-arrow"
                    onClick={handleClick}
                    style={{
                        transform: isOpen ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: 'transform 0.6s ease'
                    }}
                />
            </div>
            <article className={isOpen ? 'collapse-item-content open' : 'collapse-item-content'}>
                {renderContent()}
            </article>
        </li>
    );
}
