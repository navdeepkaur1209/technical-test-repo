import { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button, Grid, InputLabel } from '@mui/material';
import { PlusSquareFilled } from '@ant-design/icons';
import PricingRow from './pricing-row';
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
const QuoteDetailsType = 'PRICING';
const QuoteDetailsDescription = 'Fence Pricing';
const QuoteDetailsSubType = QuoteDetailsDescription.toUpperCase().split(' ').join('_');

const formikValidationSchema = yup.object().shape({
  pricing: yup.array().of(
    yup.object().shape({
      item: yup.string().required('Item is required'),
      product: yup.string().required('Product is required'),
      metres: yup.number().min(1, 'Min value 1').max(100, 'Max value 100').required('Metres is required between 1 and 100'),
      rate: yup.number().min(0, 'Min value 0').required('Rate is required'),
      total: yup.number().min(0, 'Min value 0').required('Total is required')
    })
  )
});

const newRowInitialValue = {
  item: '',
  product: '',
  metres: 0,
  rate: 0,
  total: 0
};

/* Component */
const PricingTable = ({ quoteId, paling, heights, setCurrentProduct, setStarterPosts }) => {
  const [dataItems, setDataItems] = useState([]);
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const formikRef = useRef();
  const formikArrayRef = useRef();
  const dispatch = useDispatch();

  const rowInitialValue = useMemo(() => {
    let product = '';
    let metres = 0;

    if (paling) {
      if (paling.height && heights.length) {
        const f = heights.find((h) => h.Value == paling.height);
        if (f) {
          product = f.Data.HEIGHTS;
        }
      }
      if (paling.metres) {
        metres = paling.metres;
      }
    }

    return {
      ...newRowInitialValue,
      item: 'HEIGHTS',
      metres: metres,
      product: product
    };
  }, [paling, heights]);

  /* GraphQL: GetQuoteDetails */
  const [doGetQuoteDetails, { data: dataGetQuoteDetails }] = useGraphQLLazyQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: QuoteDetailsType, subtype: QuoteDetailsSubType }
  });

  useEffect(() => {
    if (!detailsLoaded && dataGetQuoteDetails && dataGetQuoteDetails.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetails.GetQuoteDetails.QuoteDetails);
      if (data && data.length) {
        formikRef.current.setFieldValue('pricing', data);
        setCurrentProduct(data[0]);
        setStarterPosts(data.filter((d) => d.item == 'STARTER POST'));
      }
      setDetailsLoaded(true);
    }
  }, [dataGetQuoteDetails, detailsLoaded, setDetailsLoaded, setCurrentProduct, setStarterPosts, formikRef]);

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

    setCurrentProduct(values[0]);
    setStarterPosts(values.filter((d) => d.item == 'STARTER POST'));
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
        <TableContainer component={Paper}>
          <Formik
            innerRef={formikRef}
            initialValues={{ pricing: [rowInitialValue] }}
            enableReinitialize
            validationSchema={formikValidationSchema}
            onSubmit={async (values) => {
              doMutation(values.pricing);
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
                        <InputLabel>QTY</InputLabel>
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
                      name="pricing"
                      render={(arrayHelpers) => {
                        formikArrayRef.current = arrayHelpers;
                        return (
                          <>
                            {
                              // eslint-disable-next-line
                              props.values.pricing && props.values.pricing.length > 0
                                ? // eslint-disable-next-line
                                props.values.pricing.map((price, index) => {
                                    return <PricingRow formik={props} key={index} index={index} items={dataItems} helpers={arrayHelpers} />;
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

PricingTable.propTypes = {
  quoteId: PropTypes.string,
  paling: PropTypes.any,
  heights: PropTypes.any,
  setCurrentProduct: PropTypes.any,
  setStarterPosts: PropTypes.any
};

export default PricingTable;
