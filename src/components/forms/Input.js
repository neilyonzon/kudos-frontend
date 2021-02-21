import React from "react";

const input = (props) => {
  let inputElement = null;
  let helperElement = "";

  if (props.helper != "") {
    helperElement = (
      <div
        id="helper-text__username"
        className="form__helper-text"
        aria-hidden="true"
      >
        {props.helper}
      </div>
    );
  }

  //START INPUT CHECK ASSIGNMENT
  let inputClass = "form__input";

  if (props.inputType == "select") {
    inputClass += " form__input--select";
  }

  if (props.isValid && props.shouldValidate && props.touched) {
    inputClass += " form__input--invalid";
  }

  //END INPUT CHECK ASSIGNMENT

  //START LABEL CLASS ASSIGNMENT
  let label = null;
  let labelClass = "form__label--hidden";
  if (props.labelConfig.label) {
    label = props.labelConfig.label.toLowerCase();
  }
  if (props.labelConfig.display) {
    labelClass = "form__label";
  }
  let helperId = "helper-text__" + label;

  //END LABEL CLASS ASSIGNMENT

  //START VALIDATION ERROR
  let validationError = null;
  if (props.isValid && props.touched) {
    validationError = <p>Please enter valid value!</p>;
  }
  //END VALIDATION ERROR

  switch (props.inputType) {
    case "input":
      inputElement = (
        <input
          className={inputClass}
          id={label}
          name={label}
          aria-controls={helperId}
          aria-describedby={helperId}
          {...props.inputConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClass}
          id={label}
          name={label}
          aria-controls={helperId}
          aria-describedby={helperId}
          rows="4"
          {...props.inputConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "radio":
      inputElement = <textarea />;
      break;
    case "select":
      inputElement = (
        <select
          className={inputClass}
          id={label}
          name={label}
          value={props.value}
          onChange={props.changed}
        >
          {props.inputConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      helperElement = "";
      break;
    case "imageChooser":
      inputElement = "";
      break;
    case "textPoints":
      inputElement = "";
      break;
    default:
      inputElement = (
        <input
          className="form__input"
          id={label}
          name={label}
          aria-controls={`helper-text__${label}`}
          aria-describedby={`helper-text__${label}`}
          {...props.inputConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className="form__group">
      <label className={labelClass} htmlFor="username">
        {props.labelConfig.label}
      </label>
      {inputElement}
      {helperElement}
      {validationError}
    </div>
  );
};

export default input;
