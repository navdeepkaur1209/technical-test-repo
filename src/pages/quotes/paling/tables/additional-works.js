import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button, Grid, InputLabel, Typography } from '@mui/material';
import { PlusSquareFilled } from '@ant-design/icons';
import FormikAutoSave from 'components/FormikAutoSave';
import AdditionalWorksRow from './additional-works-row';
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
const QuoteDetailsDescription = 'Additional Works';
const QuoteDetailsSubType = QuoteDetailsDescription.toUpperCase().split(' ').join('_');

const formikValidationSchema = yup.object().shape({
  additionalworks: yup.array().of(
    yup.object().shape({
      description: yup.string().required('Description is required'),
      metres: yup.number().min(1, 'Min value 1').max(100, 'Max value 100').required('Height is required between 1 and 100'),
      cost: yup
        .number()
        .min(0, 'Min value 0')
        .required('Cost is required')
        .test('cost-share-total', 'Cost share does not tally', (v, e) => {
          const { client, neighbours } = e.parent;
          const total = parseFloat(client) + neighbours.reduce((a, c) => a + parseFloat(c), 0);
          return total === v;
        }),
      client: yup.number().min(0, 'Min value 0').required('Client share is required'),
      neighbours: yup.array().of(yup.number().min(0, 'Min value 0').required('Neighbour share is required'))
    })
  )
});

/* Component */
const AdditionalWorksTable = ({ quoteId, metres, neighbours, updateTotal }) => {
  const [dataOptionsPrice, setDataOptionsPrice] = useState([]);
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const formikRef = useRef();
  const formikArrayRef = useRef();
  const dispatch = useDispatch();

  const rowInitialValue = useMemo(() => {
    return {
      description: '',
      metres: metres,
      cost: 0,
      client: 0,
      neighbours: Array(neighbours).fill(0)
    };
  }, [metres, neighbours]);

  const doUpdateTotal = useCallback(
    (subtotal) => {
      updateTotal(QuoteDetailsSubType, {
        cost: subtotal ? subtotal.reduce((a, c) => a + parseFloat(c.cost), 0) : 0,
        client: subtotal ? subtotal.reduce((a, c) => a + parseFloat(c.client), 0) : 0,
        neighbours: Array(neighbours)
          .fill(0)
          .map((v, i) => (subtotal ? subtotal.reduce((a, c) => a + parseFloat(c.neighbours[i] ? c.neighbours[i] : 0), v) : 0))
      });
    },
    [neighbours, updateTotal]
  );

  /* GraphQL: GetQuoteDetails */
  const [doGetQuoteDetails, { data: dataGetQuoteDetails }] = useGraphQLLazyQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: QuoteDetailsType, subtype: QuoteDetailsSubType }
  });

  useEffect(() => {
    if (!detailsLoaded && dataGetQuoteDetails && dataGetQuoteDetails.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetails.GetQuoteDetails.QuoteDetails);
      formikRef.current.setFieldValue(
        'additionalworks',
        data.map((row) => {
          return {
            ...row,
            neighbours: row.neighbours.slice(0, neighbours).concat(Array(Math.max(0, neighbours - row.neighbours.length)).fill(0))
          };
        })
      );
      doUpdateTotal(data);
      setDetailsLoaded(true);
    }
  }, [dataGetQuoteDetails, detailsLoaded, setDetailsLoaded, formikRef, updateTotal, neighbours, doUpdateTotal]);

  /* GraphQL: ListData */
  const { data: dataListDataOptionsPrice } = useGraphQLQuery(ListData, {
    variables: { datatype: 'OPTIONSPRICE', pagination: {} }
  });

  useEffect(() => {
    if (dataListDataOptionsPrice && dataListDataOptionsPrice.ListData && dataListDataOptionsPrice.ListData.Data) {
      setDataOptionsPrice(() =>
        dataListDataOptionsPrice.ListData.Data.map((d) => {
          const data = JSON.parse(d.Data);
          return {
            Key: d.DataId,
            Value: d.DataMainValue,
            Price: data['OPTIONS - Price per metre']
          };
        })
      );
      doGetQuoteDetails();
    }
  }, [dataListDataOptionsPrice, doGetQuoteDetails]);

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
      doUpdateTotal(formikRef.current.values.additionalworks);
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
  }, [resultUpdateQuoteDetails, resetUpdateQuoteDetails, dispatch, formikRef, doUpdateTotal]);

  /* Render */
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3">Additional Works</Typography>
      </Grid>
      <Grid item xs={12}>
        <Formik
          innerRef={formikRef}
          initialValues={{ additionalworks: [] }}
          enableReinitialize
          validationSchema={formikValidationSchema}
          onSubmit={async (values) => {
            doMutation(values.additionalworks);
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
                          <TableCell align="center">
                            <InputLabel>Metres</InputLabel>
                          </TableCell>
                          <TableCell align="center">
                            <InputLabel>&nbsp; &nbsp; &nbsp; Cost &nbsp; &nbsp; &nbsp;</InputLabel>
                          </TableCell>
                          <TableCell align="center">
                            <InputLabel>Client Share</InputLabel>
                          </TableCell>
                          {Array(neighbours)
                            .fill(0)
                            .map((n, i) => (
                              <TableCell key={['neighbour', i + 1].join('')} align="center">
                                <InputLabel>
                                  Neighbour {i + 1}
                                  <br />
                                  Share
                                </InputLabel>
                              </TableCell>
                            ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <FieldArray
                          name="additionalworks"
                          render={(arrayHelpers) => {
                            formikArrayRef.current = arrayHelpers;
                            return (
                              <>
                                {
                                  // eslint-disable-next-line
                              props.values.additionalworks && props.values.additionalworks.length > 0
                                    ? // eslint-disable-next-line
                                props.values.additionalworks.map((additionalwork, index) => {
                                        return (
                                          <AdditionalWorksRow
                                            formik={props}
                                            key={index}
                                            neighbours={neighbours}
                                            index={index}
                                            optionsPrice={dataOptionsPrice}
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
                <Grid item container xs={12}>
                  <Grid item sm={6}>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<PlusSquareFilled />}
                      onClick={() => formikArrayRef.current.push(rowInitialValue)}
                    >
                      Additional Work
                    </Button>
                  </Grid>
                  <Grid item sm={6} container justifyContent={'flex-end'}>
                    {detailsLoaded ? <FormikAutoSave formName="AdditionalWorks" /> : null}
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>

      {/*
      <Grid item container xs={12}>
        <Grid item sm={6}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PlusSquareFilled />}
            onClick={() => formikArrayRef.current.push(rowInitialValue)}
          >
            Additional Work
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

AdditionalWorksTable.propTypes = {
  quoteId: PropTypes.string,
  metres: PropTypes.number,
  neighbours: PropTypes.number,
  updateTotal: PropTypes.any
};

export default AdditionalWorksTable;
