// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($id: ID!, $supplierId: ID!, $details: AWSJSON!) {
    UpdatePurchaseOrder(QuoteId: $id, SupplierId: $supplierId, QuoteDetails: $details) {
      Status
      Message
      Id
    }
  }
`;

export default mutation;
