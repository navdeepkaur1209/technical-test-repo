// GraphQL.
import { gql } from '@apollo/client';

// ==============================|| GRAPHQL ||============================== //

const query = gql`
  query query($pagination: InputPagination) {
    ListQuotes(Pagination: $pagination) {
      Quotes {
        QuoteId
        QuoteNumber
        QuoteDate
        QuoteStatus
        QuoteType
        User {
          UserId
          Email
          Name
          Role
          Mobile
        }
        Client {
          ClientId
          Name
          Email
          Address
          Suburb
          Phone
          Attention
          SendTo
        }
        Neighbours
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
