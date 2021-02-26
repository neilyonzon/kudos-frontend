import React from "react";
import ToyBoyImg from "../../../src/images/toy-box.png";
import PropTypes from "prop-types";

function LoginContainer(props) {
  // let buttons = "";

  // if (props.loginDetails.buttons) {
  //   buttons = props.loginDetails.buttons;
  // }

  // const buttonsOutput = buttons.map((button, index) => (
  //   <button key={index} className={`btn ${button.class}`}>
  //     {button.text}
  //   </button>
  // ));

  return (
    <div className="bg bg--yellow">
      <div className="login-panel">
        <div className="login-panel__content">
          {props.loginDetails.title && <h1>{props.loginDetails.title}</h1>}
          {props.loginDetails.description && (
            <p>{props.loginDetails.description}</p>
          )}
          <div className="login-panel__cta-box">
            {/* {buttonsOutput} */}
            {props.wysiwyg && props.wysiwyg}
          </div>
        </div>
        <div className="login-panel__line"></div>
        <div className="login-panel__img">
          <img src={ToyBoyImg} alt="Toy Box Illustration"></img>
        </div>
      </div>
    </div>
  );
}

LoginContainer.propTypes = {
  title: PropTypes.string,
};

export default LoginContainer;
