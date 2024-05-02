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

const ReviewDateTable = () => {
  const [status, setStatus] = useState(10);
  const handleChange = (e) => {
    setStatus(e.target.value);
  };
  /* Profit and loss calculations */
  const reviewTableOne = useMemo(() => [
    { label: 'Acceptance Date', value: <TextField value="18//07/2023" /> },
    { label: 'Invoice Date', value: <TextField value="18//07/2023" /> }
  ]);

  const reviewTableTwo = useMemo(() => {
    return [
      { label: 'Client $$', total: '$1295', amount: <TextField value="$600" /> },
      { label: 'Neigh 1 $$', total: '$1295', amount: <TextField value="$600" /> },
      { label: 'Total Sell $$', total: '$2590', amount: <TextField value="$1200" /> },
      { label: 'Balance', total: '$1390', amount: '' }
    ];
  });

  /* Render */
  return (
    <CardContent>
      <Grid container columnSpacing={3} rowSpacing={8}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width={250}>
                    <InputLabel sx={{ visibility: 'hidden' }}>Item</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel sx={{ visibility: 'hidden' }}>price</InputLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviewTableOne.map((row) => (
                  <TableRow key={row.label} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Typography variant="h6">{row.label}</Typography>
                    </TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width="20%">
                    <InputLabel sx={{ visibility: 'hidden' }}>Item</InputLabel>
                  </TableCell>
                  <TableCell align="center" width="40%">
                    <InputLabel>Total</InputLabel>
                  </TableCell>
                  <TableCell width="40%">
                    <InputLabel>Amount (Depost)</InputLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviewTableTwo.map((row) => (
                  <TableRow key={row.label} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Typography variant="h6">{row.label}</Typography>
                    </TableCell>
                    <TableCell>{row.total}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} lg={4} md={6}>
          <Typography variant="h3" mb={2}>
            Status
          </Typography>
          <Select value={status} placeholder="Age" onChange={handleChange} fullWidth>
            <MenuItem value={10}>Qoutation</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <Select value={status} placeholder="Age" onChange={handleChange} sx={{ marginTop: 2, marginBottom: 2 }} fullWidth>
            <MenuItem value={10}>Job</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <Button variant="contained" color="primary">
            Save and Update Status
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default ReviewDateTable;
