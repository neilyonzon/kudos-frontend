import React from 'react'
import { Router } from '@reach/router'
import Layout from '../components/Layout'
import Login from '../components/Login'
import Dummy from '../components/Dummy'
import CustomRoute from '../components/CustomRoute'

// markup
const IndexPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Kudos Login</title>
        <meta name="description" content="Kudos" />
      </Helmet>
      <Router>
        <CustomRoute path='/' component={Login} />
        <CustomRoute path='/dummy' component={Dummy} />
      </Router>
    </Layout>
  );
};

export default IndexPage;
