import "./Collapse.scss";
import PropTypes from "prop-types";
import React, { useState } from "react";

/**
 * Collapse component provides an accordion-like container for collapsible content
 * It manages the state of which items are open and passes appropriate props to children
 *
 * @param {ReactNode} children - Child components (should be CollapseItem components)
 * @param {string} className - Optional CSS class name for styling
 */

function Collapse({ children, className = "" }) {
	// State to track which items are currently open
	// Using a Set to efficiently store unique indices of open items
	// This allows multiple items to be open simultaneously
	const [openItems, setOpenItems] = useState(new Set());

	/**
	 * Opens a collapse item by adding its index to the openItems Set
	 * @param {number} index - The index of the item to open
	 */

	function openItem(index) {
		setOpenItems((prev) => {
			// Create a new Set to avoid mutating the previous state
			// This follows React's immutability pattern for state updates
			const newSet = new Set(prev);
			newSet.add(index);
			return newSet;
		});
	}

	/**
	 * Closes a collapse item by removing its index from the openItems Set
	 * @param {number} index - The index of the item to close
	 */

	function closeItem(index) {
		setOpenItems((prev) => {
			// Create a new Set to avoid mutating the previous state
			const newSet = new Set(prev);
			newSet.delete(index);
			return newSet;
		});
	}

	// Clone each child element to inject the necessary props
	// This pattern allows parent-to-child communication without prop drilling
	// Each child receives state and functions needed for collapse behavior
	const childrenWithProps = React.Children.map(children, (child, index) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, {
				openItems, // Current state of which items are open
				openItem, // Function to open this item
				closeItem, // Function to close this item
				index, // Position in the list (used as identifier)
			});
		}
		return child;
	});
	return (
		// Main container with customizable class names
		<section className={`collapse ${className}`}>
			<ul
				id='collapse-list'
				className={className}
			>
				{childrenWithProps}
			</ul>
		</section>
	);
}

// PropTypes validation ensures component receives the expected data structure
// Used as a transition to TypeScript in the future
Collapse.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default Collapse;
