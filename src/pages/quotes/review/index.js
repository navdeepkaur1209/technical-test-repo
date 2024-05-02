import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardContent, Grid } from '@mui/material';

import MainCard from 'components/MainCard';
import ReviewTable from './tables/review';
import QuoteFormHeader from '../header';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import GetQuote from 'graphql/quotes/GetQuote';
import ReviewDateTable from './tables/review-date-table';

/* Component */
const Review = () => {
  const { quoteId } = useParams();
  const [quote, setQuote] = useState(null);
  const navigate = useNavigate();

  /* GraphQL: GetQuote */
  const { data: dataGetQuote } = useGraphQLQuery(GetQuote, { variables: { id: quoteId } });

  useEffect(() => {
    if (dataGetQuote && dataGetQuote.GetQuote && quoteId) {
      if (dataGetQuote.GetQuote.QuoteId) {
        setQuote(dataGetQuote.GetQuote);
      } else {
        navigate('/jobs');
      }
    }
  }, [navigate, quoteId, dataGetQuote]);

  /* Render */
  return (
    <>
      <QuoteFormHeader tabValue="6" quoteId={quoteId} quote={quote} />

      <Grid container spacing={3}>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>{quote ? <ReviewTable quoteId={quoteId} quote={quote} /> : null}</CardContent>
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
