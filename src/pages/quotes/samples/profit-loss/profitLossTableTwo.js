import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { InputLabel, Typography } from '@mui/material';

function createData(item, price) {
  return { item, price };
}

export default function ProfitLossTableTwo() {
  const rows = [
    createData(
      <>
        <Typography variant="h6">TOTAL COST</Typography>
      </>,
      <>
        <Typography variant="h6">$1529.84</Typography>
      </>
    ),
    createData(
      <>
        <Typography variant="h6">CHARGE</Typography>
      </>,
      <>
        <Typography variant="h6">$2590</Typography>
      </>
    ),
    createData(
      <>
        <Typography variant="h6">PROFIT</Typography>
      </>,
      <>
        <Typography variant="h6">$1060</Typography>
      </>
    ),
    createData('', ''),
    createData(
      <>
        <Typography variant="h6">MARGIN COST</Typography>
      </>,
      <>
        <Typography variant="h6">46.3%</Typography>
      </>
    ),
    createData(
      <>
        <Typography variant="h6">MARGIN Total Cost</Typography>
      </>,
      <>
        <Typography variant="h6">40.9</Typography>
      </>
    ),
    createData(
      <>
        <Typography variant="h6">ACTUAL</Typography>
      </>,
      <>
        <Typography variant="h6">5.4%</Typography>
      </>
    )
  ];
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <InputLabel sx={{ visibility: 'hidden' }}>Item</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel sx={{ visibility: 'hidden' }}>price</InputLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.item} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.item}
              </TableCell>
              <TableCell>{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
