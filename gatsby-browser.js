import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'https://kudos-backend.herokuapp.com/graphql',
        credentials: 'include'
    })
})

export const wrapRootElement = ({ element }) =>(
    <ApolloProvider client={client}>{element}</ApolloProvider>
)