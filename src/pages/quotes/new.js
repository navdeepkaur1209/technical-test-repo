import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, CardContent, Grid, InputLabel } from '@mui/material';
import { PlusSquareFilled } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import FormikSelectField from 'components/FormikSelectField';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import Client from './client-info/tables/client';
import Neighbour from './client-info/tables/neighbour';
import { createPathFromArray } from 'utils/helpers';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import AddQuote from 'graphql/quotes/AddQuote';
import UpdateNeighbours from 'graphql/quotes/UpdateNeighbours';
import ListClients from 'graphql/clients/ListClients';

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
  quoteType: '',
  clients: [newNeighbourValue]
};

const formikValidationSchema = yup.object({
  quoteType: yup.string().required('Quote type is required'),
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

const quoteTypes = [
  { Key: '0', Name: 'PALING' },
  { Key: '1', Name: 'PALING - 4 NEIGHBOURS' },
  { Key: '2', Name: 'CBOND' },
  { Key: '3', Name: 'CBOND - 4 NEIGHBOURS' },
  { Key: '4', Name: 'OST REPAIR' },
  { Key: '5', Name: 'FEATURE' },
  { Key: '6', Name: 'RETAINER' },
  { Key: '7', Name: 'METAL' }
];

/* Component */
const QuoteNew = () => {
  const [neighbours, setNeighbours] = useState([]);
  const formikRef = useRef();
  const formikArrayRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* GraphQL: UpdateNeighbours */
  const [mutationUpdateNeighbours, { data: resultUpdateNeighbours }] = useGraphQLMutation(UpdateNeighbours);
  const doUpdateNeighbours = useCallback(
    (quoteId) => {
      if (neighbours.length > 0) {
        mutationUpdateNeighbours({
          variables: {
            quoteId: quoteId,
            neighbours: neighbours
          }
        });
      } else {
        navigate(createPathFromArray(['quotes', quoteId]));
      }
    },
    [navigate, neighbours, mutationUpdateNeighbours]
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
        navigate(createPathFromArray(['quotes', resultUpdateNeighbours.UpdateNeighbours.Id]));
      }
    }
  }, [resultUpdateNeighbours, dispatch, navigate]);

  /* GraphQL: AddQuote */
  const [mutationAddQuote, { data: resultAddQuote }] = useGraphQLMutation(AddQuote);
  const doAddQuote = (values) => {
    setNeighbours(values.clients.slice(1).map((n) => n.ClientId));
    mutationAddQuote({
      variables: {
        quoteType: values.quoteType,
        clientId: values.clients[0].ClientId
      }
    });
  };

  useEffect(() => {
    if (resultAddQuote && resultAddQuote.AddQuote) {
      if (resultAddQuote.AddQuote.Status === 'SUCCESS') {
        dispatch(
          openSnackbar({
            open: true,
            message: resultAddQuote.AddQuote.Message,
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        doUpdateNeighbours(resultAddQuote.AddQuote.Id);
      }
    }
  }, [resultAddQuote, dispatch, doUpdateNeighbours]);

  /* GraphQL: ListClients */
  const { data: dataListClients } = useGraphQLQuery(ListClients, { variables: { pagination: {} } });

  /* Render */
  return (
    <Grid item xs={12} container spacing={3}>
      <Formik
        innerRef={formikRef}
        initialValues={formikInitialValues}
        enableReinitialize
        validationSchema={formikValidationSchema}
        onSubmit={async (values) => {
          doAddQuote(values);
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
                                    disabled={false}
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

              {/* Select Qoute */}
              <Grid item xs={12}>
                <MainCard content={false}>
                  <CardContent>
                    <Grid container spacing={3} justifyContent={'center'}>
                      <Grid item lg={3} md={4} xs={12} sx={{ textAlign: 'center' }}>
                        <InputLabel sx={{ marginBottom: 1.5, textAlign: 'center' }}>Please select a quote template</InputLabel>
                        <FormikSelectField id="quoteType" formik={props} menuItems={quoteTypes} menuItemKey="Key" menuItemValue="Name" />
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ marginTop: 1.5 }}
                          type="submit"
                          disabled={
                            // eslint-disable-next-line
                            props.isSubmitting
                          }
                        >
                          START QUOTATION
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
    </Grid>
  );
};

export default QuoteNew;
