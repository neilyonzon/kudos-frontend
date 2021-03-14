import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:3000/graphql'
    }),
    credentials: 'include'
})

export const wrapRootElement = ({ element }) =>(
    <ApolloProvider client={client}>{element}</ApolloProvider>
)