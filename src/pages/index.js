import * as React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";

// markup
const IndexPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Kudos Login</title>
        <meta name="description" content="Kudos" />
      </Helmet>
    </Layout>
  );
};

export default IndexPage;
