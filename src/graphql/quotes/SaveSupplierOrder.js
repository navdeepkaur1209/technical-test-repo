// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($id: ID!, $sk: String!, $supplier: ID!) {
    SaveSupplierOrder(QuoteId: $id, QuoteSk: $sk, SupplierId: $supplier) {
      Status
      Message
      Id
    }
  }
`;

export default mutation;
