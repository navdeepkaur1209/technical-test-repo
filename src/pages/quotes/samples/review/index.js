import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardContent, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import ReviewTable from './tables/review-table';
import QuoteFormHeader from '../header';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import GetQuote from 'graphql/quotes/GetQuote';
import ListData from 'graphql/data/ListData';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';
import ReviewDateTable from './tables/review-date-table';

/* Component */
const Review = () => {
  const { quoteId } = useParams();
  const [quote, setQuote] = useState(null);
  const [paling, setPaling] = useState(null);
  const [heights, setHeights] = useState([]);
  const navigate = useNavigate();

  /* GraphQL: GetQuoteDetails */
  const [doGetQuoteDetails, { data: dataGetQuoteDetails }] = useGraphQLLazyQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: '', subtype: '' }
  });

  useEffect(() => {
    if (dataGetQuoteDetails && dataGetQuoteDetails.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetails.GetQuoteDetails.QuoteDetails);
      if (data.length) {
        setPaling(data[0]);
      }
    }
  }, [dataGetQuoteDetails, setPaling]);

  /* GraphQL: GetQuote */
  const { data: dataGetQuote } = useGraphQLQuery(GetQuote, { variables: { id: quoteId } });

  useEffect(() => {
    if (dataGetQuote && dataGetQuote.GetQuote && quoteId) {
      if (dataGetQuote.GetQuote.QuoteId) {
        setQuote(dataGetQuote.GetQuote);
        doGetQuoteDetails({
          variables: {
            id: quoteId,
            type: 'SPECS',
            subtype: dataGetQuote.GetQuote.QuoteType
          }
        });
      } else {
        navigate('/jobs');
      }
    }
  }, [navigate, quoteId, dataGetQuote, doGetQuoteDetails]);

  /* GraphQL: ListData */
  const { data: dataListDataHeights } = useGraphQLQuery(ListData, {
    variables: { datatype: 'HEIGHTS', pagination: {} }
  });

  useEffect(() => {
    if (dataListDataHeights && dataListDataHeights.ListData && dataListDataHeights.ListData.Data) {
      setHeights(() =>
        dataListDataHeights.ListData.Data.map((d) => {
          return {
            Key: d.DataId,
            Value: d.DataMainValue,
            Data: JSON.parse(d.Data)
          };
        })
      );
    }
  }, [dataListDataHeights]);

  /* Render */
  return (
    <>
      <QuoteFormHeader tabValue="6" quoteId={quoteId} quote={quote} />

      <Grid container spacing={3}>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>{quote ? <ReviewTable quoteId={quoteId} /> : null}</CardContent>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>{quote ? <ReviewDateTable quoteId={quoteId} /> : null}</CardContent>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Review;
