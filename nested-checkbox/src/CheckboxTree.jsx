import { useState } from "react";
import Checkbox from "./checkbox";


function CheckboxObjectRenderer(props) {
    // has just one checkbox and rest is either null or children
    const { id, children, label, valueTable, onCheckClick } = props;
    const [hidden, setHidden] = useState(false)
    const shouldShowHidden = Array.isArray(children) && children.length > 0;
    const onClick = (val) => {
        onCheckClick(val.target.checked, id, children);
    }

    return (
        <div className="checkboxItem">
            <Checkbox id={id} label={label} hidden={hidden} setHidden={setHidden} shouldShowHidden={shouldShowHidden} checked={valueTable[id] || false} onClick={onClick}/>
            {Array.isArray(children) && !hidden  && (
                <CheckboxContainer checkboxes={children} valueTable={valueTable} onCheckClick={onCheckClick}/>
            )}
        </div>
    )
}

function CheckboxContainer(props) {
    const { checkboxes, valueTable, onCheckClick } = props; // checkboxes is an array of checkbox objects

    return (
        <div className="checkboxContainer">
            {checkboxes.map((checkboxObject, index) => {
                const { id, children, label } = checkboxObject;
                return <CheckboxObjectRenderer key={id} id={id} label={label} children={children} valueTable={valueTable} onCheckClick={onCheckClick} />
            })}
        </div>
    )
}

export default CheckboxContainer;