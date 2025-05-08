import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import accordionData from './accordion-data';

export default function AccordionList() {
  return (
    <Accordion>
      {accordionData.map((item, index) => (
        <AccordionItem
          key={index} 
          index={index} 
          title={item.title}
          content={item.content}
        />
      ))}
    </Accordion>
  );
}