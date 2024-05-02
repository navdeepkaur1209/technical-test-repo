// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($pagination: InputPagination) {
    ListItems(Pagination: $pagination) {
      Items
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
