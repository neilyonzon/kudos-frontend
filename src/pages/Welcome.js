import * as React from "react";
import { Helmet } from "react-helmet";
import Content from "../components/welcome/Content";
import ToyBoyImg from "../../src/images/toy-box.png";
import { isLoggedIn } from "../utils/auth";
import { navigate } from "gatsby";

class Welcome extends React.Component {
  state = {
    //can we restructure this state object? Do we need to have this inner login property?
    login: {
      title: "Manage Prizes",
      description: "Save time and manage your prizes through the prize box",
      image: "",
      //next two attributes - can we choose better names?
      condition: "welcome",
      classState: {
        login: "fade-inactive",
        register: "fade-inactive",
        retrieve: "fade-inactive",
        buttons: "fade-active",
      },
    },
    showScreen: false,
  };

  async componentDidMount() {
    const userLoggedIn = await isLoggedIn();
    if (userLoggedIn) {
      return navigate("/home");
    }

    this.setState({ showScreen: true });
  }

  chooseWelcomeTypeHandler = (e, type) => {
    e.preventDefault();
    let loginData = { ...this.state.login };
    loginData.classState.buttons = "fade-inactive";
    loginData.classState[type] = "fade-active";
    loginData.condition = type;
    this.setState({ login: loginData });
  };

  render() {
    let component = null;
    if (this.state.showScreen) {
      component = (
        <>
          <Helmet>
            <title>Kudos Login</title>
            <meta name="description" content="Kudos" />
          </Helmet>
          <div>
            <div className="bg bg--yellow">
              <div className="login-panel">
                <Content
                  condition={this.state.login.condition}
                  welcomeTypeHandler={this.chooseWelcomeTypeHandler}
                  classState={this.state.login.classState}
                />
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

    return component;
  }
}

export default Welcome;
