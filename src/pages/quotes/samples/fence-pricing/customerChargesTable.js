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

export default function CustomerChargesTable() {
  const [selectList, setSelectList] = React.useState([
    { id: uuidV4(), gate_type: 1 },
    { id: uuidV4(), gate_type: 2 }
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
        <Typography variant="h3" sx={{ display: 'flex' }}>
          CUSTOMER GATE CHARGES (
          <Typography variant="h3" color={'red'}>
            ADD TO QUOTE AMOUNT IF REQUIRED
          </Typography>
          )
        </Typography>
      </Grid>
      {/* Pailing Table */}
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <InputLabel>sNo</InputLabel>
                </TableCell>
                <TableCell align="center">
                  <InputLabel>DESCRIPTION</InputLabel>
                </TableCell>
                <TableCell align="center">
                  <InputLabel>QTY</InputLabel>
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
              {selectList.map((val, i) => (
                <TableRow key={val.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" width={115}>
                    <Grid item xs={12} spacing={2} alignItems={'center'} container>
                      <Grid item xs={'auto'}>
                        <IconButton color="error" onClick={() => handleRemoveGate(val.id)}>
                          <CloseOutlined />
                        </IconButton>
                      </Grid>
                      <Grid item xs={'auto'}>
                        <Typography variant="h6">{i + 1}</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell key={i}>
                    <Select value={val.gate_type} onChange={handleSelectChange(val.id)} fullWidth sx={{ minWidth: 598 }}>
                      <MenuItem value={1}>Single Swing Gate</MenuItem>
                      <MenuItem value={2}>Double Swing Gate</MenuItem>
                      <MenuItem value={3}>Auto Double Swing Gate</MenuItem>
                      <MenuItem value={4}>Manual Slider Gate</MenuItem>
                      <MenuItem value={5}>Auto Slider Gate</MenuItem>
                    </Select>
                  </TableCell>
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
          Add More
        </Button>
      </Grid>
    </Grid>
  );
}
