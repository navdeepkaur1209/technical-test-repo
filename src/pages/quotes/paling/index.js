import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, CardContent, Grid, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import QuoteFormHeader from '../header';
import PalingTable from './tables/paling';
import FenceTable from './tables/fence';
import AdditionalWorksTable from './tables/additional-works';
import ClientRequestsTable from './tables/client-requests';
import ExtraLabourTable from './tables/extra-labour';
import OptionalsTable from './tables/optionals';
import TotalTable from './tables/total';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import GetQuote from 'graphql/quotes/GetQuote';
import { RightOutlined } from '@ant-design/icons';

/* Component */
const Paling = () => {
  const { quoteId } = useParams();
  const [quote, setQuote] = useState(null);
  const [total, setTotal] = useState({ MAIN: { cost: 0, client: 0, neighbours: [] } });
  const [metres, setMetres] = useState(0);
  const navigate = useNavigate();
  const formsRef = useRef([0, 0]);

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

  useEffect(() => {
    if (quote) {
      updateTotal('MAIN', {
        cost: 0,
        client: 0,
        neighbours: Array(quote.Neighbours ? quote.Neighbours : 0).fill(0)
      });
    }
  }, [quote]);

  const updateTotal = (key, subtotal) => {
    setTotal((total) => {
      const newTotal = { ...total };
      newTotal[key] = subtotal;
      return newTotal;
    });
  };

  const updateMetres = (newMetres) => {
    setMetres(newMetres);
  };

  const saveForms = () => {
    formsRef.current.map((n) => {
      n.click();
    });
  };

  /* Render */
  return (
    <>
      <QuoteFormHeader tabValue="2" quoteId={quoteId} quote={quote} />

      <Grid container spacing={3}>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={5} xs={12}>
                    <Typography variant="h6" color={'red'}>
                      CLIENT TO CONFIRM ANY COUNCIL PERMITS REQUIRED
                      <RightOutlined />
                    </Typography>
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <Typography variant="h6" color={'red'}>
                      ALL OWNERS NAMES AND DETAILS MUST BE SUPPLIED
                      <RightOutlined />
                    </Typography>
                  </Grid>
                  <Grid item md={9} xs={12}>
                    <Typography variant="h6">
                      Standard Treated Pine paling fences are built to follow the existing land contour/slope for level construction see
                      option #6 below (request price if required).
                    </Typography>
                    <Typography variant="h6">Standard Treated Pine paling fences includes the following material:</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {quote ? (
                      <PalingTable
                        quoteId={quoteId}
                        neighbours={quote && quote.Neighbours ? quote.Neighbours : 0}
                        formsRef={formsRef}
                        updateTotal={updateTotal}
                        updateMetres={updateMetres}
                      />
                    ) : null}
                  </Grid>
                  <Grid item width={247}></Grid>
                  <Grid item sx={{ width: 'calc(100% - 247)' }}>
                    <Typography variant="h6" color="red" align="center">
                      Above includes starter posts and construction to existing land contour/slope If you require a special finish - please
                      ask to be quoted
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {quote ? <FenceTable quoteId={quoteId} formsRef={formsRef} /> : null}
                  </Grid>
                  <Grid item xs={12} justifyContent={'flex-end'} display={'flex'}>
                    <Button variant="contained" color="primary" onClick={saveForms}>
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>
                {quote ? (
                  <AdditionalWorksTable
                    quoteId={quoteId}
                    metres={metres}
                    neighbours={quote && quote.Neighbours ? quote.Neighbours : 0}
                    updateTotal={updateTotal}
                  />
                ) : null}
              </CardContent>
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>{quote ? <ClientRequestsTable quoteId={quoteId} /> : null}</CardContent>
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>
                {quote ? (
                  <ExtraLabourTable
                    quoteId={quoteId}
                    metres={metres}
                    neighbours={quote && quote.Neighbours ? quote.Neighbours : 0}
                    updateTotal={updateTotal}
                  />
                ) : null}
              </CardContent>
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>
                {quote ? (
                  <TotalTable total={total} includeOptions={false} neighbours={quote && quote.Neighbours ? quote.Neighbours : 0} />
                ) : null}
              </CardContent>
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>
                {quote ? (
                  <OptionalsTable
                    quoteId={quoteId}
                    metres={metres}
                    neighbours={quote && quote.Neighbours ? quote.Neighbours : 0}
                    updateTotal={updateTotal}
                  />
                ) : null}
              </CardContent>
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>
                {quote ? (
                  <TotalTable total={total} includeOptions={true} neighbours={quote && quote.Neighbours ? quote.Neighbours : 0} />
                ) : null}
              </CardContent>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Paling;
