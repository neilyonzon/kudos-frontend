import * as React from "react";
import { Helmet } from "react-helmet";
import LoginForm from "../components/welcome/LoginForm";
import RegisterForm from "../components/welcome/RegisterForm";
import Button from "../components/elements/Button";
import ToyBoyImg from "../../src/images/toy-box.png";

class WelcomePage extends React.Component {
  state = {
    login: {
      title: "Manage Prizes",
      description: "Save time and manage your prizes through the prize box",
      image: "",
      condition: "welcome",
      classState: {
        login: "fade-inactive",
        register: "fade-inactive",
        retrieve: "fade-inactive",
        buttons: "fade-active",
      },
    },
  };

  handleClick = (e, type) => {
    e.preventDefault();
    let loginData = { ...this.state.login };
    loginData.classState.buttons = "fade-inactive";
    loginData.classState[type] = "fade-active";
    loginData.condition = type;
    this.setState({ login: loginData });
    this.setState({ login: loginData });
  };

  contentComponent = () => {
    let content = null;
    switch (this.state.login.condition) {
      case "welcome":
        content = (
          <div className="login-panel__content">
            <div className="login-panel__intro">
              <h1>Welcome to Kudos</h1>
              <p>Lorem ipsum dolor sit amet, consecte</p>
            </div>
            <div className="login-panel__cta-box">
              <Button
                clicked={(e) => this.handleClick(e, "login")}
                btnColor="green"
                btnClass={this.state.buttonClass}
              >
                Login
              </Button>
              <Button
                clicked={(e) => this.handleClick(e, "register")}
                btnColor="green"
                btnClass={this.state.buttonClass}
              >
                Sign-Up
              </Button>
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
            <div className={this.state.login.classState.login}>
              <LoginForm updateCondition={this.handleClick}></LoginForm>
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
            <RegisterForm />
          </div>
        );
        break;
      default:
        content = <div>Error</div>;
    }
    return content;
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Kudos Login</title>
          <meta name="description" content="Kudos" />
        </Helmet>
        <div>
          <div className="bg bg--yellow">
            <div className="login-panel">
              {this.contentComponent()}
              <div className="login-panel__line"></div>
              <div className="login-panel__img">
                <img src={ToyBoyImg} alt="Toy Box Illustration"></img>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default WelcomePage;
