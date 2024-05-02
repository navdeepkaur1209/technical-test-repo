// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const mutation = gql`
  mutation mutation($client: InputClient!) {
    AddClient(Client: $client) {
      Status
      Message
      Id
    }
  }
`;

export default mutation;
