import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Grid, InputLabel, Typography } from '@mui/material';
import { ArrowRightIcon } from '@mui/x-date-pickers';
import FormikAutoSave from 'components/FormikAutoSave';
import OptionalsRow from './optionals-row';
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
const QuoteDetailsDescription = 'Optionals';
const QuoteDetailsSubType = QuoteDetailsDescription.toUpperCase().split(' ').join('_');

const formikValidationSchema = yup.object().shape({
  optionals: yup.array().of(
    yup.object().shape({
      sn: yup.number().min(1, 'Min value 1').required('Sn is required'),
      description: yup.string().required('Description is required'),
      metres: yup.number().min(1, 'Min value 1').required('Metres is required'),
      add: yup.number().min(0, 'Min value 0').required('Amount is required'),
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

const OptionalsDefault = [
  'HEIGHT CHANGE: □1.65m, □1.95m, □2.1m (dble plinth), □2.25m, □2.55m, □2.7m (dble plinth) ■',
  'COLORBOND: □Metline □Trimclad □Miniscreen ■     Height:',
  'THICKER PLINTHBOARD: 150X38mm RECOMMENDED or 200x50mm (screw fixed with extra concrete)',
  'Add 600mm Bullnose (thick slats) 65mm Sq. lattice on full posts + extra top rail support ',
  'Add 90mm x 45mm Gable (lip) t/pine Capping  to fence top ',
  'LEVEL CONSTRUCTION: □Step panels or □level Construction ■ (_____ mm to _____mm approx)',
  'Change CCA treated pine plinth, rails and palings only to Ecowood or ACQ (arsenic free) treated pine',
  'ACCOUSTIC STYLE: Change plinth to 200x50mm and palings to 25mm thick at tighter 20mm spaces',
  'EXCAVATION INSURANCE: Third party service locator provided to mark underground services within your property, minimising risk of damage',
  'GATE:       mm open x     mm high on    x     mm posts Cover -      (inc 30mm sq Galv Steel Frame, black ring latch and padbolt).',
  'LOKK - outdoor key gate deadlock',
  'PAINT BOTTOM OF POSTS (800mm) using water based bitumen paint to help prevent moisture damage/rotting posts'
];

/* Component */
const OptionalsTable = ({ quoteId, metres, neighbours, updateTotal }) => {
  const [dataOptionsPrice, setDataOptionsPrice] = useState([]);
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const formikRef = useRef();
  const formikArrayRef = useRef();
  const dispatch = useDispatch();

  const rowInitialValue = useMemo(() => {
    return OptionalsDefault.map((option, i) => {
      return {
        sn: i + 1,
        description: option,
        metres: metres,
        permetre: 0,
        add: 0,
        cost: 0,
        client: 0,
        neighbours: Array(neighbours).fill(0)
      };
    });
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
      if (data.length) {
        data.sort((d1, d2) => d1.sn - d2.sn);
        formikRef.current.setFieldValue(
          'optionals',
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
      doUpdateTotal(formikRef.current.values.optionals);
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
        <Typography variant="h3">Options</Typography>
      </Grid>
      <Grid item xs={12}>
        <Formik
          innerRef={formikRef}
          initialValues={{ optionals: rowInitialValue }}
          enableReinitialize
          validationSchema={formikValidationSchema}
          onSubmit={async (values) => {
            doMutation(values.optionals);
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
                          <TableCell align="center">
                            <InputLabel>S/No.</InputLabel>
                          </TableCell>
                          <TableCell align="left">
                            <InputLabel>Description</InputLabel>
                          </TableCell>
                          <TableCell align="center">
                            <Grid container alignItems={'center'} justifyContent={'center'} flexWrap={'nowrap'}>
                              <InputLabel>Add</InputLabel>
                              <ArrowRightIcon />
                            </Grid>
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
                          name="optionals"
                          render={(arrayHelpers) => {
                            formikArrayRef.current = arrayHelpers;
                            return (
                              <>
                                {
                                  // eslint-disable-next-line
                              props.values.optionals && props.values.optionals.length > 0
                                    ? // eslint-disable-next-line
                                props.values.optionals.map((optional, index) => {
                                        return (
                                          <OptionalsRow
                                            formik={props}
                                            key={index}
                                            neighbours={neighbours}
                                            index={index}
                                            optionsPrice={dataOptionsPrice}
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
                  {detailsLoaded ? <FormikAutoSave formName="OptionalItems" /> : null}
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

OptionalsTable.propTypes = {
  quoteId: PropTypes.string,
  metres: PropTypes.number,
  neighbours: PropTypes.number,
  updateTotal: PropTypes.any
};

export default OptionalsTable;
