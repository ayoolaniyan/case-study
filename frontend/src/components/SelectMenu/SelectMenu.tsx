import { useEffect, useRef, useState } from "react";
import type { ICompany } from "../../models/company.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Props {
    options: ICompany[];
    selectedId: string;
    onChange: (value: string) => void;
}

const SelectMenu = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedItem = props.options.find(o => o._id === props.selectedId);

    const handleClickOutside = (event:MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    props.onChange(id);
    setIsOpen(false);
  };

    return (
        <div className="selectmenu-container" ref={dropdownRef}>
            <label htmlFor="item-select">Comapany AB</label>
            <div className="selectmenu-header" onClick={() => setIsOpen(prev => !prev)}>
            <span>{selectedItem?.name || 'Select an item'}</span>
            <FontAwesomeIcon icon={faChevronDown} className={`selectmenu-icon ${isOpen ? 'open' : ''}`} />
        </div>
        {isOpen && (
            <ul className="selectmenu-list">
            {props.options.map((opt) => (
                <li
                key={opt._id}
                className={`selectmenu-item ${opt._id === props.selectedId ? 'selected' : ''}`}
                onClick={() => handleSelect(opt._id)}
                >
                {opt.name}
                </li>
            ))}
            </ul>
        )}
            {/* <select
            id="item-select"
            value={props.selectedId}
            onChange={(e) => props.onChange(e.target.value)}
            className="item-select">
                {props.options.map((c) => (
                    <option key={c._id} value={c._id}>
                        {c.name}
                    </option>
                ))}
            </select> */}
        </div>
    );
}

export default SelectMenu;
