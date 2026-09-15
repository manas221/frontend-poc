import React, { useState } from "react";

function ButtonWithInput(props) {
  const {
    onSubmit = () => {},
    label = "tbh",
    fieldCount = 1,
    placeholders = [],
    values = [],
    disabled = false,
    onValueChange = () => {},
  } = props;

  const [isButtonDisabled, setButtonDisabled] = useState(disabled);

  const onInputChange = (indexToUpdate, value) => {
    const newValues = values.map((item, ind) => {
      if (indexToUpdate == ind) {
        return value;
      }
      return item;
    });
    const disabled =
      disabled || newValues.some((item) => item == undefined || item == "");
    setButtonDisabled(disabled);

    if (newValues.length > 1) {
      return onValueChange(values);
    }

    return onValueChange(values[0]);
  };

  const onSubmitButton = () => {
    if (inputResponses.some((item) => item == undefined || item == "")) {
      return;
    }
    if (inputResponses.length > 1) {
      return onSubmit(inputResponses);
    }

    return onSubmit(inputResponses[0]);
  };

  return (
    <div className="inputWithButton">
      <button
        onClick={onSubmitButton}
        disabled={isButtonDisabled}
        className="buttonInput"
      >
        {label}
      </button>
      {placeholders.length > 0
        ? placeholders.map((placeholder, ind) => (
            <input
              id={ind}
              key={ind}
              value={inputResponses[ind] || ""}
              placeholder={placeholder}
              onChange={({ target }) => onInputChange(ind, target?.value)}
              className="inputField"
            />
          ))
        : "Invalid field"}
    </div>
  );
}

export default ButtonWithInput;
