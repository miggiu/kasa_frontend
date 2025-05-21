import "./TagButton.scss"

import PropTypes from "prop-types"

function TagButton({ tags }) {
    return (
        <div id="tag-container">
            {tags && tags.length > 0 ? (
                tags.map((tag, index) => (
                    <div key={index} className="tag-item">
                        <p className="tag">{tag}</p>
                    </div>
                ))
            ) : (
                <div className="tag-error">
                    <p>Il n'y a pas de tags correspondants</p>
                </div>
            )}
        </div>
    )
}

TagButton.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default TagButton