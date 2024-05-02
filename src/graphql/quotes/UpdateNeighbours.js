// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($quoteId: ID!, $neighbours: [ID]) {
    UpdateNeighbours(QuoteId: $quoteId, Neighbours: $neighbours) {
      Status
      Message
      Id
    }
  }
`;

export default mutation;
