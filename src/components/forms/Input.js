import React from "react";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiMinus } from "@react-icons/all-files/fi/FiMinus";

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

  //START FORM GROUP CLASS ASSIGNMENT
  let formGroupClass = "form__group";
  if (props.inputType == "points") {
    formGroupClass = "form__group form__group--points";
  }

  //START INPUT CHECK ASSIGNMENT
  let inputClass = "form__input";

  if (props.inputType == "select") {
    inputClass += " form__input--select";
  }

  if (props.isValid && props.shouldValidate && props.touched) {
    inputClass += " form__input--invalid";
  }

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

  //START VALIDATION ERROR
  let validationError = null;
  if (props.isValid && props.touched) {
    validationError = <p>Please enter valid value!</p>;
  }

  //POINTS HANDLER

  const inputPointsHandler = (type) => {
    props.pointsHandler("points", type);
  };

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
    case "points":
      inputElement = (
        <div className="form__points-control">
          {
            <FiMinus
              className="form__icon points-minus"
              aria-controls="points"
              onClick={(e) => props.pointsHandler("points", "minus")}
            ></FiMinus>
          }
          <input
            onChange={props.changed}
            className="form__input--points form__input"
            name={label}
            id={label}
            type="number"
            value={props.value}
          ></input>
          {
            <FiPlus
              className="form__icon points-plus"
              aria-controls="points"
              onClick={(e) => props.pointsHandler("points", "plus")}
            ></FiPlus>
          }
        </div>
      );
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
    <div className={formGroupClass}>
      <label className={labelClass} htmlFor={label}>
        {props.labelConfig.label}
      </label>
      {inputElement}
      {helperElement}
      {validationError}
    </div>
  );
};

export default input;
