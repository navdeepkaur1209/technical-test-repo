import { useState } from 'react';

// material-ui
import { Button, CardContent, Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PlusSquareFilled } from '@ant-design/icons';
import PriceTable from './priceTable';
import OptionsTable from './optionTable';
import CustomerChargesTable from './customerChargesTable';
import TotalPostTable from './totalPostTable';
import CementCalculation from './cementCalculation';

const FencePricingSample = () => {
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
        {/* content */}
        <Grid item xs={12}>
          <MainCard content={false}>
            <CardContent>
              <Grid container spacing={3}>
                {/* Pailing Table */}
                <Grid item xs={12}>
                  <PriceTable />
                </Grid>
                <Grid item xs={12} justifyContent={'end'} sx={{ display: 'flex' }}>
                  <Button variant="contained" color="secondary" startIcon={<PlusSquareFilled />}>
                    Add More
                  </Button>
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
                  <Typography variant="h3">OPTIONS AND COMPARE</Typography>
                </Grid>
                {/* Pailing Table */}
                <Grid item xs={12}>
                  <OptionsTable />
                </Grid>
                <Grid item xs={12} justifyContent={'end'} sx={{ display: 'flex' }}>
                  <Button variant="contained" color="secondary" startIcon={<PlusSquareFilled />}>
                    Add More
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
        {/*  Customer content */}
        <Grid item xs={12}>
          <MainCard content={false}>
            <CardContent>
              <CustomerChargesTable />
            </CardContent>
          </MainCard>
        </Grid>
        {/*  Total Calculation */}
        <Grid item xs={12}>
          <MainCard content={false}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3">Total Post Calulation</Typography>
                </Grid>
                {/* Pailing Table */}
                <Grid item xs={12}>
                  <TotalPostTable />
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
        {/*  Cement Calculation */}
        <Grid item xs={12}>
          <MainCard content={false}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3">Cement Calulation</Typography>
                </Grid>
                {/* Pailing Table */}
                <Grid item xs={12}>
                  <CementCalculation />
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FencePricingSample;
