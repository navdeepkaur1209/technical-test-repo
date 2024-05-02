import { Alert, Button, CardContent, Grid, InputLabel, MenuItem, OutlinedInput, Select, IconButton } from '@mui/material';
import MainCard from 'components/MainCard';
import React, { useState } from 'react';
import Neighbour from './neighbour';
import { PlusSquareFilled } from '@ant-design/icons';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CopyOutlined } from '@ant-design/icons';

const ClientInfo = () => {
  const [createdBy, setCreatedBy] = useState(5);
  const [status, setStatus] = useState(5);
  const [neighbour, setNeighbour] = useState([]);
  const addNeighbour = () => {
    const values = [...neighbour, []];
    setNeighbour(values);
  };
  const deleteNeighbour = (i) => {
    const deletevalue = [...neighbour];
    deletevalue.splice(i, 1);
    setNeighbour(deletevalue);
  };
  return (
    <Grid item xs={12} container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Client Details" content={false}>
          <CardContent>
            <Grid item xs={12} spacing={3} container justifyContent={'end'} alignItems={'center'}>
              {/* Qoute Number Field */}
              <Grid item xl={2} sm={3} xs={12}>
                <InputLabel sx={{ marginBottom: 1.5 }}>Quote Number</InputLabel>
                <OutlinedInput fullWidth placeholder="" />
              </Grid>
              {/* Date */}
              <Grid item xl={2} sm={3} xs={12}>
                <InputLabel sx={{ marginBottom: 1.5 }}>Date</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker />
                </LocalizationProvider>
              </Grid>
              {/* createdBy Dropdown */}
              <Grid item xl={2} sm={3} xs={12}>
                <InputLabel id="demo-multiple-name-label" sx={{ marginBottom: 1.5 }}>
                  Created By
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="createdBy-select"
                  value={createdBy}
                  placeholder="createdBy"
                  onChange={(e) => setCreatedBy(e.target.value)}
                  fullWidth
                >
                  <MenuItem value={5} disabled>
                    Select
                  </MenuItem>
                  <MenuItem value={10}>Luke</MenuItem>
                  <MenuItem value={15}>Employee 2</MenuItem>
                  <MenuItem value={20}>Employee 3</MenuItem>
                </Select>
              </Grid>
            </Grid>
            {/* Copy Info */}
            <Grid item xl={3} md={4} xs={12} sx={{ margin: '25px 0 0 auto' }}>
              <Alert
                color="secondary"
                variant="filled"
                icon={false}
                sx={{ alignItems: 'center' }}
                action={
                  <IconButton sx={{ color: 'white' }}>
                    <CopyOutlined />
                  </IconButton>
                }
              >
                Copy CUST INFO and SITE PLAN from existing quote
              </Alert>
            </Grid>
          </CardContent>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Client Details" content={false}>
          <CardContent>
            <Grid item xs={12} spacing={3} container>
              {/* COntainer 1 */}
              <Grid item xs={12} spacing={3} container alignItems={'center'}>
                {/* Full Name Field */}
                <Grid item md={4} sm={6} xs={12}>
                  <InputLabel sx={{ marginBottom: 1.5 }}>Full Name</InputLabel>
                  <OutlinedInput fullWidth placeholder="Full Name" />
                </Grid>
                {/* Email Field */}
                <Grid item md={4} sm={6} xs={12}>
                  <InputLabel sx={{ marginBottom: 1.5 }}>Email Address</InputLabel>
                  <OutlinedInput fullWidth placeholder="Email Address" type="email" />
                </Grid>
              </Grid>
              {/* COntainer 2 */}
              <Grid item xs={12} spacing={3} container alignItems={'center'}>
                {/* Property Address Field */}
                <Grid item md={4} sm={6} xs={12}>
                  <InputLabel sx={{ marginBottom: 1.5 }}>Property Address</InputLabel>
                  <OutlinedInput fullWidth placeholder="Property Address" />
                </Grid>
                {/* Phone Number Field */}
                <Grid item md={4} sm={6} xs={12}>
                  <InputLabel sx={{ marginBottom: 1.5 }}>Phone Number</InputLabel>
                  <OutlinedInput fullWidth placeholder="Phone Number" />
                </Grid>
                {/* Suburb Field */}
                <Grid item md={4} sm={6} xs={12}>
                  <InputLabel sx={{ marginBottom: 1.5 }}>Suburb</InputLabel>
                  <OutlinedInput fullWidth placeholder="Suburb" />
                </Grid>
                {/* Attn Field */}
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <InputLabel sx={{ marginBottom: 1.5 }}>Attn</InputLabel>
                  <OutlinedInput fullWidth placeholder="Attn" />
                </Grid>
                {/* Send To Field */}
                <Grid item md={4} sm={6} xs={12}>
                  <InputLabel sx={{ marginBottom: 1.5 }}>Send To</InputLabel>
                  <OutlinedInput fullWidth placeholder="Send To" />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      </Grid>
      {/* Neighbour */}
      {neighbour.map((d, i) => {
        return <Neighbour key={i} index={i} removeFun={deleteNeighbour} />;
      })}
      {/* Add Neighbour Button */}
      <Grid item xs={12} justifyContent={'end'} sx={{ display: 'flex' }}>
        <Button onClick={addNeighbour} variant="contained" color="secondary" startIcon={<PlusSquareFilled />}>
          Add Neighbour
        </Button>
      </Grid>
      {/* Select Qoute */}
      <Grid item xs={12}>
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={3} justifyContent={'center'}>
              <Grid item lg={3} md={4} xs={12} spacing={3} sx={{ textAlign: 'center' }}>
                <InputLabel sx={{ marginBottom: 1.5, textAlign: 'center' }}>Please select a quote template</InputLabel>
                <Select
                  fullWidth
                  value={status}
                  placeholder="Status"
                  sx={{ textAlign: 'left' }}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={5} disabled>
                    --Select--
                  </MenuItem>
                  <MenuItem value={10}>PAILING</MenuItem>
                  <MenuItem value={15}>PAILING - 4 NEIGHBOUR</MenuItem>
                  <MenuItem value={20}>CBOND</MenuItem>
                  <MenuItem value={25}>CBOND- 4 NEIGHBOUR</MenuItem>
                  <MenuItem value={30}>POST REPAIR</MenuItem>
                  <MenuItem value={35}>FEATURE</MenuItem>
                  <MenuItem value={40}>RETAINER</MenuItem>
                  <MenuItem value={45}>METAL</MenuItem>
                </Select>
                <Button variant="contained" color="secondary" sx={{ marginTop: 1.5 }}>
                  START QUOTATION
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default ClientInfo;
