import { useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, CardContent, Grid } from '@mui/material';
import { PlusSquareFilled } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import QuoteFormHeader from '../header';
import Client from './tables/client';
import Neighbour from './tables/neighbour';
import { createPathFromArray } from 'utils/helpers';
import { Formik, Form, FieldArray, getIn } from 'formik';
import * as yup from 'yup';
import { quotesAmmount } from 'store/reducers/quotes';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import GetQuote from 'graphql/quotes/GetQuote';
import ListNeighbours from 'graphql/quotes/ListNeighbours';
import UpdateNeighbours from 'graphql/quotes/UpdateNeighbours';
import ListClients from 'graphql/clients/ListClients';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';

/* Static methods and values */
const neighboursMax = 4;
const newNeighbourValue = {
  ClientId: '',
  Email: '',
  Address: '',
  Phone: '',
  Suburb: '',
  Attention: '',
  Sendto: ''
};

const formikInitialValues = {
  clients: [newNeighbourValue]
};

const formikValidationSchema = yup.object({
  clients: yup.array().of(
    yup.object().shape({
      ClientId: yup
        .string()
        .required('Client is required')
        .test('unique-client', 'Client or neighbour repeated', (v, e) => {
          const clients = e.from && e.from.length > 1 && e.from[1].value && e.from[1].value.clients ? e.from[1].value.clients : [];
          return v && v.length && clients.length ? clients.filter((c) => c.ClientId == v).length === 1 : true;
        })
    })
  )
});

/* Component */
const ClientInfo = () => {
  const { quoteId } = useParams();
  const formikRef = useRef();
  const formikArrayRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const computeTotal = useRef({
    cost: 0,
    client: 0,
    neighbours: []
  });

  /* GraphQL: UpdateNeighbours */
  const [mutationUpdateNeighbours, { data: resultUpdateNeighbours }] = useGraphQLMutation(UpdateNeighbours);
  const doUpdateNeighbours = useCallback(
    (quoteId, neighbours) => {
      mutationUpdateNeighbours({
        variables: {
          quoteId: quoteId,
          neighbours: neighbours.map((n) => n.ClientId)
        }
      });
    },
    [mutationUpdateNeighbours]
  );

  useEffect(() => {
    if (resultUpdateNeighbours && resultUpdateNeighbours.UpdateNeighbours) {
      if (resultUpdateNeighbours.UpdateNeighbours.Status === 'SUCCESS') {
        dispatch(
          openSnackbar({
            open: true,
            message: resultUpdateNeighbours.UpdateNeighbours.Message,
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
      }
    }
  }, [resultUpdateNeighbours, dispatch, navigate]);

  /* GraphQL: ListNeighbours */
  const [doListNeighbours, { data: dataListNeighbours }] = useGraphQLLazyQuery(ListNeighbours, {
    variables: { id: quoteId }
  });

  useEffect(() => {
    if (dataListNeighbours && dataListNeighbours.ListNeighbours) {
      const clients = [getIn(formikRef.current.values, `clients`)[0]];
      for (let i = 0; i < dataListNeighbours.ListNeighbours.length; i++) {
        const { ClientId, Email, Address, Phone, Suburb, Attention, Sendto } = dataListNeighbours.ListNeighbours[i];
        clients.push({ ClientId, Email, Address, Phone, Suburb, Attention, Sendto });
      }
      formikRef.current.setFieldValue('clients', clients);
    }
  }, [dataListNeighbours]);

  /* GraphQL: GetQuote */
  const { data: dataGetQuote } = useGraphQLQuery(GetQuote, { variables: { id: quoteId } });

  useEffect(() => {
    if (dataGetQuote && dataGetQuote.GetQuote && quoteId) {
      if (dataGetQuote.GetQuote.QuoteId) {
        ['ClientId', 'Email', 'Address', 'Phone', 'Suburb', 'Attention', 'SendTo'].map((f) => {
          formikRef.current.setFieldValue(`clients[0].${f}`, [dataGetQuote.GetQuote.Client[f], ''].join(''));
        });
        doListNeighbours();
      } else {
        navigate(createPathFromArray(['jobs']));
      }
    }
  }, [navigate, quoteId, dataGetQuote, doListNeighbours]);

  /* GraphQL: ListClients */
  const { data: dataListClients } = useGraphQLQuery(ListClients, { variables: { pagination: {} } });

  /* GraphQL: GetQuoteDetails */
  const { data: dataGetQuoteDetailsPaling } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: 'SPECS', subtype: 'PALING' }
  });

  const { data: dataGetQuoteDetailsExtraLabour } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: 'SPECS', subtype: 'EXTRA_LABOUR' }
  });

  const { data: dataGetQuoteDetailsAdditionalWorks } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: 'SPECS', subtype: 'ADDITIONAL_WORKS' }
  });

  const { data: dataGetQuoteDetailsMain } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: 'SPECS', subtype: 'MAIN' }
  });

  const { data: dataGetQuoteDetailsOptions } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: 'SPECS', subtype: 'OPTIONALS' }
  });

  useEffect(() => {
    if (dataListNeighbours && quoteId) {
      computeTotal.current.neighbours = dataListNeighbours.ListNeighbours.length && Array(dataListNeighbours.ListNeighbours.length).fill(0);
      console.log(computeTotal.current.neighbours);
      if (dataGetQuoteDetailsPaling && dataGetQuoteDetailsPaling.GetQuoteDetails) {
        const data = JSON.parse(dataGetQuoteDetailsPaling.GetQuoteDetails.QuoteDetails);
        if (data.length) {
          for (let k in data) {
            computeTotal.current.cost += Number(data[k].cost);
            computeTotal.current.client += Number(data[k].client);
            if (computeTotal.current.neighbours.length && data[k].neighbours) {
              for (let j = 0; j < data[k].neighbours.length; j++) {
                computeTotal.current.neighbours[j] += Number(data[k].neighbours[j]);
              }
            }
          }
        }
      }
      if (dataGetQuoteDetailsExtraLabour && dataGetQuoteDetailsExtraLabour.GetQuoteDetails) {
        const data = JSON.parse(dataGetQuoteDetailsExtraLabour.GetQuoteDetails.QuoteDetails);
        console.log(data);
        if (data.length) {
          for (let k in data) {
            computeTotal.current.cost += Number(data[k].cost);
            computeTotal.current.client += Number(data[k].client);
            if (computeTotal.current.neighbours.length && data[k].neighbours) {
              console.log(data[k].neighbours);
              for (let j = 0; j < data[k].neighbours.length; j++) {
                computeTotal.current.neighbours[j] += Number(data[k].neighbours[j]);
              }
            }
          }
        }
      }
      if (dataGetQuoteDetailsAdditionalWorks && dataGetQuoteDetailsAdditionalWorks.GetQuoteDetails) {
        const data = JSON.parse(dataGetQuoteDetailsAdditionalWorks.GetQuoteDetails.QuoteDetails);
        if (data.length) {
          for (let k in data) {
            computeTotal.current.cost += Number(data[k].cost);
            computeTotal.current.client += Number(data[k].client);
            if (computeTotal.current.neighbours.length && data[k].neighbours) {
              for (let j = 0; j < data[k].neighbours.length; j++) {
                computeTotal.current.neighbours[j] += Number(data[k].neighbours[j]);
              }
            }
          }
        }
      }
      if (dataGetQuoteDetailsMain && dataGetQuoteDetailsMain.GetQuoteDetails) {
        const data = JSON.parse(dataGetQuoteDetailsMain.GetQuoteDetails.QuoteDetails);
        if (data.length) {
          for (let k in data) {
            computeTotal.current.cost += Number(data[k].cost);
            computeTotal.current.client += Number(data[k].client);
            if (computeTotal.current.neighbours.length && data[k].neighbours) {
              for (let j = 0; j < data[k].neighbours.length; j++) {
                computeTotal.current.neighbours[j] += Number(data[k].neighbours[j]);
              }
            }
          }
        }
      }
      if (dataGetQuoteDetailsOptions && dataGetQuoteDetailsOptions.GetQuoteDetails) {
        const data = JSON.parse(dataGetQuoteDetailsOptions.GetQuoteDetails.QuoteDetails);
        if (data.length) {
          for (let k in data) {
            computeTotal.current.cost += Number(data[k].cost);
            computeTotal.current.client += Number(data[k].client);
            if (computeTotal.current.neighbours.length && data[k].neighbours) {
              for (let j = 0; j < data[k].neighbours.length; j++) {
                computeTotal.current.neighbours[j] += Number(data[k].neighbours[j]);
              }
            }
          }
        }
      }
    }
    dispatch(quotesAmmount(computeTotal.current));
  }, [
    quoteId,
    dispatch,
    dataListNeighbours,
    dataGetQuoteDetailsPaling,
    dataGetQuoteDetailsExtraLabour,
    dataGetQuoteDetailsAdditionalWorks,
    dataGetQuoteDetailsMain,
    dataGetQuoteDetailsOptions
  ]);

  /* Render */
  return (
    <>
      <QuoteFormHeader tabValue="1" quoteId={quoteId} quote={dataGetQuote ? dataGetQuote.GetQuote : null} />
      <Formik
        innerRef={formikRef}
        initialValues={formikInitialValues}
        enableReinitialize
        validationSchema={formikValidationSchema}
        onSubmit={async (values) => {
          doUpdateNeighbours(quoteId, values.clients.slice(1));
        }}
      >
        {(props) => (
          <Form>
            <Grid item xs={12} container spacing={3}>
              <FieldArray
                name="clients"
                render={(arrayHelpers) => {
                  formikArrayRef.current = arrayHelpers;
                  return (
                    <>
                      {
                        // eslint-disable-next-line
                        props.values.clients && props.values.clients.length > 0
                          ? // eslint-disable-next-line
                            props.values.clients.map((client, index) => {
                              if (index === 0) {
                                return (
                                  <Client
                                    formik={props}
                                    key={index}
                                    index={index}
                                    clientList={dataListClients ? dataListClients.ListClients.Clients : []}
                                    disabled={true}
                                  />
                                );
                              } else {
                                return (
                                  <Neighbour
                                    formik={props}
                                    key={index}
                                    index={index}
                                    clientList={dataListClients ? dataListClients.ListClients.Clients : []}
                                    helpers={arrayHelpers}
                                  />
                                );
                              }
                            })
                          : null
                      }
                    </>
                  );
                }}
              />

              {/* Add Neighbour Button */}
              {formikRef.current && formikRef.current.values.clients.length <= neighboursMax ? (
                <Grid item xs={12} justifyContent={'end'} sx={{ display: 'flex' }}>
                  <Button
                    onClick={() => formikArrayRef.current.push(newNeighbourValue)}
                    variant="contained"
                    color="secondary"
                    startIcon={<PlusSquareFilled />}
                  >
                    Add Neighbour
                  </Button>
                </Grid>
              ) : null}

              {/* Save */}
              <Grid item xs={12}>
                <MainCard content={false}>
                  <CardContent>
                    <Grid container spacing={3} justifyContent={'center'}>
                      <Grid item lg={3} md={4} xs={12} sx={{ textAlign: 'center' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ marginTop: 1.5 }}
                          type="submit"
                          disabled={
                            // eslint-disable-next-line
                            props.isSubmitting
                          }
                        >
                          SAVE
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </MainCard>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ClientInfo;
