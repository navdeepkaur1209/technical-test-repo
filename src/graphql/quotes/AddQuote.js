// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($quoteType: String!, $clientId: ID!) {
    AddQuote(QuoteType: $quoteType, ClientId: $clientId) {
      Status
      Message
      Id
    }
  }
`;

export default mutation;
