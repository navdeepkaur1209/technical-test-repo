import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Grid, Typography } from '@mui/material';
import { EXTRA_LABOUR_TYPES } from 'utils/helpers';
import FormikTextField from 'components/FormikTextField';
import { useFormikContext } from 'formik';

/* Component */
const LabourItemsSummaryTotal = ({ formik, setProfitLoss }) => {
  const { values: formikValues, setFieldValue } = useFormikContext();

  useEffect(() => {
    const total =
      formik.values.labours.reduce((a, l) => (a += l.total), 0) +
      formik.values.extralabour.filter((labour) => EXTRA_LABOUR_TYPES.indexOf(labour.labour) >= 0).reduce((a, l) => (a += l.total), 0);
    setFieldValue(`summary.labour`, total * 0.84);
    setFieldValue(`summary.total`, total);
  }, [formik.values.labours, formik.values.extralabour, setFieldValue]);

  useEffect(() => {
    setProfitLoss(formikValues.summary);
  }, [formikValues, setProfitLoss]);

  /* Render */
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell scope="row" className="item-icon">
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item width={68}>
            <Typography variant="h6" fontWeight={700}>
              Labour
            </Typography>
          </Grid>
          <Grid item width={'calc(100% - 68px)'}>
            <FormikTextField id={`summary.labour`} className="labourFormat" formik={formik} disabled />
          </Grid>
        </Grid>
      </TableCell>
      <TableCell scope="row"></TableCell>
      {/* <TableCell align="center"></TableCell> */}
      <TableCell align="right" colSpan={2}>
        <Typography variant="h6">Total Labour</Typography>
      </TableCell>
      <TableCell align="center">
        <FormikTextField id={`summary.total`} className="priceFormat" formik={formik} disabled />
      </TableCell>
    </TableRow>
  );
};

LabourItemsSummaryTotal.propTypes = {
  formik: PropTypes.any,
  setProfitLoss: PropTypes.any
};

export default LabourItemsSummaryTotal;
