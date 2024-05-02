import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import { CloseOutlined, PlusSquareFilled } from '@ant-design/icons';
import { v4 as uuidV4 } from 'uuid';

export default function GateItems() {
  const [selectList, setSelectList] = React.useState([
    { id: uuidV4(), gate_type: 1 },
    { id: uuidV4(), gate_type: 10 }
  ]);
  // handle input change
  const handleSelectChange = (id) => (evt) => {
    const { value } = evt.target;
    setSelectList((list) =>
      list.map((element) =>
        element.id === id
          ? {
              ...element,
              [evt.target.name]: value
            }
          : element
      )
    );
  };

  // handle click event of the Add button
  const handleAddGate = () => {
    setSelectList([...selectList, { id: uuidV4(), gate_type: '' }]);
  };
  // Handle Remove work
  const handleRemoveGate = (id) => {
    setSelectList((list) => list.filter((element) => element.id !== id));
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3">GATE ITEMS</Typography>
      </Grid>
      {/* Pailing Table */}
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <InputLabel>Item</InputLabel>
                </TableCell>
                <TableCell align="center">
                  <InputLabel>PRODUCT</InputLabel>
                </TableCell>
                <TableCell align="center" sx={{ width: 92 }}>
                  <InputLabel>QTY</InputLabel>
                </TableCell>
                <TableCell align="center" sx={{ width: 139 }}>
                  <InputLabel>COST</InputLabel>
                </TableCell>
                <TableCell align="center" sx={{ width: 137 }}>
                  <InputLabel>TOTAL</InputLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectList.map((val, i) => (
                <TableRow key={val.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ minWidth: 299 }}>
                    <Grid item xs={12} spacing={2} alignItems={'center'} container>
                      <Grid item xs={'auto'}>
                        <IconButton color="error" onClick={() => handleRemoveGate(val.id)}>
                          <CloseOutlined />
                        </IconButton>
                      </Grid>
                      <Grid item xs={8}>
                        <Select value={val.gate_type} onChange={handleSelectChange(val.id)} fullWidth>
                          <MenuItem value={1}>Gate Frames</MenuItem>
                          <MenuItem value={2}>Gate Parts</MenuItem>
                          <MenuItem value={3}>Heights</MenuItem>
                          <MenuItem value={4}>Labour</MenuItem>
                          <MenuItem value={5}>Lattice</MenuItem>
                          <MenuItem value={6}>Metal Fencing</MenuItem>
                          <MenuItem value={7}>Metal Fencing Gates</MenuItem>
                          <MenuItem value={8}>Metal Hardware</MenuItem>
                          <MenuItem value={9}>Optioal Harwares</MenuItem>
                          <MenuItem value={10}>Yard Materials</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell key={i}></TableCell>
                  <TableCell align="center">
                    <OutlinedInput fullWidth placeholder="1" sx={{ width: 60, textAlign: 'center' }} />
                  </TableCell>
                  <TableCell align="center">
                    <OutlinedInput fullWidth placeholder="$900.00" sx={{ width: 90, textAlign: 'center' }} />
                  </TableCell>
                  <TableCell align="center">
                    <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90, textAlign: 'center' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} justifyContent={'end'} sx={{ display: 'flex' }}>
        <Button variant="contained" color="secondary" onClick={handleAddGate} startIcon={<PlusSquareFilled />}>
          Add Gate Items
        </Button>
      </Grid>
    </Grid>
  );
}
