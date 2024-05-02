import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button, InputLabel } from '@mui/material';
import FormikAutoSave from 'components/FormikAutoSave';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import FormikTextField from 'components/FormikTextField';
import FormikSelectField from 'components/FormikSelectField';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import ListData from 'graphql/data/ListData';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';
import UpdateQuotePackage from 'graphql/quotes/UpdateQuotePackage';

/* Static methods and values */
const QuoteDetailsType = 'SPECS';
const QuoteDetailsDescription = 'Paling';
const QuoteDetailsSubType = QuoteDetailsDescription.toUpperCase().split(' ').join('_');

const formikValidationSchema = yup.object({
  height: yup.string().required('Height is required'),
  paling: yup.string().required('Paling is required'),
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
});

/* Component */
const PalingTable = ({ quoteId, neighbours, formsRef, updateTotal, updateMetres }) => {
  const [heights, setHeights] = useState([]);
  const [palings, setPalings] = useState([]);
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const formikRef = useRef();
  const dispatch = useDispatch();

  const formikInitialValues = useMemo(() => {
    return {
      height: '',
      paling: '',
      metres: 0,
      cost: 0,
      client: 0,
      neighbours: Array(neighbours).fill(0)
    };
  }, [neighbours]);

  const doUpdateTotal = useCallback(
    (subtotal) => {
      updateTotal(QuoteDetailsSubType, {
        cost: subtotal['cost'],
        client: subtotal['client'],
        neighbours: subtotal['neighbours']
      });
    },
    [updateTotal]
  );

  const handleChangeMetres = useCallback(
    (e) => {
      updateMetres(parseInt(e.target.value, 10));
      formikRef.current.handleChange(e);
    },
    [updateMetres]
  );

  /* GraphQL: GetQuoteDetails */
  const [doGetQuoteDetails, { data: dataGetQuoteDetails }] = useGraphQLLazyQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: QuoteDetailsType, subtype: QuoteDetailsSubType }
  });

  useEffect(() => {
    if (!detailsLoaded && dataGetQuoteDetails && dataGetQuoteDetails.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetails.GetQuoteDetails.QuoteDetails);
      if (data.length) {
        Object.keys(formikInitialValues).map((v) =>
          formikRef.current.setFieldValue(
            v,
            v === 'neighbours'
              ? data[0][v].slice(0, neighbours).concat(Array(Math.max(0, neighbours - data[0][v].length)).fill(0))
              : data[0][v]
          )
        );

        doUpdateTotal(data[0]);
        updateMetres(parseInt(data[0].metres, 10));
      }
      setDetailsLoaded(true);
    }
  }, [dataGetQuoteDetails, detailsLoaded, setDetailsLoaded, formikRef, formikInitialValues, neighbours, doUpdateTotal, updateMetres]);

  useEffect(() => {
    if (detailsLoaded && formikRef && formikRef.current) {
      if (
        formikRef.current.values &&
        formikRef.current.values.height &&
        formikRef.current.values.paling &&
        formikRef.current.values.metres
      ) {
        if (formikRef.current.values.height.length && formikRef.current.values.paling.length) {
          const cost = parseFloat(formikRef.current.values.cost);
          const total =
            parseFloat(formikRef.current.values.client) + formikRef.current.values.neighbours.reduce((a, c) => a + parseFloat(c), 0);
          if (cost !== total) {
            formikRef.current.submitForm();
          }
        }
      }
    }
  }, [formikRef, detailsLoaded]);

  /* GraphQL: ListData */
  const { data: dataListDataHeights } = useGraphQLQuery(ListData, {
    variables: { datatype: 'HEIGHTS', pagination: {} }
  });

  const { data: dataListDataPalings } = useGraphQLQuery(ListData, {
    variables: { datatype: 'PALING', pagination: {} }
  });

  useEffect(() => {
    if (dataListDataHeights && dataListDataHeights.ListData && dataListDataHeights.ListData.Data) {
      setHeights(() =>
        dataListDataHeights.ListData.Data.map((d) => {
          return {
            Key: d.DataId,
            Value: d.DataMainValue
          };
        })
      );
    }
    if (dataListDataPalings && dataListDataPalings.ListData && dataListDataPalings.ListData.Data) {
      setPalings(() =>
        dataListDataPalings.ListData.Data.map((d) => {
          return {
            Key: d.DataId,
            Value: d.DataMainValue
          };
        })
      );
    }
  }, [dataListDataHeights, dataListDataPalings]);

  useEffect(() => {
    if (heights.length && palings.length) {
      doGetQuoteDetails();
    }
  }, [heights, palings, doGetQuoteDetails]);

  /* GraphQL: UpdateQuotePackage */
  const [mutationUpdateQuotePackage, { data: resultUpdateQuotePackage }] = useGraphQLMutation(UpdateQuotePackage);

  const doMutation = (values) => {
    mutationUpdateQuotePackage({
      variables: {
        id: quoteId,
        details: JSON.stringify(values)
      }
    });
  };

  /* Set defaults for field values */
  const updateCostShare = useCallback(
    (cost) => {
      const perShare = Math.round((cost / (neighbours + 1)) * 100) / 100;

      let neighboursShare = 0;
      for (let i = 0; i < neighbours; i++) {
        formikRef.current.setFieldValue(`neighbours.${i}`, perShare);
        neighboursShare += perShare;
      }
      formikRef.current.setFieldValue(`client`, cost - neighboursShare);
    },
    [neighbours]
  );

  useEffect(() => {
    if (resultUpdateQuotePackage && resultUpdateQuotePackage.UpdateQuotePackage.Status === 'SUCCESS') {
      const NewData = JSON.parse(resultUpdateQuotePackage.UpdateQuotePackage.Data);
      formikRef.current.setFieldValue('cost', NewData.cost);
      updateCostShare(NewData.cost);
      doUpdateTotal(formikRef.current.values);
      dispatch(
        openSnackbar({
          open: true,
          message: [QuoteDetailsDescription, resultUpdateQuotePackage.UpdateQuotePackage.Message].join(': '),
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
  }, [resultUpdateQuotePackage, dispatch, formikRef, doUpdateTotal, updateCostShare]);

  /* Render */
  return (
    <TableContainer component={Paper}>
      {heights.length && palings.length ? (
        <Formik
          innerRef={formikRef}
          initialValues={formikInitialValues}
          enableReinitialize
          validationSchema={formikValidationSchema}
          onSubmit={async (values) => {
            doMutation(values);
          }}
        >
          {(props) => (
            <Form>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <InputLabel>Height</InputLabel>
                    </TableCell>
                    <TableCell align="left">
                      <InputLabel>Description</InputLabel>
                    </TableCell>
                    <TableCell align="center">
                      <InputLabel>Metres</InputLabel>
                    </TableCell>
                    <TableCell align="center" className="cost-col">
                      <InputLabel>Cost</InputLabel>
                    </TableCell>
                    <TableCell align="center" className="client-col">
                      <InputLabel>Client Share</InputLabel>
                    </TableCell>
                    {Array(neighbours)
                      .fill(0)
                      .map((n, i) => (
                        <TableCell key={['neighbour', i + 1].join('')} align="center" className="neigh-col">
                          <InputLabel>
                            Neighbour {i + 1} <br /> Share
                          </InputLabel>
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell scope="row">
                      <FormikSelectField id="height" formik={props} menuItems={heights} menuItemKey="Key" menuItemValue="Value" />
                    </TableCell>
                    <TableCell align="left">
                      <FormikSelectField
                        id="paling"
                        className="pailingWidth"
                        formik={props}
                        menuItems={palings}
                        menuItemKey="Key"
                        menuItemValue="Value"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <FormikTextField id="metres" className="priceWidth" formik={props} onChange={handleChangeMetres} />
                    </TableCell>
                    <TableCell align="center" className="inputDisable">
                      <FormikTextField id="cost" className="priceFormat" formik={props} />
                    </TableCell>
                    <TableCell align="center">
                      <FormikTextField id="client" className="priceFormat" formik={props} />
                    </TableCell>
                    {Array(neighbours)
                      .fill(0)
                      .map((n, i) => (
                        <TableCell key={['neighbour', i + 1].join('')} align="center" width={75}>
                          <FormikTextField id={`neighbours.${i}`} className="priceFormat" formik={props} />
                        </TableCell>
                      ))}
                  </TableRow>
                  <TableRow sx={{ display: 'none' }}>
                    <TableCell>
                      <Button
                        ref={(element) => {
                          if (element) {
                            formsRef.current[0] = element;
                          }
                        }}
                        style={{ display: 'none' }}
                        variant="contained"
                        type="submit"
                      ></Button>
                      <FormikAutoSave formName="Paling" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Form>
          )}
        </Formik>
      ) : null}
    </TableContainer>
  );
};

PalingTable.propTypes = {
  quoteId: PropTypes.string,
  neighbours: PropTypes.number,
  formsRef: PropTypes.any,
  updateTotal: PropTypes.any,
  updateMetres: PropTypes.any
};

export default PalingTable;
