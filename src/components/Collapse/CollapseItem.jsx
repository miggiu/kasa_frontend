import "./collapse-data.js";
import "./Collapse.scss";
import PropTypes from "prop-types";
import collapseArrow from "/collapse-arrow.png";

/**
 * CollapseItem component represents a single collapsible section
 * Used as a child of the Collapse component to create accordion-like UI patterns
 * Can display either text content or a list of items
 *
 * @param {string} title - The heading text for this collapse section
 * @param {string|string[]} content - The content to display (text or array of items)
 * @param {number} index - The position of this item in the parent Collapse
 * @param {Set} openItems - Set containing indices of currently open items
 * @param {Function} openItem - Function to call when opening this item
 * @param {Function} closeItem - Function to call when closing this item
 * @param {string} className - Optional CSS class for custom styling
 */

function CollapseItem({
	title,
	content,
	index,
	openItems,
	openItem,
	closeItem,
	className = "",
}) {
	// Determine if this specific collapse item is currently open
	// by checking if its index is in the openItems Set
	const isOpen = openItems.has(index);

	/**
	 * Toggles the open/closed state of this collapse item
	 * Calls the appropriate function from parent to update shared state
	 */
	function handleClick() {
		if (isOpen) {
			closeItem(index);
		} else {
			openItem(index);
		}
	}

	/**
	 * Renders the content based on its type:
	 * - For arrays: renders a list of items
	 * - For strings: renders a simple paragraph
	 * @returns {JSX.Element} The rendered content
	 */

	const renderContent = () => {
		if (Array.isArray(content)) {
			// If content is an array, render it as a list
			// Commonly used for equipment lists or feature lists (like in @ApartmentInformation component)
			return (
				<ul className={`equipment-list ${className}`}>
					{content.map((item, i) => (
						<li
							key={i}
							className={className}
						>
							{item}
						</li>
					))}
				</ul>
			);
		}
		// For simple string content, render as paragraph
		return <p>{content}</p>;
	};

	return (
		<li
			id='collapse-item'
			className={`fade-in ${className}`}
		>
			<div id='title-container'>
				<h3 className='collapse-item-title'>{title}</h3>
				<img
					src={collapseArrow}
					id='collapse-arrow'
					alt='collapse-arrow'
					onClick={handleClick}
					style={{
						// Dynamic styling for arrow rotation animation
						// Arrow rotates 180° when item is open
						transform: isOpen ? "rotate(-180deg)" : "rotate(0)",
						transition: "transform 0.6s ease",
					}}
				/>
			</div>
			<article
				className={
					isOpen ? "collapse-item-content open" : "collapse-item-content"
				}
			>
				{renderContent()}
			</article>
		</li>
	);
}

// PropTypes validation ensures component receives the expected data structure
// Used as a transition to TypeScript in the future
CollapseItem.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string),
	]).isRequired,
	index: PropTypes.number.isRequired,
	openItems: PropTypes.instanceOf(Set).isRequired,
	openItem: PropTypes.func.isRequired,
	closeItem: PropTypes.func.isRequired,
	className: PropTypes.string,
};

export default CollapseItem;
