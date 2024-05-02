import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Grid, InputLabel, Typography } from '@mui/material';
import FormikAutoSave from 'components/FormikAutoSave';
import ExtraLabourRow from './extra-labour-row';
import { getCostShareTypes, COST_SHARE_DEFAULT_TYPE, EXTRA_LABOUR_DEMO_REMOVAL_TYPES, AUTOSAVE_HIDE_DURATION } from 'utils/helpers';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';

// GraphQL.
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';
import UpdateQuoteDetails from 'graphql/quotes/UpdateQuoteDetails';

/* Static methods and values */
const QuoteDetailsType = 'SPECS';
const QuoteDetailsDescription = 'Extra Labour';
const QuoteDetailsSubType = QuoteDetailsDescription.toUpperCase().split(' ').join('_');

const formikValidationSchema = yup.object().shape({
  extralabour: yup.array().of(
    yup.object().shape({
      labour: yup.string().required('Labour type is required'),
      description: yup.string().required('Description is required'),
      metres: yup.number().min(0, 'Min value 0').required('Metres is required'),
      sharing: yup.string().required('Cost sharing is required'),
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
const ExtraLabourTable = ({ quoteId, metres, neighbours, updateTotal }) => {
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const formikRef = useRef();
  const formikArrayRef = useRef();
  const dispatch = useDispatch();

  const rowInitialValue = useMemo(() => {
    return EXTRA_LABOUR_DEMO_REMOVAL_TYPES.map((labour) => {
      return {
        labour: labour,
        description: '',
        metres: 0,
        sharing: COST_SHARE_DEFAULT_TYPE,
        cost: 0,
        client: 0,
        neighbours: Array(neighbours).fill(0)
      };
    });
  }, [neighbours]);

  const dataCostings = useMemo(() => {
    return getCostShareTypes(neighbours);
  }, [neighbours]);

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
      if (data.length) {
        formikRef.current.setFieldValue(
          'extralabour',
          data.map((row) => {
            return {
              ...row,
              neighbours: row.neighbours.slice(0, neighbours).concat(Array(Math.max(0, neighbours - row.neighbours.length)).fill(0))
            };
          })
        );
        doUpdateTotal(data);
      }
      setDetailsLoaded(true);
    }
  }, [dataGetQuoteDetails, detailsLoaded, setDetailsLoaded, formikRef, neighbours, doUpdateTotal]);

  useEffect(() => {
    doGetQuoteDetails();
  }, [doGetQuoteDetails]);

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
      doUpdateTotal(formikRef.current.values.extralabour);
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
        <Typography variant="h3">Extra Labour</Typography>
      </Grid>
      <Grid item xs={12}>
        <Formik
          innerRef={formikRef}
          initialValues={{ extralabour: rowInitialValue }}
          enableReinitialize
          validationSchema={formikValidationSchema}
          onSubmit={async (values) => {
            doMutation(values.extralabour);
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
                            <InputLabel>Title</InputLabel>
                          </TableCell>
                          <TableCell align="left">
                            <InputLabel>Description</InputLabel>
                          </TableCell>
                          <TableCell align="center">
                            <InputLabel>Sharing</InputLabel>
                          </TableCell>
                          <TableCell align="center">
                            <InputLabel>Cost</InputLabel>
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
                          name="extralabour"
                          render={(arrayHelpers) => {
                            formikArrayRef.current = arrayHelpers;
                            return (
                              <>
                                {
                                  // eslint-disable-next-line
                              props.values.extralabour && props.values.extralabour.length > 0
                                    ? // eslint-disable-next-line
                                props.values.extralabour.map((labour, index) => {
                                        return (
                                          <ExtraLabourRow
                                            formik={props}
                                            key={index}
                                            metres={metres}
                                            neighbours={neighbours}
                                            costings={dataCostings}
                                            index={index}
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
                <Grid item xs={12} justifyContent={'end'} sx={{ display: 'flex' }}>
                  {detailsLoaded ? <FormikAutoSave formName="ExtraLabour" /> : null}
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>

      {/*
      <Grid item xs={12} justifyContent={'end'} sx={{ display: 'flex' }}>
        <Button variant="contained" color="primary" onClick={() => formikRef.current.handleSubmit()}>
          Save
        </Button>
      </Grid>
      */}
    </Grid>
  );
};

ExtraLabourTable.propTypes = {
  quoteId: PropTypes.string,
  metres: PropTypes.number,
  neighbours: PropTypes.number,
  updateTotal: PropTypes.any
};

export default ExtraLabourTable;
