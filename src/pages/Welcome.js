import * as React from "react";
import { Helmet } from "react-helmet";
import Content from "../components/welcome/Content";
import ToyBoyImg from "../../src/images/toy-box.png";
import { isLoggedIn } from "../utils/auth";
import { navigate } from "gatsby";

class Welcome extends React.Component {
  state = {
    title: "Manage Prizes",
    description: "Save time and manage your prizes through the prize box",
    image: "",
    contentType: "welcome",
    contentClass: {
      login: "fade-inactive",
      register: "fade-inactive",
      retrieve: "fade-inactive",
      buttons: "fade-active",
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
    if (!e) {
      e.preventDefault();
    }
    let newCondition = this.state.contentType;
    let newContentClass = { ...this.state.contentClass };
    newContentClass.buttons = "fade-inactive";
    newContentClass[type] = "fade-active";
    newCondition = type;
    this.setState({ contentType: newCondition, contentClass: newContentClass });
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
                  contentType={this.state.contentType}
                  welcomeTypeHandler={this.chooseWelcomeTypeHandler}
                  contentClass={this.state.contentClass}
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
