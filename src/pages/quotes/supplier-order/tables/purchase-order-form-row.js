import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Grid, IconButton } from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import FormikTextField from 'components/FormikTextField';
import FormikSelectField from 'components/FormikSelectField';
import { getIn } from 'formik';

// GraphQL.
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import ListProducts from 'graphql/data/ListProducts';

/* Component */
const PurchaseOrderFormRow = ({ formik, index, items, helpers }) => {
  const [products, setProducts] = useState([]);

  const item = useMemo(() => {
    return getIn(formik.values, `orders[${index}].item`);
  }, [index, formik.values]);

  const handleChangeItem = (e) => {
    formik.handleChange(e);
    formik.setFieldValue(`orders[${index}].product`, '');
  };

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
                {getIn(formik.values, `orders[${index}].type`) == 'CORE' ? null : (
                  <IconButton color="error" onClick={() => helpers.remove(index)}>
                    <CloseOutlined />
                  </IconButton>
                )}
              </Grid>
              <Grid item width={'calc(100% - 52px)'}>
                <FormikSelectField
                  id={`orders[${index}].item`}
                  formik={formik}
                  menuItems={items}
                  menuItemKey="Key"
                  menuItemValue="Value"
                  onChange={handleChangeItem}
                />
              </Grid>
            </Grid>
          </TableCell>
          <TableCell scope="row" className="fence-product">
            {products.length ? (
              <FormikSelectField
                id={`orders[${index}].product`}
                formik={formik}
                menuItems={products}
                menuItemKey="ProductId"
                menuItemValue="Product"
              />
            ) : (
              <FormikTextField id={`orders[${index}].product`} formik={formik} disabled />
            )}
          </TableCell>
          <TableCell align="center">
            <FormikTextField id={`orders[${index}].qty`} className="priceWidth" formik={formik} />
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
};

PurchaseOrderFormRow.propTypes = {
  formik: PropTypes.any,
  index: PropTypes.number,
  items: PropTypes.any,
  helpers: PropTypes.any
};

export default PurchaseOrderFormRow;
