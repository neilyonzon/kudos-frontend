import * as React from "react";
import { Helmet } from "react-helmet";
import Layout from "../../components/global/Layout";
import Form from "../../components/forms/FormStarter";

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
      </Layout>
    );
  }
}

export default FormTest;
