import { useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { CardContent, Grid, InputLabel, Typography } from '@mui/material';

const FenceJobTable = () => {
  /* Profit and loss calculations */
  const qouteTypeTable = useMemo(() => [
    {
      sno: 1,
      product: 'Build Fence Paling 1950mm Over 16m',
      qty: '20',
      cost: '15.60',
      total: '312.00',
      excGst: '260.00',
      excSuper: '220.00'
    },
    {
      sno: 2,
      product: 'Special Score/Cut concrete for posts (cement patch only) Owners to replace pavers etc. x posts',
      qty: '50',
      cost: '0.84',
      total: '42.00',
      excGst: '35.00',
      excSuper: '35.00'
    },
    {
      sno: 'TOTAL',
      product: '',
      qty: '',
      cost: '',
      total: '354.00',
      excGst: '295.00',
      excSuper: '255.00'
    },
    {
      sno: '',
      product: '',
      qty: '',
      cost: '',
      total: '',
      excGst: '',
      excSuper: ''
    }
  ]);

  /* Render */
  return (
    <CardContent>
      <Grid container columnSpacing={3} rowSpacing={8}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>
                    <InputLabel sx={{ visibility: 'hidden' }}>PRODUCT</InputLabel>
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    <InputLabel>Contractor</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel>Employee</InputLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableHead>
                <TableRow>
                  <TableCell width={75}>
                    <InputLabel>S/No.</InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel>PRODUCT</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel>QTY</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel>COST</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel>TOTAL</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel>Exc GST & Super</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel>Exc Super</InputLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {qouteTypeTable.map((row) => (
                  <TableRow key={row.sno} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" align="center">
                      <Typography variant="h6">{row.sno}</Typography>
                    </TableCell>
                    <TableCell sx={{ paddingLeft: '12px !important' }}>{row.product}</TableCell>
                    <TableCell align="center">{row.qty}</TableCell>
                    <TableCell align="center">{row.cost}</TableCell>
                    <TableCell align="center">{row.total}</TableCell>
                    <TableCell align="center">{row.excGst}</TableCell>
                    <TableCell align="center">{row.excSuper}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body1" mt={2}>
            Job Sheet PDF must be printed on paper. Issuing the Fencer an electronoc copy of the PDF will expose customer pricing to the
            Fencer.
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ paddingTop: '15px !important', textAlign: 'right' }}>
          <Button variant="contained" color="primary" size="large">
            Download Fencer JOB CARD
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default FenceJobTable;
