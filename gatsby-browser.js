import React from 'react';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { getAcsToken } from './src/utils/auth';

const httpLink = createHttpLink({
    uri: 'https://kudos-backend.herokuapp.com/graphql',
    credentials: 'include'
})

const authLink = setContext((_, { headers }) => {
    const accessToken = getAcsToken()
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export const wrapRootElement = ({ element }) =>(
    <ApolloProvider client={client}>{element}</ApolloProvider>
)