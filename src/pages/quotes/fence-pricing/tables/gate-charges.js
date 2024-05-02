import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button, Grid, InputLabel, Typography } from '@mui/material';
import { PlusSquareFilled } from '@ant-design/icons';
import GateChargesRow from './gate-charges-row';
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
const QuoteDetailsType = 'PRICING';
const QuoteDetailsDescription = 'Gate Charges';
const QuoteDetailsSubType = QuoteDetailsDescription.toUpperCase().split(' ').join('_');

const formikValidationSchema = yup.object().shape({
  gates: yup.array().of(
    yup.object().shape({
      sn: yup.number().min(1, 'Min value 1').required('Sn is required'),
      description: yup.string().required('Description is required'),
      qty: yup.number().min(1, 'Min value 1').required('Quantity is required'),
      rate: yup.number().min(0, 'Min value 0').required('Rate is required'),
      total: yup.number().min(0, 'Min value 0').required('Total is required')
    })
  )
});

const rowInitialValue = {
  sn: 1,
  description: '',
  qty: 0,
  rate: 0,
  total: 0
};

/* Component */
const GateChargesTable = ({ quoteId }) => {
  const [dataGates, setDataGates] = useState([]);
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
      if (data.length) {
        data.sort((d1, d2) => d1.sn - d2.sn);
        formikRef.current.setFieldValue('gates', data);
      }
      setDetailsLoaded(true);
    }
  }, [dataGetQuoteDetails, detailsLoaded, setDetailsLoaded, formikRef]);

  /* GraphQL: ListData */
  const { data: dataListDataGateCharge } = useGraphQLQuery(ListData, {
    variables: { datatype: 'CUSTOMER_GATE_CHARGE', pagination: {} }
  });

  useEffect(() => {
    if (dataListDataGateCharge && dataListDataGateCharge.ListData && dataListDataGateCharge.ListData.Data) {
      setDataGates(() =>
        dataListDataGateCharge.ListData.Data.map((d) => {
          return {
            Key: d.DataId,
            Value: d.DataMainValue
          };
        })
      );
      doGetQuoteDetails();
    }
  }, [dataListDataGateCharge, doGetQuoteDetails]);

  /* GraphQL: UpdateQuoteDetails */
  const [mutationUpdateQuoteDetails, { data: resultUpdateQuoteDetails }] = useGraphQLMutation(UpdateQuoteDetails);

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
          close: false
        })
      );
    }
  }, [resultUpdateQuoteDetails, dispatch]);

  /* Render */
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3">Customer Gate Charges (Add to quote amount if required)</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Formik
            innerRef={formikRef}
            initialValues={{ gates: [rowInitialValue] }}
            enableReinitialize
            validationSchema={formikValidationSchema}
            onSubmit={async (values) => {
              doMutation(values.gates);
            }}
          >
            {(props) => (
              <Form>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">
                        <InputLabel>S/No.</InputLabel>
                      </TableCell>
                      <TableCell align="left">
                        <InputLabel>Description</InputLabel>
                      </TableCell>
                      <TableCell align="center">
                        <InputLabel>Qty</InputLabel>
                      </TableCell>
                      <TableCell align="center">
                        <InputLabel>Rate</InputLabel>
                      </TableCell>
                      <TableCell align="center">
                        <InputLabel>Total</InputLabel>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <FieldArray
                      name="gates"
                      render={(arrayHelpers) => {
                        formikArrayRef.current = arrayHelpers;
                        return (
                          <>
                            {
                              // eslint-disable-next-line
                              props.values.gates && props.values.gates.length > 0
                                ? // eslint-disable-next-line
                                props.values.gates.map((gate, index) => {
                                    return (
                                      <GateChargesRow formik={props} key={index} index={index} gates={dataGates} helpers={arrayHelpers} />
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
              </Form>
            )}
          </Formik>
        </TableContainer>
      </Grid>

      <Grid item xs={12} container>
        <Grid item sm={6}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PlusSquareFilled />}
            onClick={() => formikArrayRef.current.push({ ...rowInitialValue, sn: formikRef.current.values.gates.length + 1 })}
          >
            Add More
          </Button>
        </Grid>
        <Grid item sm={6} container justifyContent={'flex-end'}>
          <Button variant="contained" color="primary" onClick={() => formikRef.current.handleSubmit()}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

GateChargesTable.propTypes = {
  quoteId: PropTypes.string
};

export default GateChargesTable;
