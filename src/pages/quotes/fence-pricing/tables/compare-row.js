import { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Typography } from '@mui/material';
import FormikTextField from 'components/FormikTextField';
import FormikSelectField from 'components/FormikSelectField';
import { getIn } from 'formik';

// GraphQL.
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import ListProducts from 'graphql/data/ListProducts';

/* Static methods and values */
const compareTypes = [
  {
    Key: 'HEIGHTS',
    Value: 'PALING_OPTIONS'
  },
  {
    Key: 'CB PANELS PER METRE',
    Value: 'CBOND_OPTIONS'
  }
];

/* Component */
const CompareRow = ({ formik, index, lastIndex, fenceMetres }) => {
  const [products, setProducts] = useState([]);
  const [updateCost, setUpdateCost] = useState(false);

  const item = useMemo(() => {
    return getIn(formik.values, `compare[${index}].item`);
  }, [index, formik.values]);

  /* Calculates total when fields change */
  const updatePrices = useCallback(
    (productName, metres) => {
      const product = products.find((p) => p.Product == productName);
      const rate = product && product.SellPrice ? product.SellPrice : 0;
      const total = (isNaN(metres) ? 1 : metres) * rate;
      formik.setFieldValue(`compare[${index}].rate`, rate);
      formik.setFieldValue(`compare[${index}].total`, total);

      if (formik.values.compare.length === 3) {
        const compareToTotal = parseInt(getIn(formik.values, `compare[${index === 0 ? 1 : 0}].total`), 10);
        if (total > 0 && compareToTotal > 0) {
          formik.setFieldValue(`compare[2].total`, index === 0 ? compareToTotal - total : total - compareToTotal);
        }
      }
    },
    [products, index, formik]
  );

  const handleChangeItem = (e) => {
    formik.handleChange(e);
    formik.setFieldValue(`compare[${index}].product`, '');
    const metres = parseInt(getIn(formik.values, `compare[${index}].metres`), 10);
    updatePrices(null, metres);
  };

  const handleChangeProduct = (e) => {
    formik.handleChange(e);
    const productName = e.target.value;
    const metres = parseInt(getIn(formik.values, `compare[${index}].metres`), 10);
    updatePrices(productName, metres);
  };

  useEffect(() => {
    if (!updateCost && products.length) {
      const productName = getIn(formik.values, `compare[${index}].product`);
      const metres = parseInt(getIn(formik.values, `compare[${index}].metres`), 10);
      updatePrices(productName, metres);
      setUpdateCost(true);
    }
  }, [products, index, formik, updateCost, updatePrices]);

  // Update cost when metres change (this does not save the data).
  useEffect(() => {
    setUpdateCost(false);
  }, [fenceMetres]);

  /* GraphQL: ListProducts */
  const [doListProducts, { data: dataListProducts }] = useGraphQLLazyQuery(ListProducts, {
    variables: { item: item, pagination: {} }
  });

  useEffect(() => {
    if (dataListProducts && dataListProducts.ListProducts && dataListProducts.ListProducts.Products) {
      setProducts([...dataListProducts.ListProducts.Products]);
    }
  }, [dataListProducts]);

  // Reload products when item changed.
  useEffect(() => {
    if (item !== '') {
      const product = compareTypes.find((c) => c.Value == item);
      doListProducts({
        variables: {
          item: product.Key,
          pagination: {}
        }
      });
    }
  }, [item, doListProducts]);

  /* Render */
  return (
    <>
      {compareTypes.length ? (
        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell scope="row" className="item-icon">
            {index === 0 ? (
              <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                Current Fence Type
              </Typography>
            ) : index < lastIndex ? (
              <FormikSelectField
                id={`compare[${index}].item`}
                className="fence-opt-item"
                formik={formik}
                menuItems={compareTypes}
                menuItemKey="Key"
                menuItemValue="Value"
                onChange={handleChangeItem}
                disabled={index === 0 ? true : false}
              />
            ) : null}
          </TableCell>
          <TableCell scope="row" className="fence-product">
            {index < lastIndex ? (
              products.length ? (
                <FormikSelectField
                  id={`compare[${index}].product`}
                  formik={formik}
                  menuItems={products}
                  menuItemKey="ProductId"
                  menuItemValue="Product"
                  onChange={handleChangeProduct}
                  disabled={index === 0 ? true : false}
                />
              ) : (
                <FormikTextField id={`compare[${index}].product`} formik={formik} disabled />
              )
            ) : null}
          </TableCell>
          <TableCell align="center">
            {index < lastIndex ? <FormikTextField id={`compare[${index}].metres`} className="priceWidth" formik={formik} disabled /> : null}
          </TableCell>
          <TableCell align={index < lastIndex ? 'center' : 'right'}>
            {index < lastIndex ? (
              <FormikTextField id={`compare[${index}].rate`} className="priceFormat" formik={formik} disabled />
            ) : (
              <Typography variant="h6" fontWeight={700} sx={{ whiteSpace: 'nowrap' }}>
                Add to quote
              </Typography>
            )}
          </TableCell>
          <TableCell align="center">
            <FormikTextField id={`compare[${index}].total`} className="priceFormat" formik={formik} disabled />
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
};

CompareRow.propTypes = {
  formik: PropTypes.any,
  index: PropTypes.number,
  lastIndex: PropTypes.number,
  fenceMetres: PropTypes.number
};

export default CompareRow;
