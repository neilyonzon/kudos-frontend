import React from "react";

const input = (props) => {
  let inputElement = null;
  let label = null;
  let labelClass = "form__label--hidden";
  if (props.labelConfig.label) {
    label = props.labelConfig.label.toLowerCase();
  }
  if (props.labelConfig.display) {
    labelClass = "form__label";
  }
  let helperId = "helper-text__" + label;

  switch (props.inputType) {
    case "input":
      inputElement = (
        <input
          className="form__input"
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
          className="form__input"
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
          className="form__input"
          id={label}
          name={label}
          value={props.value}
          onChange={props.changed}
        >
          {props.inputConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
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
      <div
        id="helper-text__username"
        className="form__helper-text"
        aria-hidden="true"
      >
        {props.helper}
      </div>
    </div>
  );
};

export default input;
