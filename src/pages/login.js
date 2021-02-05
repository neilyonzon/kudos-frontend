import * as React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import ToyBoyImg from "../../src/images/toy-box.png";

const LoginPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Kudos Login</title>
        <meta name="description" content="Kudos" />
      </Helmet>
      <div className="bg bg--yellow">
        <div className="login-panel">
          <div className="login-panel__content">
            <h1>Manage Prizes</h1>
            <p>Organize and save time with our prize management tool.</p>
            <div className="login-panel__cta-box">
              <button className="btn btn-primary">Login</button>
              <button className="btn btn-primary--inverse">Sign-Up</button>
            </div>
          </div>
          <div className="login-panel__line"></div>
          <div className="login-panel__img">
            <img src={ToyBoyImg} alt="Toy Box Illustration"></img>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
