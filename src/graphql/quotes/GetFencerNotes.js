// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($id: ID!) {
    GetFencerNotes(QuoteId: $id) {
      QuoteId
      QuoteDetailsType
      QuoteDetailsSubType
      QuoteDetails
    }
  }
`;

export default query;
