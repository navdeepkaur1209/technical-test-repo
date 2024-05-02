import { useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CardContent, Grid, InputLabel, Typography } from '@mui/material';
import { DownloadOutlined, EditFilled, EyeFilled } from '@ant-design/icons';
import IconButton from 'components/@extended/IconButton';

const PurchaseOrderList = () => {
  /* Profit and loss calculations */
  const reviewTableOne = useMemo(() => [
    {
      sno: 1,
      qouteNumber: 123456,
      supplierName: 'Aust Lattice & Timber',
      qty: '20',
      actions: (
        <>
          <IconButton color="primary">
            <EditFilled />
          </IconButton>
          <IconButton color="secondary">
            <EyeFilled />
          </IconButton>
          <IconButton color="success">
            <DownloadOutlined />
          </IconButton>
        </>
      )
    }
  ]);

  /* Render */
  return (
    <CardContent>
      <Grid container columnSpacing={3} rowSpacing={4}>
        <Grid item sm={12}>
          <Typography variant="h4">Purchase order list</Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width={75}>
                    <InputLabel>S/No.</InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel>Quote Number</InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel>Supplier Name</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel>No. of items ordered</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel sx={{ visibility: 'hidden' }}>Actions</InputLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviewTableOne.map((row) => (
                  <TableRow key={row.sno} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" align="center">
                      <Typography variant="h6">{row.sno}</Typography>
                    </TableCell>
                    <TableCell sx={{ paddingLeft: '12px !important' }}>{row.qouteNumber}</TableCell>
                    <TableCell>{row.supplierName}</TableCell>
                    <TableCell align="center">{row.qty}</TableCell>
                    <TableCell>{row.actions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default PurchaseOrderList;
