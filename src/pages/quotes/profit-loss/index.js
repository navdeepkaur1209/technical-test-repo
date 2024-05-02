import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardContent, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import QuoteFormHeader from '../header';
import FenceItemsTable from './tables/fence-items';
import LabourItemsTable from './tables/labour-items';
import GateItemsTable from './tables/gate-items';
import ProfitLossTable from './tables/profit-loss';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import GetQuote from 'graphql/quotes/GetQuote';
import ListData from 'graphql/data/ListData';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';

/* Component */
const ProfitLoss = () => {
  const { quoteId } = useParams();
  const [quote, setQuote] = useState(null);
  const [paling, setPaling] = useState(null);
  const [heights, setHeights] = useState([]);
  const [profitLossFenceItems, setProfitLossFenceItems] = useState({});
  const [profitLossLabourItems, setProfitLossLabourItems] = useState({});
  const [profitLossGateItems, setProfitLossGateItems] = useState([]);
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
      <QuoteFormHeader tabValue="4" quoteId={quoteId} quote={quote} />

      <Grid container spacing={3}>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>
                {quote ? (
                  <FenceItemsTable quoteId={quoteId} paling={paling} heights={heights} setProfitLoss={setProfitLossFenceItems} />
                ) : null}
              </CardContent>
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>{quote ? <LabourItemsTable quoteId={quoteId} setProfitLoss={setProfitLossLabourItems} /> : null}</CardContent>
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>{quote ? <GateItemsTable quoteId={quoteId} setProfitLoss={setProfitLossGateItems} /> : null}</CardContent>
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>
                {quote ? (
                  <ProfitLossTable
                    quoteId={quoteId}
                    profitLossFenceItems={profitLossFenceItems}
                    profitLossLabourItems={profitLossLabourItems}
                    profitLossGateItems={profitLossGateItems}
                  />
                ) : null}
              </CardContent>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfitLoss;
