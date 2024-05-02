import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { v4 as uuidV4 } from 'uuid';
import { CloseOutlined, PlusSquareFilled } from '@ant-design/icons';

export default function ClientRequestTable() {
  const [cleitnRequest, setCleitnRequest] = React.useState([{ id: uuidV4(), client_request: 1 }]);
  // handle input change
  const handleSelectChange = (id) => (evt) => {
    const { value } = evt.target;
    setCleitnRequest((list) =>
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
  const handleAddClient = () => {
    setCleitnRequest([...cleitnRequest, { id: uuidV4(), client_request: '' }]);
  };
  // Handle Remove client
  const handleRemoveWork = (id) => {
    setCleitnRequest((list) => list.filter((element) => element.id !== id));
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3">Client Requests</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <InputLabel>DESCRIPTION</InputLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cleitnRequest.map((val, i) => (
                <TableRow key={val.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell key={i} component="th" scope="row">
                    <Grid item xs={12} spacing={3} container>
                      <Grid item xs={'auto'}>
                        <IconButton color="error" onClick={() => handleRemoveWork(val.id)}>
                          <CloseOutlined />
                        </IconButton>
                      </Grid>
                      <Grid item xs={'auto'}>
                        <Select
                          name="client_request"
                          value={val.client_request}
                          onChange={handleSelectChange(val.id)}
                          fullWidth
                          sx={{ width: 600 }}
                        >
                          <MenuItem value={1}>Client to remove the tree on the fence line prior to our arrival.</MenuItem>
                          <MenuItem value={2}>Neighbour to remove all the trees on the fence line prior to our arrival.</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* Client request Button */}
      <Grid item xs={12} justifyContent={'end'} sx={{ display: 'flex' }}>
        <Button variant="contained" color="secondary" startIcon={<PlusSquareFilled />} onClick={handleAddClient}>
          Client Requests
        </Button>
      </Grid>
    </Grid>
  );
}
