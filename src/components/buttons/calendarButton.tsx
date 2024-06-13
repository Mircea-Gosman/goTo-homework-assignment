import { useRef, useState, useEffect } from "react";
import Datepicker from "tailwind-datepicker-react"

import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';

function CalendarButton(props: { 
    pickerLabel: string,
    className?: string,
    onDateSelect: (option: any) => void
}) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [ isPickingDate, setIsPickingDate ] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsPickingDate(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef}>
            <Datepicker 
                setShow={setIsPickingDate}
                show={isPickingDate}
                onChange={props.onDateSelect}
                options={
                    {                                
                        todayBtn: false,
                        clearBtn: false,
                    }
                }
            >
                <div 
                    className="flex flex-row items-center space-x-3 border-border bg-lightBackground rounded-none w-40 cursor-pointer" 
                    onClick={() => {setIsPickingDate(!isPickingDate)}}
                    onBlur={() => { setIsPickingDate(false) }}
                >
                    <CalendarIcon className="border-border border-[0.15rem] p-1 h-10 w-10"/>
                    <div className="border-0 focus:outline-0 focus:border-0" >{props.pickerLabel}</div>
                </div>
            </Datepicker>
        </div>
    );
}

export default CalendarButton;
  