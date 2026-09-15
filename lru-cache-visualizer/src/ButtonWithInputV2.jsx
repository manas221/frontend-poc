import { useState } from "react";
import { EMPTY_ARRAY, EMPTY_STRING, NOOP } from "./constants";

function ButtonWithInput(props) {
  const {
    onButtonSubmit = NOOP,
    buttonLabel = EMPTY_STRING,
    inputValues = EMPTY_ARRAY,
    inputPlaceholders = EMPTY_ARRAY,
    inputOnChangeHandler = NOOP,
    buttonDisabled = false,
  } = props;

  const onInputChange = (index, value) => {
    const newValues = inputValues.map((item, ind) => {
      if (index == ind) {
        return value;
      }
      return item;
    });

    return inputOnChangeHandler(newValues);
  };
  return (
    <div className="inputWithButton">
      <button
        onClick={() => onButtonSubmit(inputValues)}
        disabled={buttonDisabled}
        className="buttonInput"
      >
        {buttonLabel}
      </button>
      {inputValues.length > 0
        ? inputValues.map((value, index) => (
            <input
              id={index}
              key={index}
              value={value || EMPTY_STRING}
              placeholder={inputPlaceholders[index]}
              disabled={buttonDisabled}
              onChange={({ target }) => onInputChange(index, target?.value)}
              className="inputField"
            />
          ))
        : "Invalid error"}
    </div>
  );
}

export default ButtonWithInput;
