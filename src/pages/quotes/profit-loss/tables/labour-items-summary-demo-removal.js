import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@mui/material';
import { DEMO_REMOVAL_TYPES } from 'utils/helpers';
import FormikTextField from 'components/FormikTextField';
import FormikSelectField from 'components/FormikSelectField';
import { useFormikContext } from 'formik';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import ListData from 'graphql/data/ListData';

/* Component */
const LabourItemsSummaryDemoRemoval = ({ formik, setProfitLoss }) => {
  const [dataDemoRemoval, setDataDemoRemoval] = useState([]);
  const { values: formikValues, setFieldValue } = useFormikContext();

  const updateDemoRemovalCosts = useCallback(
    (description) => {
      const percentData = dataDemoRemoval.find((d) => d.Value == description);
      const amount = formik.values.extralabour
        .filter((l) => (description == 'DEMO/REMOVAL' ? DEMO_REMOVAL_TYPES.indexOf(l.labour) >= 0 : ['CLEARING'].indexOf(l.labour) >= 0))
        .reduce((a, l) => (a += Number(l.qty)), 0);
      const percentDecimal = (percentData ? parseFloat(percentData.Data.DEMO_REMOVAL_PERCENT) : 0) / 100;
      setFieldValue(`summary.demoRemoval.percent`, percentData ? percentData.Data.DEMO_REMOVAL_PERCENT : 0);
      setFieldValue(`summary.demoRemoval.amount`, Number(amount).toFixed(2));
      setFieldValue(`summary.demoRemoval.total`, amount * percentDecimal);
    },
    [dataDemoRemoval, formik.values.extralabour, setFieldValue]
  );

  useEffect(() => {
    setProfitLoss(formikValues.summary);
  }, [formikValues, setProfitLoss]);

  /* Calculates total when fields change */
  const handleChangeDemoRemoval = useCallback(
    (e) => {
      const description = e.target.value;
      formik.handleChange(e);
      updateDemoRemovalCosts(description);
    },
    [formik, updateDemoRemovalCosts]
  );

  /* GraphQL: ListData */
  const { data: dataListDataDemoRemoval } = useGraphQLQuery(ListData, {
    variables: { datatype: 'DEMO_REMOVAL', pagination: {} }
  });

  useEffect(() => {
    if (dataListDataDemoRemoval && dataListDataDemoRemoval.ListData && dataListDataDemoRemoval.ListData.Data) {
      setDataDemoRemoval(() =>
        dataListDataDemoRemoval.ListData.Data.map((d) => {
          return {
            Key: d.DataId,
            Value: d.DataMainValue,
            Data: JSON.parse(d.Data)
          };
        })
      );
    }
  }, [dataListDataDemoRemoval, setFieldValue]);

  useEffect(() => {
    if (dataDemoRemoval.length) {
      setFieldValue(`summary.demoRemoval.description`, 'DEMO/REMOVAL');
      updateDemoRemovalCosts('DEMO/REMOVAL');
    }
  }, [dataDemoRemoval, setFieldValue, updateDemoRemovalCosts]);

  /* Render */
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell scope="row">
        <FormikSelectField
          id={`summary.demoRemoval.description`}
          formik={formik}
          menuItems={dataDemoRemoval}
          menuItemKey="Key"
          menuItemValue="Value"
          onChange={handleChangeDemoRemoval}
        />
      </TableCell>
      <TableCell scope="row"></TableCell>
      <TableCell align="center">
        <FormikTextField id={`summary.demoRemoval.amount`} className="priceWidth" formik={formik} disabled />
      </TableCell>
      <TableCell align="center" width={95}>
        <FormikTextField id={`summary.demoRemoval.percent`} className="percentageFormat" formik={formik} disabled />
      </TableCell>
      <TableCell align="center">
        <FormikTextField id={`summary.demoRemoval.total`} className="priceFormat" formik={formik} disabled />
      </TableCell>
    </TableRow>
  );
};

LabourItemsSummaryDemoRemoval.propTypes = {
  formik: PropTypes.any,
  setProfitLoss: PropTypes.any
};

export default LabourItemsSummaryDemoRemoval;
