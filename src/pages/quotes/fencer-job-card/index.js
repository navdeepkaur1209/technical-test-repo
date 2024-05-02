import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Button, CardContent, Grid, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import FenceJobTable from './tables/fence-job';
import QuoteFormHeader from '../header';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import GetQuote from 'graphql/quotes/GetQuote';
import CreateJobCard from 'graphql/quotes/CreateJobCard';

/* Component */
const FencerJobCard = () => {
  const { quoteId } = useParams();
  const [quote, setQuote] = useState(null);
  const [reloadJobCard, setReloadJobCard] = useState(0);
  const dispatch = useDispatch();
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

  /* GraphQL: CreateJobCard */
  const [mutationCreateJobCard, { data: resultCreateJobCard, reset: resetCreateJobCard }] = useGraphQLMutation(CreateJobCard);

  const doMutation = () => {
    mutationCreateJobCard({
      variables: {
        id: quoteId
      }
    });
  };

  useEffect(() => {
    if (resultCreateJobCard && resultCreateJobCard.CreateJobCard.Status === 'SUCCESS') {
      dispatch(
        openSnackbar({
          open: true,
          message: resultCreateJobCard.CreateJobCard.Message,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      resetCreateJobCard();
      setReloadJobCard(Date.now());
    }
  }, [resultCreateJobCard, resetCreateJobCard, dispatch, setReloadJobCard]);

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
                  onClick={() => doMutation()}
                >
                  Create Job Card
                </Button>
                {quote ? <FenceJobTable quoteId={quoteId} reload={reloadJobCard} /> : null}
              </CardContent>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default FencerJobCard;
