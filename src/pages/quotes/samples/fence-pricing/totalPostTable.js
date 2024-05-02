import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { InputLabel, OutlinedInput } from '@mui/material';

function createData(fencePost, starterPost, totalPost, rate, total) {
  return { fencePost, starterPost, totalPost, rate, total };
}

export default function TotalPostTable() {
  const rows = [
    createData(
      <>
        <OutlinedInput fullWidth value="7.4" disabled={true} sx={{ width: 100, textAlign: 'center' }} />
      </>,
      <>
        <OutlinedInput fullWidth value="1" disabled={true} sx={{ width: 100, textAlign: 'center' }} />
      </>,
      <>
        <OutlinedInput fullWidth value="9" disabled={true} sx={{ width: 100, textAlign: 'center' }} />
      </>
    )
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <InputLabel>Fence Posts</InputLabel>
            </TableCell>
            <TableCell>
              <InputLabel>Starter Posts</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>Total Posts</InputLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.fencePost} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.fencePost}
              </TableCell>
              <TableCell>{row.starterPost}</TableCell>
              <TableCell align="center">{row.totalPost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
