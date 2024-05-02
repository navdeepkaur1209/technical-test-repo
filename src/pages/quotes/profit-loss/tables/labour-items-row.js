import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Grid, IconButton } from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import FormikTextField from 'components/FormikTextField';
import FormikSelectField from 'components/FormikSelectField';
import { getIn, useFormikContext } from 'formik';

/* Component */
const LabourItemsRow = ({ formik, index, products, helpers }) => {
  const { setFieldValue } = useFormikContext();

  /* Calculates total when fields change */
  const updatePrices = useCallback(
    (productName, qty) => {
      const product = products.find((p) => p.Product == productName);
      const cost = product && product.SellPrice ? product.SellPrice : 0;
      const total = (isNaN(qty) ? 1 : qty) * cost;
      setFieldValue(`labours[${index}].cost`, cost);
      setFieldValue(`labours[${index}].total`, total);
    },
    [products, index, setFieldValue]
  );

  const handleChangeProduct = (e) => {
    formik.handleChange(e);
    const productName = e.target.value;
    const qty = parseInt(getIn(formik.values, `labours[${index}].qty`), 10);
    updatePrices(productName, qty);
  };

  const handleChangeQty = (e) => {
    formik.handleChange(e);
    const productName = getIn(formik.values, `labours[${index}].product`);
    const qty = parseInt(e.target.value, 10);
    updatePrices(productName, qty);
  };

  /* Render */
  return (
    <>
      {products.length ? (
        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell scope="row" className="item-icon">
            <Grid item xs={12} spacing={2} container>
              <Grid item width={68}>
                <IconButton color="error" onClick={() => helpers.remove(index)}>
                  <CloseOutlined />
                </IconButton>
              </Grid>
              <Grid item width={'calc(100% - 68px)'}>
                <FormikTextField id={`labours[${index}].item`} formik={formik} disabled />
              </Grid>
            </Grid>
          </TableCell>
          <TableCell scope="row" className="fence-product">
            <FormikSelectField
              id={`labours[${index}].product`}
              formik={formik}
              menuItems={products}
              menuItemKey="ProductId"
              menuItemValue="Product"
              onChange={handleChangeProduct}
            />
          </TableCell>
          <TableCell align="center">
            <FormikTextField id={`labours[${index}].qty`} className="priceWidth" formik={formik} onChange={handleChangeQty} />
          </TableCell>
          <TableCell align="center">
            <FormikTextField id={`labours[${index}].cost`} className="priceFormat" formik={formik} disabled />
          </TableCell>
          <TableCell align="center">
            <FormikTextField id={`labours[${index}].total`} className="priceFormat" formik={formik} disabled />
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
};

LabourItemsRow.propTypes = {
  formik: PropTypes.any,
  index: PropTypes.number,
  products: PropTypes.any,
  helpers: PropTypes.any
};

export default LabourItemsRow;
