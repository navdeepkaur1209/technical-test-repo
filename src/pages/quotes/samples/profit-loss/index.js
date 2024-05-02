import { useState } from 'react';

// material-ui
import { Button, CardContent, Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PlusSquareFilled } from '@ant-design/icons';
import FenceItems from './fenceItems';
import LabourItems from './labourItems';
import GateItems from './gateItems';
import ProfitLossTableOne from './profitLossTableOne';
import ProfitLossTableTwo from './profitLossTableTwo';

const ProfitLossSample = () => {
  const [createdBy, setCreatedBy] = useState(5);
  return (
    <Grid container spacing={3}>
      {/* Client Info */}
      <Grid item xs={12} container spacing={3}>
        {/* Personal Details */}
        <Grid item xs={12}>
          <MainCard content={false}>
            <CardContent>
              <Grid item xs={12} spacing={2} container>
                {/* COntainer 1 */}
                <Grid item xl={9} lg={8} xs={12} spacing={3} container>
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
                  {/* Property Address Field */}
                  <Grid item md={4} sm={6} xs={12}>
                    <InputLabel sx={{ marginBottom: 1.5 }}>Property Address</InputLabel>
                    <OutlinedInput fullWidth placeholder="Property Address" />
                  </Grid>
                  {/* Suburb Field */}
                  <Grid item md={4} sm={6} xs={12}>
                    <InputLabel sx={{ marginBottom: 1.5 }}>Suburb</InputLabel>
                    <OutlinedInput fullWidth placeholder="Suburb" />
                  </Grid>
                  {/* Phone Number Field */}
                  <Grid item md={4} sm={6} xs={12}>
                    <InputLabel sx={{ marginBottom: 1.5 }}>Phone Number</InputLabel>
                    <OutlinedInput fullWidth placeholder="Phone Number" />
                  </Grid>
                </Grid>
                <Grid item xl={3} lg={4} container spacing={3}>
                  {/* Qoute Number Field */}
                  <Grid item xs={12}>
                    <InputLabel sx={{ marginBottom: 1.5 }}>Quote Number</InputLabel>
                    <OutlinedInput fullWidth placeholder="12345" />
                  </Grid>
                  {/* Date */}
                  <Grid item xs={12}>
                    <InputLabel sx={{ marginBottom: 1.5 }}>Date</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker sx={{ width: '100%' }} />
                    </LocalizationProvider>
                  </Grid>
                  {/* createdBy Dropdown */}
                  <Grid item xs={12}>
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
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
        {/*  Options content */}
        <Grid item xs={12}>
          <MainCard content={false}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3">FENCE ITEMS</Typography>
                </Grid>
                {/* Pailing Table */}
                <Grid item xs={12}>
                  <FenceItems />
                </Grid>
                <Grid item xs={12} justifyContent={'end'} sx={{ display: 'flex' }}>
                  <Button variant="contained" color="secondary" startIcon={<PlusSquareFilled />}>
                    Add Fence Items
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
        {/*  Labour Item content */}
        <Grid item xs={12}>
          <MainCard content={false}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3">Labour ITEMS</Typography>
                </Grid>
                {/* Pailing Table */}
                <Grid item xs={12}>
                  <LabourItems />
                </Grid>
                <Grid item xs={12} justifyContent={'end'} sx={{ display: 'flex' }}>
                  <Button variant="contained" color="secondary" startIcon={<PlusSquareFilled />}>
                    Add Labour Items
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
        {/*  Labour Item content */}
        <Grid item xs={12}>
          <MainCard content={false}>
            <CardContent>
              <GateItems />
            </CardContent>
          </MainCard>
        </Grid>
        {/*  Labour Item content */}
        <Grid item xs={12}>
          <MainCard content={false}>
            <CardContent>
              <Grid container justifyContent={'center'} spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3" textAlign={'center'}>
                    Profit Loss
                  </Typography>
                </Grid>
                {/* Pailing Table */}
                <Grid item xs={12} lg={5}>
                  <ProfitLossTableOne />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <ProfitLossTableTwo />
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfitLossSample;
