// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($id: ID!) {
    ListNeighbours(QuoteId: $id) {
      ClientId
      Name
      Email
      Address
      Suburb
      Phone
      Attention
      SendTo
    }
  }
`;

export default query;
