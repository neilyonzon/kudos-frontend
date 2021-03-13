import React from "react";
import { Router } from "@reach/router";
import Layout from "../components/global/Layout";
import Login from "./Login";
import Dashboard from "../components/Dashboard";
import { Helmet } from "react-helmet";
import "../sass/style.scss";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
})

// markup
const IndexPage = () => {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Helmet>
          <title>Kudos Login</title>
          <meta name="description" content="Kudos" />
        </Helmet>
        <Router>
          <Login path="/" />
          <Dashboard path="/dashboard" />
        </Router>
      </Layout>
    </ApolloProvider>
  );
};

export default IndexPage;
