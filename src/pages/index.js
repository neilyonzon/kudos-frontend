import React, { useState} from "react";
import { Router } from "@reach/router";
import Layout from "../components/global/Layout";
import Welcome from "./Welcome";
import Home from "./Home";
import { Helmet } from "react-helmet";
import "../sass/style.scss";

const IndexPage = () => {
  const [loginState, setLoginState] = useState(false);

  const updateLoginStatus = (status) => {
    setLoginState(status);
  }

  return (
    <Layout loginState={loginState} updateLoginStatus={updateLoginStatus}>
      <Helmet>
        <title>Kudos Login</title>
        <meta name="description" content="Kudos" />
      </Helmet>
      <Router>
        <Welcome path="/" />
        <Welcome path="/teacher" teacherLogin={true}/>
        <Home path="/home" updateLoginStatus={updateLoginStatus}/>
      </Router>
    </Layout>
  );
};

export default IndexPage;
