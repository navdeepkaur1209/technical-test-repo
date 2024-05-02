import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { CloseOutlined, PlusSquareFilled } from '@ant-design/icons';
import { v4 as uuidV4 } from 'uuid';

export default function AdditionalWorkTable() {
  const [selectList, setSelectList] = React.useState([
    { id: uuidV4(), work_type: 1 },
    { id: uuidV4(), work_type: 2 }
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
  const handleAddWork = () => {
    setSelectList([...selectList, { id: uuidV4(), work_type: '' }]);
  };
  // Handle Remove work
  const handleRemoveWork = (id) => {
    setSelectList((list) => list.filter((element) => element.id !== id));
  };
  return (
    <Grid container spacing={3}>
      {/* Additional Works */}
      <Grid item xs={12}>
        <Typography variant="h3">Additional Works</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
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
              {selectList.map((val, i) => (
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
                          name="work_type"
                          value={val.work_type}
                          onChange={handleSelectChange(val.id)}
                          sx={{ minWidth: 610 }}
                          fullWidth
                        >
                          <MenuItem value={1}>Add 90mm x 45mm Handrail (lip) t/pine Capping to fence top</MenuItem>
                          <MenuItem value={2}>Upgrade bottom plinthboard to double stronger 150mm x 38mm sawn t/pine</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                      $300
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                      $100
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                      $100
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                      $100
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                      $200
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* Additional Work Button */}
      <Grid item xs={12} justifyContent={'end'} sx={{ display: 'flex' }}>
        <Button variant="contained" color="secondary" startIcon={<PlusSquareFilled />} onClick={handleAddWork}>
          Additional Works
        </Button>
      </Grid>
    </Grid>
  );
}
