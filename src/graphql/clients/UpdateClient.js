// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($id: ID!, $client: InputClient!) {
    UpdateClient(ClientId: $id, Client: $client) {
      Status
      Message
      Id
    }
  }
`;

export default mutation;
