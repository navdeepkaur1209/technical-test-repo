import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MenuItem, Select, Typography } from '@mui/material';

function createData(fence, field, description) {
  return { fence, field, description };
}

export default function FenceTable() {
  const [fence, setFence] = React.useState(5);
  const rows = [
    createData(
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          FENCE
        </Typography>
      </>,
      <>
        <Select value={fence} placeholder="pailingHeight" onChange={(e) => setFence(e.target.value)} fullWidth>
          <MenuItem value={5}>PAILING</MenuItem>
          <MenuItem value={10}>Fence</MenuItem>
        </Select>
      </>,
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          Standard 1.95m t/p paling fence 1800mm palings + 150x38mm plinth & 3 rails
        </Typography>
      </>
    )
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.height} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.fence}
              </TableCell>
              <TableCell align="left">{row.field}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
