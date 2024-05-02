import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { CardContent, Grid, InputLabel } from '@mui/material';
import { CheckCircleOutlined, DownloadOutlined, PlusSquareFilled } from '@ant-design/icons';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PurchaseOrderFormRow from './purchase-order-form-row';
import { Formik, Form, FieldArray } from 'formik';
import FormikTextField from 'components/FormikTextField';
import FormikSelectField from 'components/FormikSelectField';
import * as yup from 'yup';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import ListItems from 'graphql/data/ListItems';
import GetPurchaseOrder from 'graphql/quotes/GetPurchaseOrder';
import UpdatePurchaseOrder from 'graphql/quotes/UpdatePurchaseOrder';
import GetQuotePdfLink from 'graphql/quotes/GetQuotePdfLink';

/* Static methods and values */
const formikValidationSchema = yup.object().shape({
  supplier: yup.string().required('Supplier is required'),
  date: yup.string().required('Delivery date is required'),
  to: yup.string().required('Delivery address is required'),
  po: yup.string().required('PO number is required'),
  type: yup.string().required('Delivery type is required'),
  orders: yup.array().of(
    yup.object().shape({
      item: yup.string().required('Item is required'),
      product: yup.string().required('Product is required'),
      qty: yup.number().min(1, 'Min value 1').max(100, 'Max value 100').required('Metres is required between 1 and 100'),
      type: yup.string().required('Type is required')
    })
  )
});

/*
const rowInitialValue = {
  supplier: '',
  date: '',
  to: '',
  po: '',
  type: '',
  orders: []
};
*/

const newRowInitialValue = {
  item: '',
  product: '',
  qty: 0,
  type: 'ADDITIONAL'
};

const deliveryTypes = [
  { Key: 'Standard', Value: 'Standard' },
  { Key: 'Quick', Value: 'Quick' }
];

/* Component */
const PurchaseOrderFormTable = ({ quoteId, supplierId, doReloadPurchaseOrderList }) => {
  const [dataItems, setDataItems] = useState([]);
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const formikRef = useRef();
  const formikArrayRef = useRef();
  const dispatch = useDispatch();

  /* GraphQL: GetPurchaseOrder */
  const [doGetPurchaseOrder, { data: dataGetPurchaseOrder }] = useGraphQLLazyQuery(GetPurchaseOrder, {
    variables: { id: quoteId, supplierId: supplierId }
  });

  /*
  useEffect(() => {
    if (!detailsLoaded && dataGetPurchaseOrder && dataGetPurchaseOrder.GetPurchaseOrder) {
      const data = JSON.parse(dataGetPurchaseOrder.GetPurchaseOrder.QuoteDetails);
      if (data && data.length) {
        formikRef.current.setFieldValue('supplier', data[0].SupplierName);
        formikRef.current.setFieldValue('date', data[0].DeliveryDate);
        formikRef.current.setFieldValue('to', data[0].Client.Name);
        formikRef.current.setFieldValue('po', data[0].PO);
        formikRef.current.setFieldValue('type', data[0].DeliveryType);
        if (data.length > 1) {
          formikRef.current.setFieldValue('orders', data.slice(1));
        }
      }
      setDetailsLoaded(true);
    }
  }, [dataGetPurchaseOrder, detailsLoaded, setDetailsLoaded, formikRef]);
  */

  const rowInitialValue = useMemo(() => {
    if (!detailsLoaded && dataGetPurchaseOrder && dataGetPurchaseOrder.GetPurchaseOrder) {
      const data = JSON.parse(dataGetPurchaseOrder.GetPurchaseOrder.QuoteDetails);
      if (data && data.length) {
        return {
          supplier: data[0].SupplierName,
          date: data[0].DeliveryDate,
          to: data[0].Client.Name,
          po: data[0].PO,
          type: data[0].DeliveryType,
          orders: data.length > 1 ? data.slice(1) : []
        };
      }
      setDetailsLoaded(true);
    } else {
      return {
        supplier: '',
        date: '',
        to: '',
        po: '',
        type: '',
        orders: []
      };
    }
  }, [dataGetPurchaseOrder, detailsLoaded, setDetailsLoaded]);

  useEffect(() => {
    setDetailsLoaded(false);
    formikRef.current.setFieldValue('orders', []);
    doGetPurchaseOrder();
  }, [supplierId, doGetPurchaseOrder, formikRef]);

  /* GraphQL: ListItems */
  const { data: dataListItems } = useGraphQLQuery(ListItems, {
    variables: { pagination: {} }
  });

  useEffect(() => {
    if (dataListItems && dataListItems.ListItems && dataListItems.ListItems.Items) {
      setDataItems(() =>
        dataListItems.ListItems.Items.map((item) => {
          return {
            Key: item,
            Value: item
          };
        }).sort((a, b) => (a.Value > b.Value ? 1 : -1))
      );
      doGetPurchaseOrder();
    }
  }, [dataListItems, doGetPurchaseOrder]);

  /* GraphQL: UpdatePurchaseOrder */
  const [mutationUpdatePurchaseOrder, { data: resultUpdatePurchaseOrder, reset: resetUpdatePurchaseOrder }] =
    useGraphQLMutation(UpdatePurchaseOrder);

  const doMutation = (values) => {
    mutationUpdatePurchaseOrder({
      variables: {
        id: quoteId,
        supplierId: supplierId,
        details: JSON.stringify([
          {
            SupplierName: values.supplier,
            DeliveryDate: values.date,
            PO: values.po,
            DeliveryType: values.type
          },
          ...values.orders
        ])
      }
    });
  };

  useEffect(() => {
    if (resultUpdatePurchaseOrder && resultUpdatePurchaseOrder.UpdatePurchaseOrder.Status === 'SUCCESS') {
      dispatch(
        openSnackbar({
          open: true,
          message: resultUpdatePurchaseOrder.UpdatePurchaseOrder.Message,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      resetUpdatePurchaseOrder();
      doReloadPurchaseOrderList();
    }
  }, [resultUpdatePurchaseOrder, resetUpdatePurchaseOrder, doReloadPurchaseOrderList, dispatch]);

  /* GraphQL: GetQuotePdfLink */
  const [doGetQuotePdfLink, { data: dataGetQuotePdfLink }] = useGraphQLLazyQuery(GetQuotePdfLink);

  useEffect(() => {
    if (dataGetQuotePdfLink && dataGetQuotePdfLink.GetQuotePdfLink) {
      if (dataGetQuotePdfLink.GetQuotePdfLink.Url) {
        window.open(dataGetQuotePdfLink.GetQuotePdfLink.Url, '_blank', 'noreferrer');
      }
    }
  }, [dataGetQuotePdfLink]);

  const downloadPurchaseOrder = () => {
    doGetQuotePdfLink({
      variables: { id: quoteId, filetype: 'PurchaseOrder', supplierId: supplierId }
    });
  };

  /* Render */
  return (
    <CardContent>
      <Formik
        innerRef={formikRef}
        initialValues={rowInitialValue}
        enableReinitialize
        validationSchema={formikValidationSchema}
        onSubmit={async (values, actions) => {
          doMutation(values);
          actions.resetForm({ values });
        }}
      >
        {(props) => (
          <Form>
            <Grid container columnSpacing={3} rowSpacing={4} mt={4}>
              <Grid item xs={12} lg={4} md={6}>
                <InputLabel sx={{ marginBottom: 1 }}>Order To</InputLabel>
                <FormikTextField id={`supplier`} formik={props} disabled />
              </Grid>
              <Grid item xs={12} lg={4} md={6}>
                <InputLabel sx={{ marginBottom: 1 }}>Deliver To</InputLabel>
                <FormikTextField id={`to`} formik={props} disabled />
              </Grid>
              <Grid item xs={12} lg={4} md={6}>
                <InputLabel sx={{ marginBottom: 1 }}>Deliver Date</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker sx={{ width: '100%' }} format="DD/MM/YYYY" />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} lg={4} md={6}>
                <InputLabel sx={{ marginBottom: 1 }}>P/O NBR:</InputLabel>
                <FormikTextField id={`po`} formik={props} disabled />
              </Grid>
              <Grid item xs={12} lg={4} md={6}>
                <InputLabel sx={{ marginBottom: 1 }}>Delivery</InputLabel>
                <FormikSelectField id={`type`} formik={props} menuItems={deliveryTypes} menuItemKey="Key" menuItemValue="Value" />
              </Grid>
            </Grid>
            <Grid container columnSpacing={3} rowSpacing={4} mt={4}>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell width="20%">
                          <InputLabel>Item</InputLabel>
                        </TableCell>
                        <TableCell width="60%">
                          <InputLabel>PRODUCT</InputLabel>
                        </TableCell>
                        <TableCell align="center" width="20%">
                          <InputLabel>QUANTITY</InputLabel>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <FieldArray
                        name="orders"
                        render={(arrayHelpers) => {
                          formikArrayRef.current = arrayHelpers;
                          return (
                            <>
                              {
                                // eslint-disable-next-line
                                props.values.orders && props.values.orders.length > 0
                                  ? // eslint-disable-next-line
                                  props.values.orders.map((price, index) => {
                                      return (
                                        <PurchaseOrderFormRow
                                          formik={props}
                                          key={index}
                                          index={index}
                                          items={dataItems}
                                          helpers={arrayHelpers}
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
                </TableContainer>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PlusSquareFilled />}
                  onClick={() => formikArrayRef.current.push(newRowInitialValue)}
                >
                  Add an Item
                </Button>
              </Grid>
              <Grid item xs={12} container gap={3} justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CheckCircleOutlined />}
                  onClick={() => formikRef.current.handleSubmit()}
                >
                  Save
                </Button>
                {
                  // eslint-disable-next-line
                  props.dirty ? null : (
                    <Button variant="contained" color="success" startIcon={<DownloadOutlined />} onClick={() => downloadPurchaseOrder()}>
                      Download a PDF
                    </Button>
                  )
                }
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </CardContent>
  );
};

PurchaseOrderFormTable.propTypes = {
  quoteId: PropTypes.string,
  supplierId: PropTypes.string,
  doReloadPurchaseOrderList: PropTypes.any
};

export default PurchaseOrderFormTable;
