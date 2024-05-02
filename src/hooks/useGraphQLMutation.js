// GraphQL.
import { useMutation } from '@apollo/client';
import { useGraphQLErrorHandler } from 'hooks/useGraphQLErrorHandler';

// ==============================|| GRAPHQL ||============================== //

function useGraphQLMutation(gql) {
  const graphqlErrorHandler = useGraphQLErrorHandler();

  return useMutation(gql, { onError: graphqlErrorHandler });
}

export default useGraphQLMutation;
