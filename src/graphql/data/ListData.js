// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($datatype: String!, $pagination: InputPagination) {
    ListData(DataType: $datatype, Pagination: $pagination) {
      Data {
        DataId
        DataType
        DataOrder
        DataMainValue
        Data
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
