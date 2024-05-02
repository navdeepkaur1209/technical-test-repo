import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardContent, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import QuoteFormHeader from '../header';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import GetQuote from 'graphql/quotes/GetQuote';
import SupplierOrderListTable from './tables/supplier-order-list';
import SupplierListTable from './tables/supplier-list';
import PurchaseOrderList from './tables/purchase-order-list';
import PurchaseOrderFormTable from './tables/purchase-order-form';

/* Component */
const SupplierOrder = () => {
  const { quoteId, supplierId } = useParams();
  const [quote, setQuote] = useState(null);
  const [supplierList, setSupplierList] = useState([]);
  const [reloadPurchaseOrderList, setReloadPurchaseOrderList] = useState(0);
  const navigate = useNavigate();

  const updateSupplierList = (supplier) => {
    setSupplierList((currentSupplierList) => {
      const exists = currentSupplierList.find((s) => s.SupplierId == supplier.SupplierId);
      if (!exists) {
        currentSupplierList.push(supplier);
      }
      currentSupplierList.sort((d1, d2) => (d1.SupplierName > d2.SupplierName ? 1 : -1));
      return JSON.parse(JSON.stringify(currentSupplierList));
    });
  };

  const doReloadPurchaseOrderList = () => {
    setReloadPurchaseOrderList(Date.now());
  };

  /* GraphQL: GetQuote */
  const { data: dataGetQuote } = useGraphQLQuery(GetQuote, { variables: { id: quoteId } });

  useEffect(() => {
    if (dataGetQuote && dataGetQuote.GetQuote && quoteId) {
      if (dataGetQuote.GetQuote.QuoteId) {
        setQuote(dataGetQuote.GetQuote);
      } else {
        navigate('/jobs');
      }
    }
  }, [navigate, quoteId, dataGetQuote]);

  /* Render */
  return (
    <>
      <QuoteFormHeader tabValue="7" quoteId={quoteId} quote={quote} />

      <Grid container spacing={3}>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>
                {quote ? <SupplierOrderListTable quoteId={quoteId} updateSupplierList={updateSupplierList} /> : null}
              </CardContent>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>{quote ? <PurchaseOrderList quoteId={quoteId} reload={reloadPurchaseOrderList} /> : null}</CardContent>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>
                {quote ? (
                  <SupplierListTable quoteId={quoteId} supplierList={supplierList} doReloadPurchaseOrderList={doReloadPurchaseOrderList} />
                ) : null}
              </CardContent>
              <CardContent>
                {quote ? (
                  <PurchaseOrderFormTable quoteId={quoteId} supplierId={supplierId} doReloadPurchaseOrderList={doReloadPurchaseOrderList} />
                ) : null}
              </CardContent>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SupplierOrder;
