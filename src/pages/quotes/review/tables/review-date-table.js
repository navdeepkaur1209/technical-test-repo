import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
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
import { useSelector } from 'store';

// GraphQL.
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import GetQuotePdfLink from 'graphql/quotes/GetQuotePdfLink';

const ReviewDateTable = ({ quoteId }) => {
  const [status, setStatus] = useState(10);

  /* GraphQL: GetQuotePdfLink */
  const [doGetQuotePdfLink, { data: dataGetQuotePdfLink }] = useGraphQLLazyQuery(GetQuotePdfLink);

  useEffect(() => {
    if (dataGetQuotePdfLink && dataGetQuotePdfLink.GetQuotePdfLink) {
      if (dataGetQuotePdfLink.GetQuotePdfLink.Url) {
        window.open(dataGetQuotePdfLink.GetQuotePdfLink.Url, '_blank', 'noreferrer');
      }
    }
  }, [dataGetQuotePdfLink]);

  const downloadQuotation = () => {
    doGetQuotePdfLink({
      variables: { id: quoteId, filetype: 'Quotation' }
    });
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };
  /* Profit and loss calculations */
  const reviewTableOne = useMemo(
    () => [
      { label: 'Acceptance Date', value: <TextField value="18//07/2023" /> },
      { label: 'Invoice Date', value: <TextField value="18//07/2023" /> }
    ],
    []
  );
  const quoteAmount = useSelector((state) => state.quotes);
  const reviewTableTwo = useMemo(() => {
    var arr = [];
    arr.push({ label: 'Client $$', total: Number(quoteAmount.client).toFixed(2), amount: <TextField value={Number(300).toFixed(2)} /> });
    if (quoteAmount.neighbours.length > 0) {
      quoteAmount.neighbours.forEach((value, key) => {
        if (!isNaN(value)) {
          arr.push({ label: `Neigh ${key + 1}$$`, total: Number(value).toFixed(2), amount: <TextField value={Number(300).toFixed(2)} /> });
        }
      });
    }
    arr.push({
      label: 'Total Sell $$',
      total: Number(quoteAmount.cost).toFixed(2),
      amount: Number(900).toFixed(2)
    });
    const balance = quoteAmount.cost - 900;
    arr.push({ label: 'Balance', total: Number(balance).toFixed(2), amount: '' });
    return arr;
  }, [quoteAmount]);

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
                  {/* <TableCell width="10%">
                    <InputLabel sx={{ visibility: 'hidden' }}>Item</InputLabel>
                  </TableCell> */}
                  <TableCell colSpan={2}>
                    <InputLabel>Total</InputLabel>
                  </TableCell>
                  <TableCell width="40%">
                    <InputLabel>Amount (Deposit)</InputLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviewTableTwo.map((row) => (
                  <TableRow key={row.label} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" width="20%">
                      <Typography variant="h6">{row.label}</Typography>
                    </TableCell>
                    <TableCell align="center" width="40%">
                      {row.total}
                    </TableCell>
                    <TableCell width="40%">{row.amount}</TableCell>
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
          <Select value={status} placeholder="Age" onChange={handleChange} sx={{ marginBottom: 2 }} fullWidth>
            <MenuItem value={10}>Quotation</MenuItem>
            <MenuItem value={20}>Job</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <Button variant="contained" color="primary">
            Save and Update Status
          </Button>
          <Button variant="contained" color="primary" sx={{ marginLeft: 2 }} onClick={() => downloadQuotation()}>
            Download Quotation
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  );
};

ReviewDateTable.propTypes = {
  quoteId: PropTypes.string
};

export default ReviewDateTable;
