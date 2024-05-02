import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { Button, Typography } from '@mui/material';
import FormikAutoSave from 'components/FormikAutoSave';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import FormikSelectField from 'components/FormikSelectField';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import ListData from 'graphql/data/ListData';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';
import UpdateQuoteDetails from 'graphql/quotes/UpdateQuoteDetails';

/* Static methods and values */
const QuoteDetailsType = 'SPECS';
const QuoteDetailsDescription = 'Fence';
const QuoteDetailsSubType = QuoteDetailsDescription.toUpperCase().split(' ').join('_');

const formikInitialValues = {
  fence: 'PALING',
  description: ''
};

const formikValidationSchema = yup.object({
  fence: yup.string().required('Fence is required'),
  description: yup.string().required('Description is required')
});

/* Component */
const FenceTable = ({ quoteId, formsRef }) => {
  const [fencings, setFencings] = useState([]);
  const [palings, setPalings] = useState([]);
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const formikRef = useRef();
  const dispatch = useDispatch();

  /* GraphQL: GetQuoteDetails */
  const [doGetQuoteDetails, { data: dataGetQuoteDetails }] = useGraphQLLazyQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: QuoteDetailsType, subtype: QuoteDetailsSubType }
  });

  useEffect(() => {
    if (!detailsLoaded && dataGetQuoteDetails && dataGetQuoteDetails.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetails.GetQuoteDetails.QuoteDetails);
      if (data.length) {
        Object.keys(formikInitialValues).map((v) => formikRef.current.setFieldValue(v, data[0][v]));
      }
      setDetailsLoaded(true);
    }
  }, [dataGetQuoteDetails, detailsLoaded, setDetailsLoaded, formikRef]);

  /* GraphQL: ListData */
  const { data: dataListDataFencings } = useGraphQLQuery(ListData, {
    variables: { datatype: 'FENCING', pagination: {} }
  });

  const { data: dataListDataPalings } = useGraphQLQuery(ListData, {
    variables: { datatype: 'PALING', pagination: {} }
  });

  useEffect(() => {
    if (dataListDataFencings && dataListDataFencings.ListData && dataListDataFencings.ListData.Data) {
      setFencings(() =>
        dataListDataFencings.ListData.Data.map((d) => {
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
  }, [dataListDataFencings, dataListDataPalings]);

  useEffect(() => {
    if (fencings.length && palings.length) {
      doGetQuoteDetails();
    }
  }, [fencings, palings, doGetQuoteDetails]);

  /* GraphQL: UpdateQuoteDetails */
  const [mutationUpdateQuoteDetails, { data: resultUpdateQuoteDetails }] = useGraphQLMutation(UpdateQuoteDetails);

  const doMutation = (values) => {
    mutationUpdateQuoteDetails({
      variables: {
        id: quoteId,
        type: QuoteDetailsType,
        subtype: QuoteDetailsSubType,
        details: JSON.stringify([values])
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
    <TableContainer component={Paper}>
      {fencings.length && palings.length ? (
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
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" width={219}>
                      <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                        Fence
                      </Typography>
                    </TableCell>
                    <TableCell align="left" width={278}>
                      <FormikSelectField id="fence" formik={props} menuItems={fencings} menuItemKey="Key" menuItemValue="Value" />
                    </TableCell>
                    <TableCell align="left" sx={{ paddingRight: '32px !important' }}>
                      <FormikSelectField id="description" formik={props} menuItems={palings} menuItemKey="Key" menuItemValue="Value" />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ display: 'none' }}>
                    <TableCell>
                      <Button
                        ref={(element) => {
                          if (element) {
                            formsRef.current[1] = element;
                          }
                        }}
                        style={{ display: 'none' }}
                        variant="contained"
                        type="submit"
                      ></Button>
                      <FormikAutoSave formName="Fencing" />
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

FenceTable.propTypes = {
  quoteId: PropTypes.string,
  formsRef: PropTypes.any
};

export default FenceTable;
