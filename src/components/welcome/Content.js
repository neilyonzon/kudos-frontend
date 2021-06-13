import React from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Button from "../elements/Button";

const Content = (props) => {
  let content = null;
  switch (props.contentType) {
    case "welcome":
      content = (
        <div className="login-panel__content">
          <div className="login-panel__intro">
            <h1>Welcome to Kudos</h1>
            <p>Lorem ipsum dolor sit amet, consecte</p>
          </div>
          <div className="login-panel__cta-box">
            <Button
              clicked={(e) => props.welcomeTypeHandler(e, "login")}
              btnColor="green"
              btnClass={null}
            >
              Login
            </Button>
            {props.studentLogin ? null : 
              <Button
                clicked={(e) => props.welcomeTypeHandler(e, "register")}
                btnColor="green"
                btnClass={null}
              >
                Sign-Up
              </Button>
            }
          </div>
        </div>
      );
      break;
    case "login":
      content = (
        <div className="login-panel__content">
          <div className="login-panel__intro">
            <h1>Login, Buddy</h1>
            <p>Lorem ipsum dolor sit amet, consecte</p>
          </div>
          <div className={props.contentClass.login}>
            <LoginForm />
          </div>
        </div>
      );
      break;
    case "register":
      content = (
        <div className="login-panel__content">
          <div className="login-panel__intro">
            <h1>Register</h1>
            <p>Lorem ipsum dolor sit amet, consecte</p>
          </div>
          <RegisterForm redirectLogin={props.welcomeTypeHandler} />
        </div>
      );
      break;
    default:
      content = <div>Error</div>;
  }
  return content;
};

export default Content;
