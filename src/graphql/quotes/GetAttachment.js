// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($id: ID!, $attachmentId: ID!) {
    GetAttachment(QuoteId: $id, AttachmentId: $attachmentId) {
      QuoteId
      AttachmentId
      Url
      FileExtension
      Title
      Description
      User {
        UserId
        Email
        Name
        Role
        Mobile
      }
    }
  }
`;

export default query;
