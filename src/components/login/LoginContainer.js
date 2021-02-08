import React from "react";
import ToyBoyImg from "../../../src/images/toy-box.png";
import PropTypes from "prop-types";

const LoginContainer = (props) => {
  return (
    <div className="bg bg--yellow">
      <div className="login-panel">
        <div className="login-panel__content">
          {props.details.title && <h1>{props.details.title}</h1>}
          {props.details.description && <p>{props.details.description}</p>}
          <div className="login-panel__cta-box">
            <button className="btn btn-primary">Login</button>
            <button className="btn btn-primary--inverse">Sign-Up</button>
          </div>
        </div>
        <div className="login-panel__line"></div>
        <div className="login-panel__img">
          <img src={ToyBoyImg} alt="Toy Box Illustration"></img>
        </div>
      </div>
    </div>
  );
};

LoginContainer.propTypes = {
  title: PropTypes.string,
};

export default LoginContainer;
