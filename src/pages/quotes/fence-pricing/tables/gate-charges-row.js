import PropTypes from 'prop-types';
import { TableRow, TableCell, Grid, IconButton } from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import FormikTextField from 'components/FormikTextField';
import FormikSelectField from 'components/FormikSelectField';
import { getIn } from 'formik';

/* Component */
const GateChargesRow = ({ formik, index, gates, helpers }) => {
  /* Calculates total when fields change */
  const handleChangeQty = (e) => {
    formik.handleChange(e);
    const qty = parseInt(e.target.value, 10);
    const rate = parseInt(getIn(formik.values, `gates[${index}].rate`), 10);
    const total = (isNaN(qty) ? 0 : qty) * (isNaN(rate) ? 0 : rate);
    formik.setFieldValue(`gates[${index}].total`, total);
  };

  const handleChangeRate = (e) => {
    formik.handleChange(e);
    const qty = parseInt(getIn(formik.values, `gates[${index}].qty`), 10);
    const rate = parseInt(e.target.value, 10);
    const total = (isNaN(qty) ? 0 : qty) * (isNaN(rate) ? 0 : rate);
    formik.setFieldValue(`gates[${index}].total`, total);
  };

  /* Render */
  return (
    <>
      {gates.length ? (
        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell scope="row" sx={{ minWidth: 140 }}>
            <Grid item xs={12} spacing={1.5} container>
              <Grid item width={52} className="">
                <IconButton color="error" onClick={() => helpers.remove(index)}>
                  <CloseOutlined />
                </IconButton>
              </Grid>
              <Grid item>
                <FormikTextField className="srwidth" id={`gates[${index}].sn`} formik={formik} disabled />
              </Grid>
            </Grid>
          </TableCell>
          <TableCell scope="row" sx={{ width: 871, paddingLeft: 0 }}>
            <FormikSelectField
              id={`gates[${index}].description`}
              formik={formik}
              menuItems={gates}
              menuItemKey="Key"
              menuItemValue="Value"
            />
          </TableCell>
          <TableCell align="center">
            <FormikTextField id={`gates[${index}].qty`} className="priceWidth" formik={formik} onChange={handleChangeQty} />
          </TableCell>
          <TableCell align="center">
            <FormikTextField id={`gates[${index}].rate`} className="priceFormat" formik={formik} onChange={handleChangeRate} />
          </TableCell>
          <TableCell align="center">
            <FormikTextField id={`gates[${index}].total`} className="priceFormat" formik={formik} disabled />
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
};

GateChargesRow.propTypes = {
  formik: PropTypes.any,
  index: PropTypes.number,
  gates: PropTypes.any,
  helpers: PropTypes.any
};

export default GateChargesRow;
