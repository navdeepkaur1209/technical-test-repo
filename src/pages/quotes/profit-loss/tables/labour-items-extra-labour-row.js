import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@mui/material';
import FormikTextField from 'components/FormikTextField';

/* Component */
const ExtraLabourRow = ({ formik, index }) => {
  /* Render */
  return (
    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left">
        <FormikTextField id={`extralabour[${index}].labour`} formik={formik} disabled />
      </TableCell>
      <TableCell scope="row" className="fence-product">
        <FormikTextField id={`extralabour[${index}].description`} formik={formik} disabled />
      </TableCell>
      <TableCell align="center">
        <FormikTextField id={`extralabour[${index}].qty`} className="priceWidth" formik={formik} disabled />
      </TableCell>
      <TableCell align="center">
        <FormikTextField id={`extralabour[${index}].cost`} className="percentageFormat" formik={formik} disabled />
      </TableCell>
      <TableCell align="center">
        <FormikTextField id={`extralabour[${index}].total`} className="priceFormat" formik={formik} disabled />
      </TableCell>
    </TableRow>
  );
};

ExtraLabourRow.propTypes = {
  formik: PropTypes.any,
  index: PropTypes.number
};

export default ExtraLabourRow;
