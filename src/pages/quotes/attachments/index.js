import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardContent, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import QuoteFormHeader from '../header';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import GetQuote from 'graphql/quotes/GetQuote';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';
import AttachmentList from './tables/attachment-list';

/* Component */
const Attachments = () => {
  const { quoteId } = useParams();
  const [quote, setQuote] = useState(null);

  const navigate = useNavigate();

  /* GraphQL: GetQuoteDetails */
  const [doGetQuoteDetails] = useGraphQLLazyQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: '', subtype: '' }
  });

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

  /* Render */
  return (
    <>
      <QuoteFormHeader tabValue="9" quoteId={quoteId} quote={quote} />

      <Grid container spacing={3}>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>{quote ? <AttachmentList quoteId={quoteId} /> : null}</CardContent>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Attachments;
