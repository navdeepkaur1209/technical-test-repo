import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button, Grid, InputLabel, Typography } from '@mui/material';
import CompareRow from './compare-row';
import { Formik, Form, FieldArray, getIn } from 'formik';
import * as yup from 'yup';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';
import UpdateQuoteDetails from 'graphql/quotes/UpdateQuoteDetails';

/* Static methods and values */
const QuoteDetailsType = 'PRICING';
const QuoteDetailsDescription = 'Compare';
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
const CompareTable = ({ quoteId, currentProduct }) => {
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const formikRef = useRef();
  const formikArrayRef = useRef();
  const dispatch = useDispatch();

  const rowInitialValue = [
    {
      ...currentProduct,
      item: 'PALING_OPTIONS'
    },
    {
      ...newRowInitialValue,
      metres: currentProduct.metres
    },
    {
      ...newRowInitialValue
    }
  ];

  useEffect(() => {
    const compare = getIn(formikRef.current.values, `compare`);
    compare.map((c, index) => {
      formikRef.current.setFieldValue(`compare[${index}].metres`, currentProduct.metres, true);
    });
  }, [currentProduct, formikRef]);

  /* GraphQL: GetQuoteDetails */
  const { data: dataGetQuoteDetails } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: QuoteDetailsType, subtype: QuoteDetailsSubType }
  });

  useEffect(() => {
    if (!detailsLoaded && dataGetQuoteDetails && dataGetQuoteDetails.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetails.GetQuoteDetails.QuoteDetails);
      if (data.length > 1) {
        const compare = getIn(formikRef.current.values, `compare`);
        compare.splice(1, compare.length, ...data.slice(1));
        const newCompare = compare.map((c) => {
          return {
            ...c,
            metres: currentProduct.metres,
            total: currentProduct.metres * c.rate
          };
        });
        formikRef.current.setFieldValue('compare', newCompare);
      }
      setDetailsLoaded(true);
    }
  }, [dataGetQuoteDetails, detailsLoaded, setDetailsLoaded, currentProduct, formikRef]);

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
        <Typography variant="h3">Options And Compare</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Formik
            innerRef={formikRef}
            initialValues={{ compare: rowInitialValue }}
            validationSchema={formikValidationSchema}
            onSubmit={async (values) => {
              doMutation(values.compare);
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
                      name="compare"
                      render={(arrayHelpers) => {
                        formikArrayRef.current = arrayHelpers;
                        return (
                          <>
                            {
                              // eslint-disable-next-line
                              props.values.compare && props.values.compare.length > 0
                                ? // eslint-disable-next-line
                                props.values.compare.map((compare, index, arr) => {
                                    return (
                                      <CompareRow
                                        formik={props}
                                        key={index}
                                        index={index}
                                        lastIndex={arr.length - 1}
                                        fenceMetres={currentProduct && currentProduct.metres ? parseInt(currentProduct.metres, 10) : 0}
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
              </Form>
            )}
          </Formik>
        </TableContainer>
      </Grid>

      <Grid item xs={12} container>
        <Grid item sm={12} container justifyContent={'flex-end'}>
          <Button variant="contained" color="primary" onClick={() => formikRef.current.handleSubmit()}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

CompareTable.propTypes = {
  quoteId: PropTypes.string,
  currentProduct: PropTypes.any
};

export default CompareTable;
