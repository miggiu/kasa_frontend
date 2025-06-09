import Collapse from "./Collapse";
import CollapseItem from "./CollapseItem";

import PropTypes from "prop-types";

/**
 * CollapseList component provides a convenient way to create a collection of collapse items
 * from a data array. This simplifies creating multiple collapsible sections from a data source
 * like an API response or configuration object.
 *
 * @param {Array} dataSource - Array of objects containing data for each collapse item
 * @param {string} className - Optional CSS class name for styling the entire list
 */

function CollapseList({ dataSource, className }) {
	return (
		// Wrap everything in the Collapse container, passing through the className
		<Collapse className={className}>
			{/* Map through the data source to create individual CollapseItem components */}
			{/* Null check prevents errors if dataSource is undefined or null */}
			{dataSource &&
				dataSource.map((item, index) => (
					<CollapseItem
						key={index}
						index={index}
						title={item.title}
						content={item.content}
						isArray={item.isArray} // Flag indicating if content should render as a list
					/>
				))}
		</Collapse>
	);
}

// PropTypes validation ensures component receives the expected data structure
// Used as a transition to TypeScript in the future
CollapseList.propTypes = {
	dataSource: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			content: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.arrayOf(PropTypes.string),
			]).isRequired,
			isArray: PropTypes.bool,
		})
	).isRequired,
	className: PropTypes.string,
};

export default CollapseList;
