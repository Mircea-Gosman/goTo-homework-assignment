function TextArea(props: { label: string, content: string, setContent: Function, className?: string}) {
    return (
      <>
        <div className={props.className}>
            <label className="absolute translate-y-[-0.7rem] translate-x-5 px-3 bg-lightBackground text-mediumDarkText">{props.label}</label>
            <textarea 
              rows={4} 
              className="min-h-14 w-full px-5 py-3 border-2 border-border focus:outline-none focus:border-darkBackground" 
              value={props.content}
              onChange={(e) => { props.setContent(e.target.value) }}
            />
        </div>
      </>
    );
  }
  
  export default TextArea;
  