import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';

function createData(type, description, meters, rate, total) {
  return { type, description, meters, rate, total };
}

export default function OptionsTable() {
  const [dropdown, setDropdown] = React.useState(1);
  const rows = [
    createData(
      <>
        <Typography variant="h6">CURRENT FENCE TYPE</Typography>
      </>,
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth>
          <MenuItem value={1}>TP 1.65 METRE Code 1 SELL</MenuItem>
          <MenuItem value={2}>TP 1.65 METRE Code 2 SELL</MenuItem>
          <MenuItem value={3}>TP 1.70 METRE Code 3 SELL</MenuItem>
          <MenuItem value={4}>TP 1.95 METRE Code 4 SELL</MenuItem>
        </Select>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="20" sx={{ width: 60, textAlign: 'center' }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$101.00" sx={{ width: 90, textAlign: 'center' }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$2020.00" sx={{ width: 90, textAlign: 'center' }} />
      </>
    ),
    createData(
      '',
      <>
        <Typography variant="h6">CHOSE A NEW FENCE OPTION AND TYPE TO GET THE COMPARISON</Typography>
      </>,
      '',
      '',
      ''
    ),
    createData(
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth>
          <MenuItem value={1}>Pailing Options</MenuItem>
          <MenuItem value={2}>CBond Options</MenuItem>
        </Select>
      </>,
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth>
          <MenuItem value={1}>TP 1.70 METRE Code 3 SELL</MenuItem>
          <MenuItem value={2}>TP 1.65 METRE Code 1 SELL</MenuItem>
          <MenuItem value={3}>TP 1.65 METRE Code 2 SELL</MenuItem>
          <MenuItem value={4}>TP 1.95 METRE Code 4 SELL</MenuItem>
        </Select>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="20" sx={{ width: 60, textAlign: 'center' }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$101.00" sx={{ width: 90, textAlign: 'center' }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$2020.00" sx={{ width: 90, textAlign: 'center' }} />
      </>
    ),
    createData(
      '',
      '',
      '',
      <>
        <Button>ADD TO QUOTE</Button>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$360.00" sx={{ width: 90, textAlign: 'center' }} />
      </>
    )
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <InputLabel>Type</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>DESCRIPTION</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>METRES</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>RATE</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>TOTAL</InputLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.type} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="center">{row.meters}</TableCell>
              <TableCell align="center">{row.rate}</TableCell>
              <TableCell align="center">{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
