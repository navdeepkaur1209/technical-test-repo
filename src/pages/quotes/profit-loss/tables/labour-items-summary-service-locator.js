import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@mui/material';
import FormikTextField from 'components/FormikTextField';
import FormikSelectField from 'components/FormikSelectField';
import { useFormikContext } from 'formik';
import { DATA_SERVICE_LOCATOR } from 'utils/helpers';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import ListData from 'graphql/data/ListData';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';

/* Static methods and values */
const QuoteDetailsType = 'SPECS';
const QuoteDetailsDescription = 'Optionals';
const QuoteDetailsSubType = QuoteDetailsDescription.toUpperCase().split(' ').join('_');

/* Component */
const LabourItemsSummaryServiceLocator = ({ quoteId, formik, setProfitLoss }) => {
  const [serviceLocatorUpdated, setServiceLocatorUpdated] = useState(false);
  const [dataServiceLocator, setDataServiceLocator] = useState([]);
  const [optionals, setOptionals] = useState([]);
  const { values: formikValues, setFieldValue } = useFormikContext();

  useEffect(() => {
    setProfitLoss(formikValues.summary);
  }, [formikValues, setProfitLoss]);

  /* GraphQL: GetQuoteDetails */
  const { data: dataGetQuoteDetails } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: QuoteDetailsType, subtype: QuoteDetailsSubType }
  });

  useEffect(() => {
    if (dataGetQuoteDetails && dataGetQuoteDetails.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetails.GetQuoteDetails.QuoteDetails);
      if (data.length) {
        setOptionals(data);
      }
    }
  }, [dataGetQuoteDetails]);

  /* GraphQL: ListData */
  const { data: dataListDataServiceLocator } = useGraphQLQuery(ListData, {
    variables: { datatype: 'SERVICE_LOCATOR', pagination: {} }
  });

  useEffect(() => {
    if (dataListDataServiceLocator && dataListDataServiceLocator.ListData && dataListDataServiceLocator.ListData.Data) {
      setDataServiceLocator(() =>
        dataListDataServiceLocator.ListData.Data.map((d) => {
          return {
            Key: d.DataId,
            Value: d.DataType
          };
        })
      );
    }
  }, [dataListDataServiceLocator]);

  useEffect(() => {
    if (optionals.length && !serviceLocatorUpdated) {
      const amount = optionals
        .filter((l) => l.description.toUpperCase().indexOf('SERVICE LOCATOR') >= 0)
        .filter((l) => l.client > 0 || l.neighbours.some((n) => n > 0))
        .reduce((a, l) => (a += l.add), 0);
      setFieldValue(`summary.serviceLocator.amount`, amount);
      setFieldValue(`summary.serviceLocator.total`, (amount * DATA_SERVICE_LOCATOR) / 100);
      setServiceLocatorUpdated(true);
    }
  }, [optionals, serviceLocatorUpdated, setServiceLocatorUpdated, setFieldValue]);

  /* Render */
  return (
    <>
      {dataServiceLocator.length && optionals.length ? (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell scope="row">
            <FormikSelectField
              id={`summary.serviceLocator.description`}
              formik={formik}
              menuItems={dataServiceLocator}
              menuItemKey="Key"
              menuItemValue="Value"
            />
          </TableCell>
          <TableCell scope="row"></TableCell>
          <TableCell align="center">
            <FormikTextField id={`summary.serviceLocator.amount`} className="priceWidth" formik={formik} disabled />
          </TableCell>
          <TableCell align="center" width={95}>
            <FormikTextField id={`summary.serviceLocator.percent`} className="percentageFormat" formik={formik} disabled />
          </TableCell>
          <TableCell align="center">
            <FormikTextField id={`summary.serviceLocator.total`} className="priceFormat" formik={formik} disabled />
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
};

LabourItemsSummaryServiceLocator.propTypes = {
  quoteId: PropTypes.string,
  formik: PropTypes.any,
  setProfitLoss: PropTypes.any
};

export default LabourItemsSummaryServiceLocator;
