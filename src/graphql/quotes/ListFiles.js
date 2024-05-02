// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($id: ID!, $fileType: String!) {
    ListFiles(QuoteId: $id, FileType: $fileType)
  }
`;

export default query;
