import { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  OutlinedInput,
  Select,
  MenuItem
} from '@mui/material';
import { CardContent, Grid, InputLabel, Typography } from '@mui/material';
import { DeleteFilled, DownloadOutlined, EditFilled, EyeFilled, SearchOutlined } from '@ant-design/icons';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const JobSheeetList = () => {
  const [status, setStatus] = useState(10);
  const handleChange = (e) => {
    setStatus(e.target.value);
  };
  const JobSheeetListTable = useMemo(() => [
    {
      sno: 1,
      qouteNumber: 123456,
      supplierName: 'Aust Lattice & Timber',
      jobAddress: 'Aust Lattice & Timber',
      items: 20,
      actions: (
        <>
          <IconButton color="primary">
            <EditFilled />
          </IconButton>
          <IconButton color="secondary">
            <EyeFilled />
          </IconButton>
          <IconButton color="success">
            <DownloadOutlined />
          </IconButton>
          <IconButton color="error">
            <DeleteFilled />
          </IconButton>
        </>
      )
    },
    {
      sno: 2,
      qouteNumber: 123456,
      supplierName: 'Aust Lattice & Timber',
      jobAddress: 'Aust Lattice & Timber',
      items: 20,
      actions: (
        <>
          <IconButton color="primary">
            <EditFilled />
          </IconButton>
          <IconButton color="secondary">
            <EyeFilled />
          </IconButton>
          <IconButton color="success">
            <DownloadOutlined />
          </IconButton>
          <IconButton color="error">
            <DeleteFilled />
          </IconButton>
        </>
      )
    },
    {
      sno: 3,
      qouteNumber: 123456,
      supplierName: 'Aust Lattice & Timber',
      jobAddress: 'Aust Lattice & Timber',
      items: 20,
      actions: (
        <>
          <IconButton color="primary">
            <EditFilled />
          </IconButton>
          <IconButton color="secondary">
            <EyeFilled />
          </IconButton>
          <IconButton color="success">
            <DownloadOutlined />
          </IconButton>
          <IconButton color="error">
            <DeleteFilled />
          </IconButton>
        </>
      )
    },
    {
      sno: 4,
      qouteNumber: 123456,
      supplierName: 'Aust Lattice & Timber',
      jobAddress: 'Aust Lattice & Timber',
      items: 20,
      actions: (
        <>
          <IconButton color="primary">
            <EditFilled />
          </IconButton>
          <IconButton color="secondary">
            <EyeFilled />
          </IconButton>
          <IconButton color="success">
            <DownloadOutlined />
          </IconButton>
          <IconButton color="error">
            <DeleteFilled />
          </IconButton>
        </>
      )
    },
    {
      sno: 5,
      qouteNumber: 123456,
      supplierName: 'Aust Lattice & Timber',
      jobAddress: 'Aust Lattice & Timber',
      items: 20,
      actions: (
        <>
          <IconButton color="primary">
            <EditFilled />
          </IconButton>
          <IconButton color="secondary">
            <EyeFilled />
          </IconButton>
          <IconButton color="success">
            <DownloadOutlined />
          </IconButton>
          <IconButton color="error">
            <DeleteFilled />
          </IconButton>
        </>
      )
    }
  ]);

  /* Render */
  return (
    <CardContent>
      <Grid container spacing={3} alignItems="center" mb={4}>
        <Grid item sm={12}>
          <Typography variant="h4">Job Sheet list</Typography>
        </Grid>
        <Grid item xl={2} lg={3} md={4} container>
          <OutlinedInput id="JobSheeetListSearch" placeholder="Search" startAdornment={<SearchOutlined />} fullWidth />
        </Grid>
        <Grid item xl={2} lg={3} md={4} container>
          <Select value={status} placeholder="Age" onChange={handleChange} fullWidth>
            <MenuItem value={10}>Qoute</MenuItem>
            <MenuItem value={20}>Qoute 1</MenuItem>
            <MenuItem value={30}>Qoute 2</MenuItem>
          </Select>
        </Grid>
        <Grid item xl={2} lg={3} md={4} container>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="From" sx={{ width: '100%' }} />
          </LocalizationProvider>
        </Grid>
        <Grid item xl={2} lg={3} md={4} container>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="To" sx={{ width: '100%' }} />
          </LocalizationProvider>
        </Grid>
        <Grid item xl={2} lg={3} md={4} container>
          <Button variant="contained" color="secondary" size="large">
            Filter
          </Button>
        </Grid>
      </Grid>
      <Grid container columnSpacing={3} rowSpacing={8}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width={75}>
                    <InputLabel>S/No.</InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel>Quote Number</InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel>Supplier Name</InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel>Job Address</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel>No of items ordered</InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel sx={{ visibility: 'hidden' }}>Actions</InputLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {JobSheeetListTable.map((row) => (
                  <TableRow key={row.sno} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" align="center">
                      <Typography variant="h6">{row.sno}</Typography>
                    </TableCell>
                    <TableCell sx={{ paddingLeft: '12px !important' }}>{row.qouteNumber}</TableCell>
                    <TableCell>{row.supplierName}</TableCell>
                    <TableCell>{row.jobAddress}</TableCell>
                    <TableCell align="center">{row.items}</TableCell>
                    <TableCell>{row.actions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default JobSheeetList;
