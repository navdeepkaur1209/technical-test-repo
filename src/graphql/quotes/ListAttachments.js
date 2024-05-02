// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($id: ID!) {
    ListAttachments(QuoteId: $id) {
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
