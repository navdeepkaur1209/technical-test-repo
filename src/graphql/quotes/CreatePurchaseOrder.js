// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($id: ID!, $supplierId: ID!) {
    CreatePurchaseOrder(QuoteId: $id, SupplierId: $supplierId) {
      Status
      Message
      Id
    }
  }
`;

export default mutation;
