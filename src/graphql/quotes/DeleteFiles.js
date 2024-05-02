// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($id: ID!, $fileType: String!, $files: [String]) {
    DeleteFiles(QuoteId: $id, FileType: $fileType, Files: $files) {
      Status
      Message
      Id
    }
  }
`;

export default mutation;
