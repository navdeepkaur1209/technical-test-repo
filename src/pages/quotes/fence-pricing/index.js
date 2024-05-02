import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardContent, Grid, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import QuoteFormHeader from '../header';
import PricingTable from './tables/pricing';
import CompareTable from './tables/compare';
import GateChargesTable from './tables/gate-charges';
import TotalPostsCalculationTable from './tables/total-posts-calculation';
import CementCalculationTable from './tables/cement-calculation';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import GetQuote from 'graphql/quotes/GetQuote';
import ListData from 'graphql/data/ListData';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';

/* Component */
const FencePricing = () => {
  const { quoteId } = useParams();
  const [quote, setQuote] = useState(null);
  const [paling, setPaling] = useState(null);
  const [heights, setHeights] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [starterPosts, setStarterPosts] = useState([]);
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
      <QuoteFormHeader tabValue="3" quoteId={quoteId} quote={quote} />

      <Grid container spacing={3}>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>
                {quote ? (
                  <PricingTable
                    quoteId={quoteId}
                    paling={paling}
                    heights={heights}
                    setCurrentProduct={setCurrentProduct}
                    setStarterPosts={setStarterPosts}
                  />
                ) : null}
              </CardContent>
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>
                {quote && currentProduct ? <CompareTable quoteId={quoteId} currentProduct={currentProduct} /> : null}
              </CardContent>
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>{quote ? <GateChargesTable quoteId={quoteId} /> : null}</CardContent>
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h3">Total Posts Calulation</Typography>
                  </Grid>
                  {quote && currentProduct ? (
                    <TotalPostsCalculationTable quoteId={quoteId} currentProduct={currentProduct} starterPosts={starterPosts} />
                  ) : null}
                </Grid>
              </CardContent>
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h3">Cement Calulation</Typography>
                  </Grid>
                  {quote && currentProduct ? (
                    <CementCalculationTable quoteId={quoteId} currentProduct={currentProduct} starterPosts={starterPosts} />
                  ) : null}
                </Grid>
              </CardContent>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default FencePricing;
