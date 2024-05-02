import { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Grid, IconButton } from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import FormikTextField from 'components/FormikTextField';
import FormikSelectField from 'components/FormikSelectField';
import { getIn, useFormikContext } from 'formik';

// GraphQL.
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import ListProducts from 'graphql/data/ListProducts';

/* Component */
const PricingRow = ({ formik, index, items, helpers }) => {
  const [products, setProducts] = useState([]);
  const [updateCost, setUpdateCost] = useState(false);
  const { setFieldValue } = useFormikContext();

  const item = useMemo(() => {
    return getIn(formik.values, `pricing[${index}].item`);
  }, [index, formik.values]);

  /* Calculates total when fields change */
  const updatePrices = useCallback(
    (productName, metres) => {
      const product = products.find((p) => p.Product == productName);
      const rate = product && product.SellPrice ? product.SellPrice : 0;
      const total = (isNaN(metres) ? 1 : metres) * rate;
      setFieldValue(`pricing[${index}].rate`, rate);
      setFieldValue(`pricing[${index}].total`, total);
    },
    [products, index, setFieldValue]
  );

  const handleChangeItem = (e) => {
    formik.handleChange(e);
    formik.setFieldValue(`pricing[${index}].product`, '');
    const metres = parseInt(getIn(formik.values, `pricing[${index}].metres`), 10);
    updatePrices(null, metres);
  };

  const handleChangeProduct = (e) => {
    formik.handleChange(e);
    const productName = e.target.value;
    const metres = parseInt(getIn(formik.values, `pricing[${index}].metres`), 10);
    updatePrices(productName, metres);
  };

  const handleChangeMetres = (e) => {
    formik.handleChange(e);
    const productName = getIn(formik.values, `pricing[${index}].product`);
    const metres = parseInt(e.target.value, 10);
    updatePrices(productName, metres);
  };

  useEffect(() => {
    if (!updateCost && products.length) {
      const productName = getIn(formik.values, `pricing[${index}].product`);
      const metres = parseInt(getIn(formik.values, `pricing[${index}].metres`), 10);
      updatePrices(productName, metres);
      setUpdateCost(true);
    }
  }, [products, index, formik, updateCost, updatePrices]);

  /* GraphQL: ListProducts */
  const [doListProducts, { data: dataListProducts }] = useGraphQLLazyQuery(ListProducts, {
    variables: { item: item, pagination: {} }
  });

  useEffect(() => {
    if (dataListProducts && dataListProducts.ListProducts && dataListProducts.ListProducts.Products) {
      setProducts([...dataListProducts.ListProducts.Products]);
    }
  }, [dataListProducts]);

  // Reload products when item changed
  useEffect(() => {
    if (item !== '') {
      doListProducts({
        variables: {
          item: item,
          pagination: {}
        }
      });
    }
  }, [item, doListProducts]);

  /* Render */
  return (
    <>
      {items.length ? (
        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell className="item-icon" scope="row">
            <Grid item xs={12} spacing={2} container>
              <Grid item width={52}>
                {index > 0 ? (
                  <IconButton color="error" onClick={() => helpers.remove(index)}>
                    <CloseOutlined />
                  </IconButton>
                ) : null}
              </Grid>
              <Grid item width={'calc(100% - 52px)'}>
                <FormikSelectField
                  id={`pricing[${index}].item`}
                  formik={formik}
                  menuItems={items}
                  menuItemKey="Key"
                  menuItemValue="Value"
                  onChange={handleChangeItem}
                  disabled={index === 0 ? true : false}
                />
              </Grid>
            </Grid>
          </TableCell>
          <TableCell scope="row" className="fence-product">
            {products.length ? (
              <FormikSelectField
                id={`pricing[${index}].product`}
                formik={formik}
                menuItems={products}
                menuItemKey="ProductId"
                menuItemValue="Product"
                onChange={handleChangeProduct}
                disabled={index === 0 ? true : false}
              />
            ) : (
              <FormikTextField id={`pricing[${index}].product`} formik={formik} disabled />
            )}
          </TableCell>
          <TableCell align="center">
            <FormikTextField
              id={`pricing[${index}].metres`}
              className="priceWidth"
              formik={formik}
              disabled={index === 0 ? true : false}
              onChange={handleChangeMetres}
            />
          </TableCell>
          <TableCell align="center">
            <FormikTextField id={`pricing[${index}].rate`} className="priceFormat" formik={formik} disabled />
          </TableCell>
          <TableCell align="center">
            <FormikTextField id={`pricing[${index}].total`} className="priceFormat" formik={formik} disabled />
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
};

PricingRow.propTypes = {
  formik: PropTypes.any,
  index: PropTypes.number,
  items: PropTypes.any,
  helpers: PropTypes.any
};

export default PricingRow;
