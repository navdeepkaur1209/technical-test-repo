import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { CardContent, Grid, InputLabel, Typography } from '@mui/material';
import SupplierOrderListRow from './supplier-order-list-row';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import ListSupplierOrders from 'graphql/quotes/ListSupplierOrders';
import CreateSupplierOrders from 'graphql/quotes/CreateSupplierOrders';

/* Static methods and values */
const formikValidationSchema = yup.object().shape({
  supplierorderlist: yup.array().of(
    yup.object().shape({
      sk: yup.string().required('Sk is required'),
      item: yup.string().required('Item is required'),
      product: yup.string().required('Product is required'),
      qty: yup.number().min(1, 'Min value 1').max(100, 'Max value 100').required('Qty is required between 1 and 100'),
      price: yup.number().min(0, 'Min value 0').required('Price is required'),
      supplier: yup.string().required('Supplier is required'),
      suppliers: yup.array().of(
        yup.object().shape({
          SupplierId: yup.string().required('Supplier ID is required'),
          SupplierName: yup.string().required('Supplier name is required')
        })
      )
    })
  )
});

/* Component */
const SupplierOrderListTable = ({ quoteId, updateSupplierList }) => {
  const formikRef = useRef();
  const dispatch = useDispatch();

  /* GraphQL: ListSupplierOrders */
  const { data: dataListSupplierOrders, refetch: refetchListSupplierOrders } = useGraphQLQuery(ListSupplierOrders, {
    variables: { id: quoteId }
  });

  useEffect(() => {
    if (dataListSupplierOrders && dataListSupplierOrders.ListSupplierOrders) {
      const data = [];
      for (let i = 0; i < dataListSupplierOrders.ListSupplierOrders.length; i++) {
        if (dataListSupplierOrders.ListSupplierOrders[i].Details && dataListSupplierOrders.ListSupplierOrders[i].Suppliers) {
          const details = JSON.parse(dataListSupplierOrders.ListSupplierOrders[i].Details);
          const suppliers = JSON.parse(dataListSupplierOrders.ListSupplierOrders[i].Suppliers);
          const supplier = suppliers.find((s) => s.Selected == 'SELECTED');

          data.push({
            sk: dataListSupplierOrders.ListSupplierOrders[i].QuoteSk,
            item: details.item,
            product: details.product,
            qty: details.qty,
            price: details.cost,
            supplier: supplier ? supplier.SupplierName : '',
            suppliers: suppliers.map((s) => {
              return {
                SupplierId: s.SupplierId,
                SupplierName: s.SupplierName
              };
            })
          });
        }
      }
      formikRef.current.setFieldValue('supplierorderlist', data);
    }
  }, [dataListSupplierOrders, formikRef]);

  /* GraphQL: CreateSupplierOrders */
  const [mutationCreateSupplierOrders, { data: resultCreateSupplierOrders }] = useGraphQLMutation(CreateSupplierOrders);

  const doMutation = () => {
    mutationCreateSupplierOrders({
      variables: {
        id: quoteId
      }
    });
  };

  useEffect(() => {
    if (resultCreateSupplierOrders && resultCreateSupplierOrders.CreateSupplierOrders.Status === 'SUCCESS') {
      dispatch(
        openSnackbar({
          open: true,
          message: resultCreateSupplierOrders.CreateSupplierOrders.Message,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      refetchListSupplierOrders();
    }
  }, [resultCreateSupplierOrders, dispatch, refetchListSupplierOrders]);

  /* Render */
  return (
    <CardContent>
      <Grid container columnSpacing={3} alignItems="center" mb={4}>
        <Grid item sm={6}>
          <Typography variant="h4">Quote Type : PAILING</Typography>
        </Grid>
        <Grid item sm={6} container justifyContent={'flex-end'}>
          <Button variant="contained" color="secondary" size="large" onClick={() => doMutation()}>
            Update Order list from Quote
          </Button>
        </Grid>
      </Grid>
      <Grid container columnSpacing={3} rowSpacing={8}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Formik
              innerRef={formikRef}
              initialValues={{ supplierorderlist: [] }}
              enableReinitialize
              validationSchema={formikValidationSchema}
            >
              {(props) => (
                <Form>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell width={75}>
                          <InputLabel>S/No.</InputLabel>
                        </TableCell>
                        <TableCell>
                          <InputLabel>Item</InputLabel>
                        </TableCell>
                        <TableCell>
                          <InputLabel>PRODUCT</InputLabel>
                        </TableCell>
                        <TableCell align="center">
                          <InputLabel>QTY</InputLabel>
                        </TableCell>
                        <TableCell align="center">
                          <InputLabel>UNIT PRICE</InputLabel>
                        </TableCell>
                        <TableCell>
                          <InputLabel>SUPPLIER</InputLabel>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <FieldArray
                        name="supplierorderlist"
                        render={() => {
                          return (
                            <>
                              {
                                // eslint-disable-next-line
                                props.values.supplierorderlist && props.values.supplierorderlist.length > 0
                                  ? // eslint-disable-next-line
                                  props.values.supplierorderlist.map((supplierorderlist, index) => {
                                      return (
                                        <SupplierOrderListRow
                                          quoteId={quoteId}
                                          formik={props}
                                          key={index}
                                          index={index}
                                          updateSupplierList={updateSupplierList}
                                        />
                                      );
                                    })
                                  : null
                              }
                            </>
                          );
                        }}
                      />
                    </TableBody>
                  </Table>
                </Form>
              )}
            </Formik>
          </TableContainer>
        </Grid>
      </Grid>
    </CardContent>
  );
};

SupplierOrderListTable.propTypes = {
  quoteId: PropTypes.string,
  updateSupplierList: PropTypes.any
};

export default SupplierOrderListTable;
