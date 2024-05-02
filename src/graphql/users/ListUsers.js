// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($Pagination: InputPagination) {
    ListUsers(Pagination: $Pagination) {
      Users {
        UserId
        Email
        Name
        Role
      }
      Pagination {
        Filters
        SortBy
        SizePerPage
        Page
        Total
      }
    }
  }
`;

export default query;
