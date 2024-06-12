import { ReactElement } from "react";

function IconButton(props: { 
    icon: ReactElement,
    className?: string,
    onClick: (option: any) => void
}) {

    return (
        <button
            className={`flex flex-row items-center justify-center bg-darkBackground  fill-lightBackground transition-opacity opacity-100 hover:opacity-70 ${props.className}`}
            onClick={props.onClick}
        >
            {props.icon}
        </button>
    );
}

export default IconButton;
  