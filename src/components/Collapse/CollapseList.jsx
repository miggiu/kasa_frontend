import Collapse from './Collapse';
import CollapseItem from './CollapseItem';

import PropTypes from 'prop-types';


function CollapseList({ dataSource, className }) {
  return (
    <Collapse className={className}>
      {dataSource && dataSource.map((item, index) => (
        <CollapseItem
          key={index}
          index={index}
          title={item.title}
          content={item.content}
          isArray={item.isArray}
        />
      ))}
    </Collapse>
  );
}

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