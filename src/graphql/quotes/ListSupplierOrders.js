// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($id: ID!) {
    ListSupplierOrders(QuoteId: $id) {
      QuoteId
      QuoteSk
      Suppliers
      Details
    }
  }
`;

export default query;
