import "./styles.css";

export default function Checkbox(props) {
  const {
    checked,
    label,
    padding = 0,
    hidden,
    setHidden,
    shouldShowHidden,
    onClick,
  } = props;

  return (
    <div className="checkbox" style={{ marginLeft: `${padding}rem` }}>
      <input type="checkbox" onChange={onClick} checked={checked} />
      <div>{label}</div>
      {shouldShowHidden && (
        <button onClick={() => setHidden((oldHidden) => !oldHidden)}>
          {hidden ? "Unhide" : "Hide"}
        </button>
      )}
    </div>
  );
}
