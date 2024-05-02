import { useState } from 'react';

// material-ui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CardContent,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PlusSquareFilled } from '@ant-design/icons';
import PalingTable from './palingTable';
import FenceTable from './fenceTable';
import AdditionalWorkTable from './additionalWorkTable';
import ClientRequestTable from './clientRequestTable';
import ExtraLabourTable from './extraLabourTable';
import OptionsTable from './optionsTable';
import SubTotalTable from './subTotalTable';

const PalingSample = () => {
  const [createdBy, setCreatedBy] = useState(5);
  return (
    <Grid container spacing={3}>
      {/* Client Info */}
      <Grid item xs={12} container spacing={3}>
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
        {/* Paling content */}
        <Grid item xs={12}>
          <MainCard content={false}>
            <CardContent>
              <Grid container spacing={3}>
                {/* Accordion 1 */}
                <Grid item md={5} xs={12}>
                  <Accordion sx={{ border: 'none' }}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" sx={{ background: 'transparent', padding: '0' }}>
                      <Typography variant="h6" color={'red'}>
                        CLIENT TO CONFIRM ANY COUNCIL PERMITS REQUIRED
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                        blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                {/* Accordion 2 */}
                <Grid item md={5} xs={12}>
                  <Accordion sx={{ border: 'none' }}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" sx={{ background: 'transparent', padding: '0' }}>
                      <Typography variant="h6" color={'red'}>
                        ALL OWNERS NAMES AND DETAILS MUST BE SUPPLIED
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                        blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                {/* info */}
                <Grid item md={9} xs={12}>
                  <Typography variant="h6">
                    Standard Treated Pine paling fences are built to follow the existing land contour/slope for level construction see
                    option #6 below (request price if required).
                  </Typography>
                  <Typography variant="h6">Standard Treated Pine paling fences includes the following material:</Typography>
                </Grid>
                {/* Paling Table */}
                <Grid item xs={12}>
                  <PalingTable />
                </Grid>
                {/* info */}
                <Grid item xs={12}>
                  <Typography variant="h6" color="red" align="center">
                    Above includes starter posts and construction to existing land contour/slope If you require a special finish - please
                    ask to be quoted
                  </Typography>
                </Grid>
                {/* Fence */}
                <Grid item xs={12}>
                  <FenceTable />
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
        {/* Additional Work */}
        <Grid item xs={12}>
          <MainCard content={false}>
            <CardContent>
              {/* Additional Works */}
              <AdditionalWorkTable />
            </CardContent>
          </MainCard>
        </Grid>
        {/* Client request */}
        <Grid item xs={12}>
          <MainCard secondary={''} content={false}>
            <CardContent>
              <ClientRequestTable />
            </CardContent>
          </MainCard>
        </Grid>
        {/* Extra Labour */}
        <Grid item xs={12}>
          <MainCard content={false}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3">Extra Labour</Typography>
                </Grid>
                <Grid item xs={12}>
                  <ExtraLabourTable />
                </Grid>
                {/* Client Request Button */}
                <Grid item xs={12} justifyContent={'end'} sx={{ display: 'flex' }}>
                  <Button variant="contained" color="secondary" startIcon={<PlusSquareFilled />}>
                    Add Extra Labour
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
        {/* Sub Total */}
        <Grid item xs={12}>
          <MainCard content={false}>
            <CardContent>
              <SubTotalTable />
            </CardContent>
          </MainCard>
        </Grid>
        {/* Options */}
        <Grid item xs={12}>
          <MainCard content={false}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3">OPTIONS</Typography>
                  <Typography variant="h6">Please add or remove from the quoted price - all parties should agree</Typography>
                </Grid>
                <Grid item xs={12}>
                  <OptionsTable />
                </Grid>
                {/* Client Request Button */}
                <Grid item xs={12} justifyContent={'end'} sx={{ display: 'flex' }}>
                  <Button variant="contained" color="secondary" startIcon={<PlusSquareFilled />}>
                    Add Options
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PalingSample;
