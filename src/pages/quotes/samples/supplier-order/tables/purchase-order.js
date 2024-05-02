import { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import { CardContent, Grid, InputLabel, Typography } from '@mui/material';
import { CheckCircleOutlined, DownloadOutlined, PlusSquareFilled } from '@ant-design/icons';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const PurchaseOrder = () => {
  const [status, setStatus] = useState(10);
  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const purchaseOrderTable = useMemo(() => {
    return [
      {
        item: <TextField value="FENCE" />,
        product: <TextField value="TP 1.65 METRE Code 1 COST" fullWidth />,
        qty: <TextField value="20" sx={{ textAlign: 'center' }} inputProps={{ style: { textAlign: 'center' } }} />
      }
    ];
  });

  /* Render */
  return (
    <CardContent>
      <Grid container columnSpacing={3} alignItems={'flex-end'}>
        <Grid item xs={12}>
          <Typography variant="h4" mb={2}>
            Select a supplier to generate a purchase order
          </Typography>
        </Grid>
        <Grid item xs={12} lg={4} md={6}>
          <Select value={status} placeholder="Age" onChange={handleChange} fullWidth>
            <MenuItem value={10}>Aust Lattice & Timber</MenuItem>
            <MenuItem value={20}>Eastside Fencing</MenuItem>
            <MenuItem value={30}>Third Option</MenuItem>
          </Select>
          {/* <TextField value="Eastside Fencing" sx={{ marginTop: 2 }} fullWidth /> */}
        </Grid>
        <Grid item xs={12} md={'auto'} sx={{ paddingBottom: '3px' }}>
          <Button variant="contained" color="secondary">
            Create Supplier Order from the list
          </Button>
        </Grid>
      </Grid>
      <Grid container columnSpacing={3} rowSpacing={4} mt={4}>
        <Grid item xs={12} lg={4} md={6}>
          <InputLabel sx={{ marginBottom: 1 }}>Order To</InputLabel>
          <TextField value="Aust Lattice & Timber" fullWidth />
        </Grid>
        <Grid item xs={12} lg={4} md={6}>
          <InputLabel sx={{ marginBottom: 1 }}>Deliver To</InputLabel>
          <TextField value="" fullWidth />
        </Grid>
        <Grid item xs={12} lg={4} md={6}>
          <InputLabel sx={{ marginBottom: 1 }}>Deliver Date</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker sx={{ width: '100%' }} format="DD/MM/YYYY" />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} lg={4} md={6}>
          <InputLabel sx={{ marginBottom: 1 }}>P/O NBR:</InputLabel>
          <TextField value="Auto" fullWidth />
        </Grid>
        <Grid item xs={12} lg={4} md={6}>
          <InputLabel sx={{ marginBottom: 1 }}>Delivery</InputLabel>
          <Select value={status} placeholder="Age" onChange={handleChange} fullWidth>
            <MenuItem value={10}>Standard</MenuItem>
            <MenuItem value={20}>Quick</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid container columnSpacing={3} rowSpacing={4} mt={4}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width="20%">
                    <InputLabel>Item</InputLabel>
                  </TableCell>
                  <TableCell width="60%">
                    <InputLabel>PRODUCT</InputLabel>
                  </TableCell>
                  <TableCell align="center" width="20%">
                    <InputLabel>QUANTITY</InputLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchaseOrderTable.map((row) => (
                  <TableRow key={row.item} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Typography variant="h6">{row.item}</Typography>
                    </TableCell>
                    <TableCell sx={{ paddingLeft: '12px !important' }}>{row.product}</TableCell>
                    <TableCell>{row.qty}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" startIcon={<PlusSquareFilled />}>
            Add an Item
          </Button>
        </Grid>
        <Grid item xs={12} container gap={3} justifyContent="flex-end">
          <Button variant="contained" color="primary" startIcon={<CheckCircleOutlined />}>
            Save
          </Button>
          <Button variant="contained" color="success" startIcon={<DownloadOutlined />}>
            Download a PDF
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default PurchaseOrder;
