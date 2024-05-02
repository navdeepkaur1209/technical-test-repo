import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button, Grid, InputLabel, Typography } from '@mui/material';
import { PlusSquareFilled } from '@ant-design/icons';
import FormikAutoSave from 'components/FormikAutoSave';
import ClientRequestsRow from './client-requests-row';
import { AUTOSAVE_HIDE_DURATION } from 'utils/helpers';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import ListData from 'graphql/data/ListData';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';
import UpdateQuoteDetails from 'graphql/quotes/UpdateQuoteDetails';

/* Static methods and values */
const QuoteDetailsType = 'SPECS';
const QuoteDetailsDescription = 'Client Requests';
const QuoteDetailsSubType = QuoteDetailsDescription.toUpperCase().split(' ').join('_');

const formikValidationSchema = yup.object().shape({
  clientrequests: yup.array().of(
    yup.object().shape({
      description: yup.string().required('Description is required')
    })
  )
});

const rowInitialValue = {
  description: ''
};

/* Component */
const ClientRequestsTable = ({ quoteId }) => {
  const [dataClientRequests, setDataClientRequests] = useState([]);
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const formikRef = useRef();
  const formikArrayRef = useRef();
  const dispatch = useDispatch();

  /* GraphQL: GetQuoteDetails */
  const [doGetQuoteDetails, { data: dataGetQuoteDetails }] = useGraphQLLazyQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: QuoteDetailsType, subtype: QuoteDetailsSubType }
  });

  useEffect(() => {
    if (!detailsLoaded && dataGetQuoteDetails && dataGetQuoteDetails.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetails.GetQuoteDetails.QuoteDetails);
      formikRef.current.setFieldValue('clientrequests', data);
      setDetailsLoaded(true);
    }
  }, [dataGetQuoteDetails, detailsLoaded, setDetailsLoaded, formikRef]);

  /* GraphQL: ListData */
  const { data: dataListDataClientRequests } = useGraphQLQuery(ListData, {
    variables: { datatype: 'CLIENT_REQUESTS', pagination: {} }
  });

  useEffect(() => {
    if (dataListDataClientRequests && dataListDataClientRequests.ListData && dataListDataClientRequests.ListData.Data) {
      setDataClientRequests(() =>
        dataListDataClientRequests.ListData.Data.map((d) => {
          return {
            Key: d.DataId,
            Value: d.DataMainValue
          };
        })
      );
      doGetQuoteDetails();
    }
  }, [dataListDataClientRequests, doGetQuoteDetails]);

  /* GraphQL: UpdateQuoteDetails */
  const [mutationUpdateQuoteDetails, { data: resultUpdateQuoteDetails, reset: resetUpdateQuoteDetails }] =
    useGraphQLMutation(UpdateQuoteDetails);

  const doMutation = (values) => {
    mutationUpdateQuoteDetails({
      variables: {
        id: quoteId,
        type: QuoteDetailsType,
        subtype: QuoteDetailsSubType,
        details: JSON.stringify(values)
      }
    });
  };

  useEffect(() => {
    if (resultUpdateQuoteDetails && resultUpdateQuoteDetails.UpdateQuoteDetails.Status === 'SUCCESS') {
      dispatch(
        openSnackbar({
          open: true,
          message: [QuoteDetailsDescription, resultUpdateQuoteDetails.UpdateQuoteDetails.Message].join(': '),
          variant: 'alert',
          alert: {
            color: 'success'
          },
          autoHideDuration: AUTOSAVE_HIDE_DURATION
        })
      );
      resetUpdateQuoteDetails();
    }
  }, [resultUpdateQuoteDetails, resetUpdateQuoteDetails, dispatch]);

  /* Render */
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3">Client Requests</Typography>
      </Grid>
      <Grid item xs={12}>
        <Formik
          innerRef={formikRef}
          initialValues={{ clientrequests: [] }}
          enableReinitialize
          validationSchema={formikValidationSchema}
          onSubmit={async (values) => {
            doMutation(values.clientrequests);
          }}
        >
          {(props) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">
                            <InputLabel>Description</InputLabel>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <FieldArray
                          name="clientrequests"
                          render={(arrayHelpers) => {
                            formikArrayRef.current = arrayHelpers;
                            return (
                              <>
                                {
                                  // eslint-disable-next-line
                              props.values.clientrequests && props.values.clientrequests.length > 0
                                    ? // eslint-disable-next-line
                                  props.values.clientrequests.map((clientrequest, index) => {
                                        return (
                                          <ClientRequestsRow
                                            formik={props}
                                            key={index}
                                            index={index}
                                            clientRequests={dataClientRequests}
                                            helpers={arrayHelpers}
                                          />
                                        );
                                      })
                                    : null
                                }
                              </>
                            );
                          }}
                        />
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} container>
                  <Grid item sm={6}>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<PlusSquareFilled />}
                      onClick={() => formikArrayRef.current.push(rowInitialValue)}
                    >
                      Client Request
                    </Button>
                  </Grid>
                  <Grid item sm={6} container justifyContent={'flex-end'}>
                    {detailsLoaded ? <FormikAutoSave formName="ClientRequests" /> : null}
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>

      {/*
      <Grid item xs={12} container>
        <Grid item sm={6}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PlusSquareFilled />}
            onClick={() => formikArrayRef.current.push(rowInitialValue)}
          >
            Client Request
          </Button>
        </Grid>
        <Grid item sm={6} container justifyContent={'flex-end'}>
          <Button variant="contained" color="primary" onClick={() => formikRef.current.handleSubmit()}>
            Save
          </Button>
        </Grid>
      </Grid>
      */}
    </Grid>
  );
};

ClientRequestsTable.propTypes = {
  quoteId: PropTypes.string
};

export default ClientRequestsTable;
