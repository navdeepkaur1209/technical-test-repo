import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CardContent, Grid, InputLabel, Typography } from '@mui/material';


/* Component */
const ReviewTable = ({ quoteId }) => {
  const reviewTableOne = useMemo(() => [
    { label: 'Quote Number', value: 12345 },
    { label: 'Last Update', value: '19/07/2023' },
    { label: 'Quote Date', value: '18/07/2023' },
    { label: 'Address', value: '' },
    { label: 'Suburb', value: '' },
    { label: 'Cust Contact', value: '' },
    { label: 'Main Job Type', value: 'TP 1.65 METRE CODE 1' },
    { label: 'Meters', value: 20 },
    { label: 'Job Info', value: '' },
    { label: 'Demo Notes', value: '' },
    { label: 'Key Job Notes', value: 'TOP 1.65 METRE CODE 1' }
  ]);

  const reviewTableTwo = useMemo(() => {
    return [
      { label: 'Supplier 1', value: '' },
      { label: 'Sup 1 $$', value: '' },
      { label: 'Supplier 2', value: '' },
      { label: 'Sup 2 $$', value: '' },
      { label: 'Supplier 3', value: '' },
      { label: 'Sup 3 $$', value: '' },
      { label: 'Other Sup $$', value: '' },
      { label: 'Total Materials', value: '' },
      { label: 'Material On Qoute', value: '$' + Number(875).toFixed(2) },
      { label: 'Material Variance', value: '$' + Number(875).toFixed(2) },
      { label: 'Labour On Qoute', value: '$' + Number(355).toFixed(2) },
      { label: 'Labour Variance', value: '$' + Number(355).toFixed(2) }
    ];
  });

  const reviewTableThree = useMemo(() => {
    return [
      { label: 'Demo By', value: '' },
      { label: 'Demo $$', value: '$300' },
      { label: '3rd Party $$', value: '' },
      { label: 'Fencer 1', value: '' },
      { label: 'Fencer 1 $$', value: '' },
      { label: 'Fencer 2', value: '' },
      { label: 'Fencer 2 $$', value: '' },
      { label: 'Fencer 3', value: '' },
      { label: 'Fencer 3 $$', value: '' },
      { label: 'Fencer 4', value: '' },
      { label: 'Fencer 4 $$', value: '' },
      { label: 'Fencers', value: '' },
      { label: 'Actual Labour', value: '' },
      { label: 'Net Labour (84%)', value: '' }
    ];
  });
  const reviewTableFour = useMemo(() => {
    return [
      { label: 'Total Sales', value: '$2,590' },
      { label: 'Total Materials', value: '$875' },
      { label: 'Demo', value: '$300' },
      { label: '3rd Party', value: '$0' },
      { label: 'Total Labour', value: '$355' },
      { label: 'Admin Cost', value: '$400' },
      { label: 'Total Costs', value: '$1970' },
      { label: '', value: '' },
      { label: 'Profit', value: '$620' },
      { label: 'Profit %', value: '24%' },
      { label: 'Admin Cost %', value: '17%' },
      { label: 'Fencers Claim', value: '$298' },
      { label: 'Actual Labour', value: '' },
      { label: '', value: '' }
    ];
  });

  /* Render */
  return (
    <CardContent>
      <Grid container justifyContent={'center'} columnSpacing={3} rowSpacing={8}>
        <Grid item xs={12} lg={5}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" className="equal-table">
              <TableHead>
                <TableRow>
                  <TableCell width={200}>
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
        <Grid item xs={12} lg={5}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" className="equal-table">
              <TableHead>
                <TableRow>
                  <TableCell width={200}>
                    <InputLabel sx={{ visibility: 'hidden' }}>Item</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel sx={{ visibility: 'hidden' }}>price</InputLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviewTableTwo.map((row) => (
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
        <Grid item xs={12} lg={5}>
          <Typography variant="h3" mb={2} visibility="hidden">
            Profit Calculations
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" className="equal-table">
              <TableHead>
                <TableRow>
                  <TableCell width={200}>
                    <InputLabel sx={{ visibility: 'hidden' }}>Item</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel sx={{ visibility: 'hidden' }}>price</InputLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviewTableThree.map((row) => (
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
        <Grid item xs={12} lg={5}>
          <Typography variant="h3" mb={2}>
            Profit Calculations
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" className="equal-table">
              <TableHead>
                <TableRow>
                  <TableCell width={200}>
                    <InputLabel sx={{ visibility: 'hidden' }}>Item</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel sx={{ visibility: 'hidden' }}>price</InputLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviewTableFour.map((row) => (
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
      </Grid>
    </CardContent>
  );
};

ReviewTable.propTypes = {
  quoteId: PropTypes.string
};

export default ReviewTable;
