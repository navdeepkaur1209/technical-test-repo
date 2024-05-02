// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($id: ID!, $filetype: String!, $supplierId: ID) {
    GetQuotePdfLink(QuoteId: $id, FileType: $filetype, SupplierId: $supplierId) {
      QuoteId
      FileType
      ContentType
      Url
    }
  }
`;

export default query;
