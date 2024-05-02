// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($id: ID!) {
    CreateJobCard(QuoteId: $id) {
      Status
      Message
      Id
    }
  }
`;

export default mutation;
