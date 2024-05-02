import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button, Grid, InputLabel, Typography } from '@mui/material';
import { PlusSquareFilled } from '@ant-design/icons';
import LabourItemsRow from './labour-items-row';
import LabourItemsSummary from './labour-items-summary';
import ExtraLabourTable from './labour-items-extra-labour';
import { DATA_SERVICE_LOCATOR, EXTRA_LABOUR_TYPES } from 'utils/helpers';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import ListProducts from 'graphql/data/ListProducts';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';
import UpdateQuoteDetails from 'graphql/quotes/UpdateQuoteDetails';

/* Static methods and values */
const QuoteDetailsType = 'PROFITLOSS';
const QuoteDetailsDescription = 'Labour Items';
const QuoteDetailsSubType = QuoteDetailsDescription.toUpperCase().split(' ').join('_');

const formikValidationSchema = yup.object().shape({
  labours: yup.array().of(
    yup.object().shape({
      item: yup.string().required('Item is required'),
      product: yup.string().required('Product is required'),
      qty: yup.number().min(1, 'Min value 1').required('Quantity is required'),
      cost: yup.number().min(0, 'Min value 0').required('Cost is required'),
      total: yup.number().min(0, 'Min value 0').required('Total is required')
    })
  ),
  extralabour: yup.array().of(
    yup.object().shape({
      labour: yup.string().required('Labour type is required'),
      description: yup.string().required('Description is required'),
      cost: yup.number().required('Cost is required')
    })
  ),
  summary: yup.object().shape({
    labour: yup.number().min(0, 'Min value 0').required('Labour is required'),
    total: yup.number().min(0, 'Min value 0').required('Total is required'),
    demoRemoval: yup.object().shape({
      description: yup.string().required('Demo and/or removal is required'),
      amount: yup.number().min(0, 'Min value 0').required('Amount is required'),
      percent: yup.number().min(0, 'Min value 0').required('Percent is required'),
      total: yup.number().min(0, 'Min value 0').required('Total is required')
    }),
    serviceLocator: yup.object().shape({
      description: yup.string().required('Demo and/or removal is required'),
      amount: yup.number().min(0, 'Min value 0').required('Amount is required'),
      percent: yup.number().min(0, 'Min value 0').required('Percent is required'),
      total: yup.number().min(0, 'Min value 0').required('Total is required')
    })
  })
});

const newRowInitialValue = {
  item: 'LABOUR',
  product: '',
  qty: 0,
  cost: 0,
  total: 0
};

const rowInitialValue = {
  labours: [newRowInitialValue],
  extralabour: EXTRA_LABOUR_TYPES.map((labour) => {
    return {
      labour: labour,
      description: '',
      qty: 0,
      cost: 0,
      total: 0
    };
  }),
  summary: {
    labour: 0,
    total: 0,
    demoRemoval: {
      description: '',
      amount: 0,
      percent: 0,
      total: 0
    },
    serviceLocator: {
      description: 'SERVICE_LOCATOR',
      amount: 0,
      percent: DATA_SERVICE_LOCATOR,
      total: 0
    }
  }
};

/* Component */
const LabourItemsTable = ({ quoteId, setProfitLoss }) => {
  const [products, setProducts] = useState([]);
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
        const summary = data.pop();
        setProfitLoss(summary);
        formikRef.current.setFieldValue('summary', summary);
        formikRef.current.setFieldValue('labours', data);
      }
      setDetailsLoaded(true);
    }
  }, [dataGetQuoteDetails, detailsLoaded, setDetailsLoaded, formikRef, setProfitLoss]);

  /* GraphQL: ListProducts */
  const { data: dataListProducts } = useGraphQLQuery(ListProducts, {
    variables: { item: 'LABOUR', pagination: {} }
  });

  useEffect(() => {
    if (dataListProducts && dataListProducts.ListProducts && dataListProducts.ListProducts.Products) {
      setProducts([...dataListProducts.ListProducts.Products]);
      doGetQuoteDetails();
    }
  }, [dataListProducts, doGetQuoteDetails]);

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
        <Typography variant="h3">Labour Items</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Formik
            innerRef={formikRef}
            initialValues={rowInitialValue}
            enableReinitialize
            validationSchema={formikValidationSchema}
            onSubmit={async (values) => {
              const save = [...values.labours, values.summary];
              setProfitLoss(values.summary);
              doMutation(save);
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
                      name="labours"
                      render={(arrayHelpers) => {
                        formikArrayRef.current = arrayHelpers;
                        return (
                          <>
                            {
                              // eslint-disable-next-line
                              props.values.labours && props.values.labours.length > 0
                                ? // eslint-disable-next-line
                                props.values.labours.map((labour, index) => {
                                    return (
                                      <LabourItemsRow formik={props} key={index} index={index} products={products} helpers={arrayHelpers} />
                                    );
                                  })
                                : null
                            }
                          </>
                        );
                      }}
                    />
                    <ExtraLabourTable quoteId={quoteId} formik={props} />
                    <LabourItemsSummary quoteId={quoteId} formik={props} setProfitLoss={setProfitLoss} />
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
            onClick={() => formikArrayRef.current.push(newRowInitialValue)}
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

LabourItemsTable.propTypes = {
  quoteId: PropTypes.string,
  setProfitLoss: PropTypes.any
};

export default LabourItemsTable;
