function Input(props: { label: string, content: string}) {
  return (
    <>
        <label className="absolute translate-y-[-0.7rem] translate-x-5 px-3 bg-lightBackground text-mediumDarkText">{props.label}</label>
        <input className="h-14 w-full px-5 border-2 border-border focus:outline-none focus:border-darkBackground" value={props.content}></input>
    </>
  );
}

export default Input;
