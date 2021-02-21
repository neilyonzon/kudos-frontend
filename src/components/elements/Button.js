import React from "react";

const Button = (props) => {
  let buttonClass = "";
  if (props.btnColor == "green") {
    buttonClass = "btn--primary";
  }

  return (
    <button
      className={`btn ${buttonClass}`}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
