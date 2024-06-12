import { useState, useRef, useEffect } from "react";
import { ReactComponent as Chevron } from 'assets/icons/chevron.svg';

function ToggleButton(props: { 
    label: string,
    className?: string, 
    iconClassName?: string,
    optionsClassName?: string,
    onToggle: (option: any) => void
}) {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = (toggleValue: boolean) => {
        props.onToggle(toggleValue)
        setIsOn(toggleValue)
    }

    return (
        <div className="relative">
            <button
                className={`relative flex flex-row items-center bg-darkBackground text-lightText transition-opacity opacity-100 w-28 lg:w-40 h-10 pl-3 rounded-md shadow-xl hover:opacity-70 ${props.className}`}
                onClick={() => handleToggle(!isOn)}
            >
                <p className="font-medium">{props.label}</p>
                <Chevron className={`transition-all ease-in-outml-10 w-5 sm:ml-16 absolute right-3 fill-lightBackground ${props.iconClassName} ${isOn ? 'rotate-180' : 'rotate-0 '}`} />
            </button>
        </div>
    );
}

export default ToggleButton;
  