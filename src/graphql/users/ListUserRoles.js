// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query {
    ListUserRoles {
      Role
    }
  }
`;

export default query;
