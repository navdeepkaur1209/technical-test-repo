// GraphQL.
import { useQuery } from '@apollo/client';
import { useGraphQLErrorHandler } from 'hooks/useGraphQLErrorHandler';

// ==============================|| GRAPHQL ||============================== //

function useGraphQLQuery(gql, options) {
  const graphqlErrorHandler = useGraphQLErrorHandler();

  return useQuery(gql, { fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true, onError: graphqlErrorHandler, ...options });
}

export default useGraphQLQuery;
