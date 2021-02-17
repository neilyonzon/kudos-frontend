import * as React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import LoginContainer from "../components/login/LoginContainer";
import Form from "../components/forms/Form";

class FormTest extends React.Component {
  state = {
    login: {
      title: "",
      description: "",
      image: "",
      buttons: [],
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
          wysiwyg={<Form></Form>}
        ></LoginContainer>
      </Layout>
    );
  }
}

export default FormTest;
