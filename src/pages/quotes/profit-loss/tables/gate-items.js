import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button, Grid, InputLabel, Typography } from '@mui/material';
import { PlusSquareFilled } from '@ant-design/icons';
import GateItemsRow from './gate-items-row';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import ListItems from 'graphql/data/ListItems';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';
import UpdateQuoteDetails from 'graphql/quotes/UpdateQuoteDetails';

/* Static methods and values */
const QuoteDetailsType = 'PROFITLOSS';
const QuoteDetailsDescription = 'Gate Items';
const QuoteDetailsSubType = QuoteDetailsDescription.toUpperCase().split(' ').join('_');

const formikValidationSchema = yup.object().shape({
  gates: yup.array().of(
    yup.object().shape({
      item: yup.string().required('Item is required'),
      product: yup.string().required('Product is required'),
      qty: yup.number().min(1, 'Min value 1').required('Quantity is required'),
      cost: yup.number().min(0, 'Min value 0').required('Cost is required'),
      total: yup.number().min(0, 'Min value 0').required('Total is required')
    })
  )
});

const rowInitialValue = {
  item: '',
  product: '',
  qty: 0,
  cost: 0,
  total: 0
};

/* Component */
const GateItemsTable = ({ quoteId, setProfitLoss }) => {
  const [dataItems, setDataItems] = useState([]);
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
      if (data && data.length) {
        formikRef.current.setFieldValue('gates', data);
        setProfitLoss(data);
      }
      setDetailsLoaded(true);
    }
  }, [dataGetQuoteDetails, detailsLoaded, setDetailsLoaded, formikRef, setProfitLoss]);

  /* GraphQL: ListItems */
  const { data: dataListItems } = useGraphQLQuery(ListItems, {
    variables: { pagination: {} }
  });

  useEffect(() => {
    if (dataListItems && dataListItems.ListItems && dataListItems.ListItems.Items) {
      setDataItems(() =>
        dataListItems.ListItems.Items.map((item) => {
          return {
            Key: item,
            Value: item
          };
        }).sort((a, b) => (a.Value > b.Value ? 1 : -1))
      );
      doGetQuoteDetails();
    }
  }, [dataListItems, doGetQuoteDetails]);

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
    setProfitLoss(values);
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
        <Typography variant="h3">Gate Items</Typography>
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
                        <InputLabel>Item</InputLabel>
                      </TableCell>
                      <TableCell align="left">
                        <InputLabel>Description</InputLabel>
                      </TableCell>
                      <TableCell align="center">
                        <InputLabel>Qty</InputLabel>
                      </TableCell>
                      <TableCell align="center">
                        <InputLabel>Cost</InputLabel>
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
                                      <GateItemsRow formik={props} key={index} index={index} items={dataItems} helpers={arrayHelpers} />
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
            onClick={() => formikArrayRef.current.push(rowInitialValue)}
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

GateItemsTable.propTypes = {
  quoteId: PropTypes.string,
  setProfitLoss: PropTypes.any
};

export default GateItemsTable;
