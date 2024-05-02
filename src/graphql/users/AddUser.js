// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($email: String!, $name: String!, $role: String!, $password: String!) {
    AddUser(Email: $email, Name: $name, Role: $role, Password: $password) {
      Status
      Message
    }
  }
`;

export default mutation;
