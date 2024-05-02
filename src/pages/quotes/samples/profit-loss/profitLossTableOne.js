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

export default function ProfitLossTableOne() {
  const rows = [
    createData(
      <>
        <Typography variant="h6">DEMO</Typography>
      </>,
      <>
        <Typography variant="h6">$300</Typography>
      </>
    ),
    createData(
      <>
        <Typography variant="h6">3RD PARTY</Typography>
      </>,
      <>
        <Typography variant="h6"></Typography>
      </>
    ),
    createData(
      <>
        <Typography variant="h6">LABOUR</Typography>
      </>,
      <>
        <Typography variant="h6">$354.84</Typography>
      </>
    ),
    createData(
      <>
        <Typography variant="h6">FENCE MATERIALS</Typography>
      </>,
      <>
        <Typography variant="h6">$875.00</Typography>
      </>
    ),
    createData(
      <>
        <Typography variant="h6">GATE COSTS</Typography>
      </>,
      <>
        <Typography variant="h6"></Typography>
      </>
    ),
    createData(
      <>
        <Typography variant="h6">METAL FENCE</Typography>
      </>,
      <>
        <Typography variant="h6"></Typography>
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
