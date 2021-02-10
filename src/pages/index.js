import React from 'react'
import { Router } from '@reach/router'
import Layout from '../components/Layout'
import Login from '../components/Login'
import Dummy from '../components/Dummy'

// markup
const IndexPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Kudos Login</title>
        <meta name="description" content="Kudos" />
      </Helmet>
      <Router>
        <Login path="/"/>
        <Dummy path="/dummy"/>
      </Router>
    </Layout>
  );
};

export default IndexPage;
