// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($id: ID!, $supplierId: ID!) {
    GetPurchaseOrder(QuoteId: $id, SupplierId: $supplierId) {
      QuoteId
      QuoteDetailsType
      QuoteDetailsSubType
      QuoteDetails
    }
  }
`;

export default query;
