import Accordion from './Accordion';
import AccordionItem from './AccordionItem';


export default function AccordionList({ dataSource }) {
  return (
    <Accordion>
      {dataSource && dataSource.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          title={item.title}
          content={item.content}
          isArray={item.isArray}
        />
      ))}
    </Accordion>
  );
}