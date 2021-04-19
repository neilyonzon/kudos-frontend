import React from "react";
import { Router } from "@reach/router";
import Layout from "../components/global/Layout";
import Login from "./Login";
import Home from "../components/Home";
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
        <Login path="/" />
        <Home path="/home" />
      </Router>
    </Layout>
  );
};

export default IndexPage;
