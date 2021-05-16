import React from 'react';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { retrieveAcsToken } from './src/utils/auth';

const httpLink = createHttpLink({
    uri: 'https://kudos-backend.herokuapp.com/graphql',
    credentials: 'include'
})

const authLink = setContext(async (_, { headers }) => {
    const accessToken = await retrieveAcsToken()
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