// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($id: ID!, $details: AWSJSON!) {
    UpdateQuotePackage(QuoteId: $id, PackageDetails: $details) {
      Status
      Message
      Id
      Data
    }
  }
`;

export default mutation;
