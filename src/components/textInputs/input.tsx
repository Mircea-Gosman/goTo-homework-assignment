function Input(props: { label: string, error: string, content: string, setContent: Function, onFocus?: Function, className?: string}) {
  const handleFocus = () =>{
    if (props.onFocus) {
      props.onFocus();
    }
  }

  return (
    <>
      <div className={props.className}>
          <label className="absolute translate-y-[-0.7rem] translate-x-5 px-3 bg-lightBackground text-mediumDarkText">{props.label}</label>
          <label className="absolute translate-y-[1.2rem] ml-7 px-1 bg-lightBackground text-warning text-sm cursor-text" onClick={handleFocus}>{props.error}</label>
          <input 
            value={props.content} 
            onChange={(e) => {props.setContent(e.target.value)}}
            className="h-14 w-full px-5 border-2 border-border focus:outline-none focus:border-darkBackground" 
            onFocus={handleFocus}
          ></input>
      </div>
    </>
  );
}

export default Input;
