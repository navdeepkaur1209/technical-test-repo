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
const FenceItemsRow = ({ formik, index, items, helpers }) => {
  const [products, setProducts] = useState([]);
  const [updateCost, setUpdateCost] = useState(false);
  const { setFieldValue } = useFormikContext();

  const item = useMemo(() => {
    return getIn(formik.values, `fences[${index}].item`);
  }, [index, formik.values]);

  /* Calculates total when fields change */
  const updatePrices = useCallback(
    (productName, qty) => {
      const product = products.find((p) => p.Product == productName);
      const cost = product && product.SellPrice ? product.SellPrice : 0;
      const total = (isNaN(qty) ? 1 : qty) * cost;
      setFieldValue(`fences[${index}].cost`, cost);
      setFieldValue(`fences[${index}].total`, total);
    },
    [products, index, setFieldValue]
  );

  const handleChangeItem = (e) => {
    formik.handleChange(e);
    formik.setFieldValue(`fences[${index}].product`, '');
    const qty = parseInt(getIn(formik.values, `fences[${index}].qty`), 10);
    updatePrices(null, qty);
  };

  const handleChangeProduct = (e) => {
    formik.handleChange(e);
    const productName = e.target.value;
    const qty = parseInt(getIn(formik.values, `fences[${index}].qty`), 10);
    updatePrices(productName, qty);
  };

  const handleChangeQty = (e) => {
    formik.handleChange(e);
    const productName = getIn(formik.values, `fences[${index}].product`);
    const qty = parseInt(e.target.value, 10);
    updatePrices(productName, qty);
  };

  useEffect(() => {
    if (!updateCost && products.length) {
      const productName = getIn(formik.values, `fences[${index}].product`);
      const qty = parseInt(getIn(formik.values, `fences[${index}].qty`), 10);
      updatePrices(productName, qty);
      setUpdateCost(true);
    }
  }, [products, index, formik.values, updateCost, updatePrices]);

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
          <TableCell scope="row" className="item-icon">
            <Grid item xs={12} spacing={2} container>
              <Grid item width={68}>
                {index > 0 ? (
                  <IconButton color="error" onClick={() => helpers.remove(index)}>
                    <CloseOutlined />
                  </IconButton>
                ) : null}
              </Grid>
              <Grid item width={'calc(100% - 68px)'}>
                <FormikSelectField
                  id={`fences[${index}].item`}
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
                id={`fences[${index}].product`}
                formik={formik}
                menuItems={products}
                menuItemKey="ProductId"
                menuItemValue="Product"
                onChange={handleChangeProduct}
                disabled={index === 0 ? true : false}
              />
            ) : (
              <FormikTextField id={`fences[${index}].product`} className="fence-product" formik={formik} disabled />
            )}
          </TableCell>
          <TableCell align="center">
            <FormikTextField id={`fences[${index}].qty`} className="priceWidth" formik={formik} onChange={handleChangeQty} />
          </TableCell>
          <TableCell align="center">
            <FormikTextField id={`fences[${index}].cost`} className="priceFormat" formik={formik} disabled />
          </TableCell>
          <TableCell align="center">
            <FormikTextField id={`fences[${index}].total`} className="priceFormat" formik={formik} disabled />
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
};

FenceItemsRow.propTypes = {
  formik: PropTypes.any,
  index: PropTypes.number,
  items: PropTypes.any,
  helpers: PropTypes.any
};

export default FenceItemsRow;
