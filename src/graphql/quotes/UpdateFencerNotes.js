// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($id: ID!, $notes: String) {
    UpdateFencerNotes(QuoteId: $id, FencerNotes: $notes) {
      Status
      Message
      Id
    }
  }
`;

export default mutation;
