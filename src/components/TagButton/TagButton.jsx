import "./TagButton.scss";

import PropTypes from "prop-types";

/**
 * TagButton component displays keyword tags for apartments
 * Renders a horizontal list of tag pills for filtering or categorization
 * Handles empty state with a user-friendly error message
 *
 * @param {string[]} tags - Array of tag strings to display
 * @returns {JSX.Element} The rendered tag list
 */

function TagButton({ tags }) {
	return (
		<div id='tag-container'>
			{tags && tags.length > 0 ? (
				// Conditional rendering based on tags availability
				tags.map((tag, index) => (
					// Map through tags array to create individual tag elements
					// Each tag gets a unique key for React's reconciliation algorithm
					<div
						key={index}
						className='tag-item'
					>
						<p className='tag'>{tag}</p>
					</div>
				))
			) : (
				// Fallback UI when no tags are available
				<div className='tag-error'>
					<p>Il n'y a pas de tags correspondants</p>
				</div>
			)}
		</div>
	);
}

// PropTypes validation ensures component receives the expected data structure
// Used as a transition to TypeScript in the future
TagButton.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagButton;
