import "./Collapse.scss";
import React, { useState } from "react";

export default function Collapse({ children, className = '' }) {
    const [openItems, setOpenItems] = useState(new Set());

    function openItem(index) {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            newSet.add(index);
            return newSet;
        });
    }

    function closeItem(index) {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
        });
    }


    const childrenWithProps = React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                openItems,
                openItem,
                closeItem,
                index
            });
        }
        return child;
    });
    return (
        <section className={`collapse ${className}`}>
            <ul id="collapse-list" className={className}>
                {childrenWithProps}
            </ul>
        </section>
    );
}  