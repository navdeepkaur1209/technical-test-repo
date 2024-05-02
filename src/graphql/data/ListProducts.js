// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($item: String!, $pagination: InputPagination) {
    ListProducts(Item: $item, Pagination: $pagination) {
      Products {
        ProductId
        Item
        Product
        ProductOrder
        SellPrice
        Suppliers
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
