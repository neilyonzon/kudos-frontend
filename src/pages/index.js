import React from "react";
import { Router } from "@reach/router";
import Layout from "../components/global/Layout";
import Login from "./Login";
import Dashboard from "../components/Dashboard";
import CustomRoute from "../components/CustomRoute";
import { Helmet } from "react-helmet";
import "../sass/style.scss";

// markup
const IndexPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Kudos Login</title>
        <meta name="description" content="Kudos" />
      </Helmet>
      <Router>
        <CustomRoute path="/" component={Login} />
        <CustomRoute path="/dashboard" component={Dashboard} />
      </Router>
    </Layout>
  );
};

export default IndexPage;
