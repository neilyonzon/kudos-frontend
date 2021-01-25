import * as React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";

// markup
const IndexPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Kudos Login</title>
      </Helmet>
      <h1>Login</h1>
    </Layout>
  );
};

export default IndexPage;
