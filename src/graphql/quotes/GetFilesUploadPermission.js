// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($id: ID!, $fileType: String!) {
    GetFilesUploadPermission(QuoteId: $id, FileType: $fileType) {
      Url
      Fields
    }
  }
`;

export default query;
