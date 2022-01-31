import fetch from 'cross-fetch'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { retrieveAcsToken } from '../utils/auth';

const httpLink = createHttpLink({
    uri: 'https://kudos-backend.herokuapp.com/graphql',
    fetch,
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

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})