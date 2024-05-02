// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($id: ID!) {
    GetQuote(QuoteId: $id) {
      QuoteId
      QuoteNumber
      QuoteDate
      QuoteStatus
      QuoteType
      User {
        UserId
        Email
        Name
        Role
        Mobile
      }
      Client {
        ClientId
        Name
        Email
        Address
        Suburb
        Phone
        Attention
        SendTo
      }
      Neighbours
    }
  }
`;

export default query;
