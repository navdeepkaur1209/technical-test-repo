import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CardContent, Grid, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import PaginationTable from 'components/PaginationTable';
import { createPathFromArray } from 'utils/helpers';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import ListPurchaseOrders from 'graphql/quotes/ListPurchaseOrders';
import GetQuotePdfLink from 'graphql/quotes/GetQuotePdfLink';

/* Static methods and values */
const columns = [
  {
    Header: 'S/No.',
    accessor: 'Sn'
  },
  {
    Header: 'PO Number',
    accessor: 'PO'
  },
  {
    Header: 'Supplier ID',
    accessor: 'SupplierId'
  },
  {
    Header: 'Supplier Name',
    accessor: 'SupplierName'
  },
  {
    Header: 'No. of items ordered',
    accessor: 'Items'
  }
];

/* Component */
const PurchaseOrderListTable = ({ quoteId, reload }) => {
  const [purchaseOrderList, setPurchaseOrderList] = useState([]);
  const navigate = useNavigate();

  /* GraphQL: ListPurchaseOrders */
  const { loading, data, refetch } = useGraphQLQuery(ListPurchaseOrders, {
    variables: { id: quoteId }
  });

  useEffect(() => {
    if (data && data.ListPurchaseOrders) {
      setPurchaseOrderList(() => {
        return data.ListPurchaseOrders.map((row, idx) => {
          return {
            Sn: idx + 1,
            ...row
          };
        });
      });
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [refetch, reload]);

  /* GraphQL: GetQuotePdfLink */
  const [doGetQuotePdfLink, { data: dataGetQuotePdfLink }] = useGraphQLLazyQuery(GetQuotePdfLink);

  useEffect(() => {
    if (dataGetQuotePdfLink && dataGetQuotePdfLink.GetQuotePdfLink) {
      if (dataGetQuotePdfLink.GetQuotePdfLink.Url) {
        window.open(dataGetQuotePdfLink.GetQuotePdfLink.Url, '_blank', 'noreferrer');
      }
    }
  }, [dataGetQuotePdfLink]);

  const downloadPurchaseOrder = (supplierId) => {
    doGetQuotePdfLink({
      variables: { id: quoteId, filetype: 'PurchaseOrder', supplierId: supplierId }
    });
  };

  const editPurchaseOrder = (id) => {
    navigate(createPathFromArray(['quotes', quoteId, 'supplier-order', id]), { replace: true });
  };

  /* Render */
  return (
    <CardContent>
      <Grid container columnSpacing={3} rowSpacing={4}>
        <Grid item sm={12}>
          <Typography variant="h4">Purchase order list</Typography>
        </Grid>
        <Grid item xs={12}>
          <MainCard content={false}>
            <ScrollX>
              {loading ? (
                'Loading...'
              ) : purchaseOrderList ? (
                <PaginationTable
                  columns={columns}
                  data={purchaseOrderList}
                  actions={{ edit: { cb: editPurchaseOrder, id: 'SupplierId' }, download: { cb: downloadPurchaseOrder, id: 'SupplierId' } }}
                />
              ) : (
                'No purchase orders'
              )}
            </ScrollX>
          </MainCard>
        </Grid>
      </Grid>
    </CardContent>
  );
};

PurchaseOrderListTable.propTypes = {
  quoteId: PropTypes.string,
  reload: PropTypes.number
};

export default PurchaseOrderListTable;
