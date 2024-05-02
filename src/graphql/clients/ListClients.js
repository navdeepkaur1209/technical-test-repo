// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($pagination: InputPagination) {
    ListClients(Pagination: $pagination) {
      Clients {
        ClientId
        Name
        Email
        Address
        Suburb
        Phone
        Attention
        SendTo
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
