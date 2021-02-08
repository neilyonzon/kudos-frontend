import * as React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import LoginContainer from "../components/login/LoginContainer";

class LoginPage extends React.Component {
  state = {
    title: "Manage Prizes",
    description: "Save time and manage your prizes through the prize box",
    image: "",
  };

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Kudos Login</title>
          <meta name="description" content="Kudos" />
        </Helmet>
        <LoginContainer details={this.state}></LoginContainer>
      </Layout>
    );
  }
}

export default LoginPage;
