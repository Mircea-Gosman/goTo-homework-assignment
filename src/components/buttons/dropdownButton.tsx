import { useState, useRef, useEffect } from "react";
import { ReactComponent as Chevron } from 'assets/icons/chevron.svg';
import { Status } from "types/interfaces/tasks";

function DropdownButton(props: { 
    label: string,
    options: { title: string, id: Status }[], 
    disabled?: boolean,
    className?: string, 
    iconClassName?: string,
    optionsClassName?: string,
    onSelectOption: (option: any) => void
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOptionSelection = (option: any) => {
        props.onSelectOption(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className={`relative flex flex-row items-center bg-darkBackground disabled:invisible text-lightText transition-opacity opacity-100 w-28 lg:w-40 h-10 pl-3 rounded-md hover:opacity-70 ${props.className}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                disabled={props.disabled}
            >
                <p className="font-medium">{props.label}</p>
                <Chevron className={`transition-all ease-in-out rotate-180ml-10 w-5 sm:ml-16 absolute right-3 fill-lightBackground ${props.iconClassName}`} />
            </button>
            {
                isOpen && (
                    <div className="absolute top-10 mt-2 w-28 lg:w-40 z-20">
                        {props.options.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => handleOptionSelection(option.id)}
                                className={`text-center bg-darkBackground text-lightText py-4 hover:opacity-90 cursor-pointer ${props.optionsClassName}`}
                            >
                                {option.title}
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
}

export default DropdownButton;
  