import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

export default function SubTotalTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell align="right" sx={{ border: '1px solid #f0f0f0' }}>
              <Typography variant="h6" fontWeight={700} sx={{ whiteSpace: 'nowrap' }}>
                Sub Total Inc GST
              </Typography>
            </TableCell>
            <TableCell align="center" width={85} sx={{ border: '1px solid #f0f0f0' }}>
              $300
            </TableCell>
            <TableCell align="center" width={85} sx={{ border: '1px solid #f0f0f0' }}>
              $100
            </TableCell>
            <TableCell align="center" width={85} sx={{ border: '1px solid #f0f0f0' }}>
              $100
            </TableCell>
            <TableCell align="center" width={85} sx={{ border: '1px solid #f0f0f0' }}>
              $100
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
