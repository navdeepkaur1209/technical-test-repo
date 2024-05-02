import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { TableRow, TableCell, Typography } from '@mui/material';
import FormikSelectField from 'components/FormikSelectField';
import { getIn } from 'formik';

// GraphQL.
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import SaveSupplierOrder from 'graphql/quotes/SaveSupplierOrder';

/* Component */
const SupplierOrderListRow = ({ quoteId, formik, index, updateSupplierList }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const suppliers = getIn(formik.values, `supplierorderlist[${index}].suppliers`);
    const supplier = suppliers.find((s) => s.SupplierName == getIn(formik.values, `supplierorderlist[${index}].supplier`));
    updateSupplierList(supplier);
  }, [formik.values, updateSupplierList, index]);

  /* GraphQL: SaveSupplierOrder */
  const [mutationSaveSupplierOrder, { data: resultSaveSupplierOrder }] = useGraphQLMutation(SaveSupplierOrder);

  const handleChangeSupplier = (e) => {
    formik.handleChange(e);
    const suppliers = getIn(formik.values, `supplierorderlist[${index}].suppliers`);
    const supplier = suppliers.find((s) => s.SupplierName == e.target.value);

    if (supplier) {
      updateSupplierList(supplier);
      mutationSaveSupplierOrder({
        variables: {
          id: quoteId,
          sk: getIn(formik.values, `supplierorderlist[${index}].sk`),
          supplier: supplier.SupplierId
        }
      });
    }
  };

  useEffect(() => {
    if (resultSaveSupplierOrder && resultSaveSupplierOrder.SaveSupplierOrder.Status === 'SUCCESS') {
      dispatch(
        openSnackbar({
          open: true,
          message: resultSaveSupplierOrder.SaveSupplierOrder.Message,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
  }, [resultSaveSupplierOrder, dispatch]);

  /* Render */
  return (
    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row" align="center">
        <Typography variant="h6">{index + 1}</Typography>
      </TableCell>
      <TableCell sx={{ paddingLeft: '12px !important' }}>{getIn(formik.values, `supplierorderlist[${index}].item`)}</TableCell>
      <TableCell>{getIn(formik.values, `supplierorderlist[${index}].product`)}</TableCell>
      <TableCell align="center">{getIn(formik.values, `supplierorderlist[${index}].qty`)}</TableCell>
      <TableCell align="center">{getIn(formik.values, `supplierorderlist[${index}].price`)}</TableCell>
      <TableCell>
        <FormikSelectField
          id={`supplierorderlist[${index}].supplier`}
          formik={formik}
          menuItems={getIn(formik.values, `supplierorderlist[${index}].suppliers`)}
          menuItemKey="SupplierId"
          menuItemValue="SupplierName"
          onChange={handleChangeSupplier}
        />
      </TableCell>
    </TableRow>
  );
};

SupplierOrderListRow.propTypes = {
  quoteId: PropTypes.string,
  formik: PropTypes.any,
  index: PropTypes.number,
  updateSupplierList: PropTypes.any
};

export default SupplierOrderListRow;
