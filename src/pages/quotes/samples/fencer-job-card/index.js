import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, CardContent, Grid, Typography } from '@mui/material';
import QuoteFormHeader from '../header';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import GetQuote from 'graphql/quotes/GetQuote';
import MainCard from 'components/MainCard';
import FenceJobTable from './tables/fence-job-table';

/* Component */
const FencerJobCard = () => {
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
      <QuoteFormHeader tabValue="8" quoteId={quoteId} quote={quote} />
      <Grid container spacing={3}>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>
                <Typography variant="h4">Quote Type : PAILING</Typography>
                <Button
                  sx={{ marginBottom: 2, marginTop: 2 }}
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => formikArrayRef.current.push(newRowInitialValue)}
                >
                  Create Job Sheet
                </Button>
                {quote ? <FenceJobTable quoteId={quoteId} quote={quote} /> : null}
              </CardContent>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default FencerJobCard;
