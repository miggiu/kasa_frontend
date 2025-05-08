import "./Accordion.scss";
import { createContext, useContext, useState } from "react";

const AccordionContext = createContext();

export function useAccordionContext() {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("Accordion-related components must be wrapped by <Accordion>");
    }
    return context;
}

export default function Accordion({children}) {
    const [openItemId, setOpenItemId] = useState()

        function openItem(index){
            setOpenItemId(index)
        }

        function closeItem(){
            setOpenItemId(null)
        }

        const contextValue = {
        openItemId,
        openItem,
        closeItem,
    }
    return (
        <AccordionContext.Provider value={contextValue}>
            <div className="accordion">
                <ul id="accordion-list">
                    {children}
                </ul> 
            </div>
        </AccordionContext.Provider>
    );
}  