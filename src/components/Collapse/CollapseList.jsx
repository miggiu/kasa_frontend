import Collapse from './Collapse';
import CollapseItem from './CollapseItem';


export default function CollapseList({ dataSource, className }) {
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