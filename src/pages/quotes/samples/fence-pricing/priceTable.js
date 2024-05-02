import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';

function createData(type, description, meters, rate, total) {
  return { type, description, meters, rate, total };
}

export default function PriceTable() {
  const [dropdown, setDropdown] = React.useState(1);
  const rows = [
    createData(
      '',
      <>
        <Typography variant="h6">TP 1.65 METRE Code 1 SELL</Typography>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="20" sx={{ width: 50, textAlign: 'center' }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$101.00" sx={{ width: 90, textAlign: 'center' }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$2020.00" sx={{ width: 90, textAlign: 'center' }} />
      </>
    ),
    createData(
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth>
          <MenuItem value={1}>SMALL JOBS</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </>,
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth sx={{ minWidth: 400 }}>
          <MenuItem value={1}>Smaall Job Under 7.9m</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="1" sx={{ width: 50, textAlign: 'center' }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$240.00" sx={{ width: 90, textAlign: 'center' }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$240.00" sx={{ width: 90, textAlign: 'center' }} />
      </>
    ),
    createData(
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth>
          <MenuItem value={1}>Delivery</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </>,
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth sx={{ minWidth: 400 }}>
          <MenuItem value={1}>Standard</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="0" sx={{ width: 50, textAlign: 'center' }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$55.00" sx={{ width: 90, textAlign: 'center' }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90, textAlign: 'center' }} />
      </>
    ),
    createData(
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth>
          <MenuItem value={1}>STARTER POST</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </>,
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth sx={{ minWidth: 400 }}>
          <MenuItem value={1}>Hardwood 125 x 75mm 2.7m (starter)</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="0" sx={{ width: 50, textAlign: 'center' }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$55.00" sx={{ width: 90, textAlign: 'center' }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90, textAlign: 'center' }} />
      </>
    ),
    createData(
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth>
          <MenuItem value={1}>POST</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </>,
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth sx={{ minWidth: 400 }}>
          <MenuItem value={1}>ADMIN FEE</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="0" sx={{ width: 50, textAlign: 'center' }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$55.00" sx={{ width: 90, textAlign: 'center' }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90, textAlign: 'center' }} />
      </>
    ),
    createData(
      '',
      <>
        <Typography variant="h5" align="right">
          Job Cost
        </Typography>
      </>,
      '',
      '',
      <>
        <OutlinedInput fullWidth placeholder="$2320.00" sx={{ width: 90, textAlign: 'center' }} />
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
