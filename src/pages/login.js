import * as React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import LoginContainer from "../components/login/LoginContainer";

class LoginPage extends React.Component {
  state = {
    login: {
      title: "Manage Prizes",
      description: "Save time and manage your prizes through the prize box",
      image: "",
      buttons: [
        {
          text: "Login",
          link: "",
          class: "btn-primary",
        },
        {
          text: "Sign-Up",
          link: "",
          class: "btn-primary--inverse",
        },
      ],
    },
  };

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Kudos Login</title>
          <meta name="description" content="Kudos" />
        </Helmet>
        <LoginContainer
          loginDetails={this.state.login}
          wysiwyg={
            <p>
              This is a <strong>paragraph</strong>
            </p>
          }
        ></LoginContainer>
      </Layout>
    );
  }
}

export default LoginPage;
