import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

function useGraphQLClient(endpoint) {
  const httpLink = createHttpLink({
    uri: endpoint
  });

  const authLink = setContext((_, { headers }) => {
    const serviceToken = window.localStorage.getItem('serviceToken');
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${serviceToken}`
      }
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
}

export default useGraphQLClient;
