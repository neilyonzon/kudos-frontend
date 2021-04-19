import React from "react";
import { Router } from "@reach/router";
import Layout from "../components/global/Layout";
import Welcome from "./welcome";
import Login from "../components/welcome/LoginForm";
import Dashboard from "../components/Dashboard";
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
        <Welcome path="/" />
        <Dashboard path="/dashboard" />
      </Router>
    </Layout>
  );
};

export default IndexPage;
