import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

function createData(height, description, meters, cost, clientShare, neighbour1Share, neighbour2Share) {
  return { height, description, meters, cost, clientShare, neighbour1Share, neighbour2Share };
}

export default function PalingTable() {
  const [pailingHeight, setPailingHeight] = React.useState(5);
  const rows = [
    createData(
      <>
        <Select
          id="createdBy-select"
          value={pailingHeight}
          placeholder="pailingHeight"
          onChange={(e) => setPailingHeight(e.target.value)}
          fullWidth
        >
          <MenuItem value={5}>TP 1.65 METRE Code 1</MenuItem>
          <MenuItem value={10}>TP 1.7 METRE Code 1</MenuItem>
          <MenuItem value={15}>TP 1.9 METRE Code 1</MenuItem>
          <MenuItem value={20}>TP 2 METRE Code 1</MenuItem>
        </Select>
      </>,
      <>
        <Select value={pailingHeight} onChange={(e) => setPailingHeight(e.target.value)} fullWidth>
          <MenuItem value={5}>Standard Treated Pine Paling with Hardwood Posts</MenuItem>
          <MenuItem value={6}>Option 2</MenuItem>
          <MenuItem value={7}>Option 3</MenuItem>
          <MenuItem value={8}>Option 4</MenuItem>
        </Select>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="20" />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$2320.00" sx={{ minWidth: '70px' }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$694.00" />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$693.00" />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$693.00" />
      </>
    )
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <InputLabel>HEIGHT</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>DESCRIPTION</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>METRES</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>COST</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>Client Share</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>Neighbour 1 Share</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>Neighbour 2 Share</InputLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.height} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.height}
              </TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.meters}</TableCell>
              <TableCell align="center">{row.cost}</TableCell>
              <TableCell align="center">{row.clientShare}</TableCell>
              <TableCell align="center">{row.neighbour1Share}</TableCell>
              <TableCell align="center">{row.neighbour2Share}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
