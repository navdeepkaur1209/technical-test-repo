// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($id: ID!, $attachment: InputAttachment) {
    AddAttachment(QuoteId: $id, Attachment: $attachment) {
      Status
      Message
      Id
    }
  }
`;

export default mutation;
