// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($id: ID!, $attachmentId: ID!) {
    DeleteAttachment(QuoteId: $id, AttachmentId: $attachmentId) {
      Status
      Message
      Id
    }
  }
`;

export default mutation;
