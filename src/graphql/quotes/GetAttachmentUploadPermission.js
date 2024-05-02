// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($id: ID!, $attachmentId: ID!) {
    GetAttachmentUploadPermission(QuoteId: $id, AttachmentId: $attachmentId) {
      Url
      Fields
    }
  }
`;

export default query;
