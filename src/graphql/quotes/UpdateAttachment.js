// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($id: ID!, $attachmentId: ID!, $attachment: InputAttachment) {
    UpdateAttachment(QuoteId: $id, AttachmentId: $attachmentId, Attachment: $attachment) {
      Status
      Message
      Id
    }
  }
`;

export default mutation;
