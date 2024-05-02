// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($email: String!) {
    DeleteUser(Email: $email) {
      Status
      Message
    }
  }
`;

export default mutation;
