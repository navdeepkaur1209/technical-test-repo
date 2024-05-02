import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { CardContent, Button, Grid, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import FormikSelectField from 'components/FormikSelectField';
import * as yup from 'yup';
import { createPathFromArray } from 'utils/helpers';
import Popup from 'layout/CommonLayout/popup';

// GraphQL.
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import CreatePurchaseOrder from 'graphql/quotes/CreatePurchaseOrder';
import ListPurchaseOrders from 'graphql/quotes/ListPurchaseOrders';

/* Static methods and values */
const formikValidationSchema = yup.object().shape({
  supplier: yup.string().required('Supplier is required')
});

const rowInitialValue = {
  supplier: ''
};

/* Component */
const SupplierListTable = ({ quoteId, supplierList, doReloadPurchaseOrderList }) => {
  const [supplierId, setSupplierId] = useState(null);
  const formikRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  /* GraphQL: CreatePurchaseOrder */
  const [mutationCreatePurchaseOrder, { data: resultCreatePurchaseOrder, reset: resetCreatePurchaseOrder }] =
    useGraphQLMutation(CreatePurchaseOrder);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const doMutation = useCallback((values) => {
    const supplier = supplierList.find((s) => s.SupplierName == values.supplier);
    setSupplierId(supplier.SupplierId);
    mutationCreatePurchaseOrder({
      variables: {
        id: quoteId,
        supplierId: supplier.SupplierId
      }
    });
  });

  useEffect(() => {
    if (resultCreatePurchaseOrder && resultCreatePurchaseOrder.CreatePurchaseOrder.Status === 'SUCCESS') {
      dispatch(
        openSnackbar({
          open: true,
          message: resultCreatePurchaseOrder.CreatePurchaseOrder.Message,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      resetCreatePurchaseOrder();
      doReloadPurchaseOrderList();
      navigate(createPathFromArray(['quotes', quoteId, 'supplier-order', supplierId]), { replace: true });
    }
  }, [resultCreatePurchaseOrder, resetCreatePurchaseOrder, supplierId, dispatch, doReloadPurchaseOrderList, navigate, quoteId]);

  useEffect(() => {
    if (isAgree) {
      doMutation(formikRef.current.values);
      setIsAgree(false);
    }
  }, [doMutation, isAgree]);

  /* GraphQL: ListPurchaseOrders */
  const { data } = useGraphQLQuery(ListPurchaseOrders, {
    variables: { id: quoteId }
  });

  const checkPOExist = () => {
    const purchaseOrder = data.ListPurchaseOrders.find((s) => s.SupplierName == formikRef.current.values.supplier);
    return !purchaseOrder ? false : true;
  };

  const handleSubmit = () => {
    if (checkPOExist()) {
      setIsPopupOpen(true);
    } else {
      setIsPopupOpen(false);
      doMutation(formikRef.current.values);
      setIsAgree(false);
    }
  };

  /* Render */
  return (
    <CardContent>
      <Formik
        innerRef={formikRef}
        initialValues={rowInitialValue}
        enableReinitialize
        validationSchema={formikValidationSchema}
        onSubmit={async () => {
          handleSubmit();
        }}
      >
        {(props) => (
          <Form>
            <Grid container columnSpacing={3} alignItems={'flex-end'}>
              <Grid item xs={12}>
                <Typography variant="h4" mb={2}>
                  Select a supplier to generate a purchase order
                </Typography>
              </Grid>
              <Grid item xs={12} lg={4} md={6}>
                <FormikSelectField
                  id={`supplier`}
                  formik={props}
                  menuItems={supplierList}
                  menuItemKey="SupplierId"
                  menuItemValue="SupplierName"
                />
              </Grid>
              <Grid item xs={12} md={'auto'}>
                <Button variant="contained" color="secondary" type="submit">
                  Create Supplier Order from the list
                </Button>
                <Popup
                  title="Purchase order already exists"
                  content="Click 'OK' to proceed."
                  button={{ ok: 'Ok', cancel: 'Cancel' }}
                  onAgree={() => {
                    setIsAgree(true);
                    setIsPopupOpen(false);
                  }}
                  onDisagree={() => {
                    setIsAgree(false);
                    setIsPopupOpen(false);
                  }}
                  open={isPopupOpen}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </CardContent>
  );
};

SupplierListTable.propTypes = {
  quoteId: PropTypes.string,
  supplierList: PropTypes.any,
  doReloadPurchaseOrderList: PropTypes.any
};

export default SupplierListTable;
