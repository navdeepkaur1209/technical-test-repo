// GraphQL.
import { useLazyQuery } from '@apollo/client';
import { useGraphQLErrorHandler } from 'hooks/useGraphQLErrorHandler';

// ==============================|| GRAPHQL ||============================== //

function useGraphQLLazyQuery(gql, options) {
  const graphqlErrorHandler = useGraphQLErrorHandler();

  return useLazyQuery(gql, { fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true, onError: graphqlErrorHandler, ...options });
}

export default useGraphQLLazyQuery;
