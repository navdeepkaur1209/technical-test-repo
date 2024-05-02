// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($id: ID!) {
    ListPurchaseOrders(QuoteId: $id) {
      QuoteId
      SupplierId
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
      Items
      DeliveryDate
      SupplierName
      PO
    }
  }
`;

export default query;
