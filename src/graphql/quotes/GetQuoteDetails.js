// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($id: ID!, $type: String!, $subtype: String!) {
    GetQuoteDetails(QuoteId: $id, QuoteDetailsType: $type, QuoteDetailsSubType: $subtype) {
      QuoteId
      QuoteDetailsType
      QuoteDetailsSubType
      QuoteDetails
    }
  }
`;

export default query;
