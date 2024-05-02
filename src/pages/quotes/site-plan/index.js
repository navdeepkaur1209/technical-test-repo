import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FencerNotesTable from './tables/fencer-notes';
import PhotosTable from './tables/photos';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import GetQuote from 'graphql/quotes/GetQuote';
import QuoteFormHeader from '../header';
import SitePlanStage from './tables/site-plan-stage';

/* Component */
const SitePlan = () => {
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
      <QuoteFormHeader tabValue="5" quoteId={quoteId} quote={quote} />
      {quote ? <SitePlanStage quoteId={quoteId} /> : null}
      {quote ? <FencerNotesTable quoteId={quoteId} /> : null}
      {quote ? <PhotosTable quoteId={quoteId} /> : null}
    </>
  );
};

export default SitePlan;
