function TextButton(props: { label: string, className: string, onClick: React.MouseEventHandler}) {

    return (
        <button className={`bg-darkBackground text-lightText transition-opacity opacity-100 hover:opacity-70 ${props.className}`} onClick={props.onClick}>
            {props.label}
        </button>
    );
  }
  
  export default TextButton;
  