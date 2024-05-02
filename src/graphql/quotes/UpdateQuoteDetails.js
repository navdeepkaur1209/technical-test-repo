// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($id: ID!, $type: String!, $subtype: String!, $details: AWSJSON!) {
    UpdateQuoteDetails(QuoteId: $id, QuoteDetailsType: $type, QuoteDetailsSubType: $subtype, QuoteDetails: $details) {
      Status
      Message
      Id
    }
  }
`;

export default mutation;
