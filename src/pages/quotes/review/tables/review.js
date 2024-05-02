import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CardContent, Grid, InputLabel, Typography } from '@mui/material';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';
import { formatDate } from 'utils/helpers';

/* Component */
const ReviewTable = ({ quoteId, quote }) => {
  /* GraphQL: GetQuoteDetails */
  const { data: dataGetQuoteDetailsPaling } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: 'SPECS', subtype: 'PALING' }
  });

  const PricingPailing = useMemo(() => {
    if (dataGetQuoteDetailsPaling && dataGetQuoteDetailsPaling.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetailsPaling.GetQuoteDetails.QuoteDetails);
      if (data && data.length) {
        return parseFloat(data[0]['cost']);
      } else {
        return 0;
      }
    }
    return 0;
  }, [dataGetQuoteDetailsPaling]);

  /* GraphQL: GetQuoteDetails */
  const { data: dataGetQuoteDetailsAdditionalWorks } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: 'SPECS', subtype: 'ADDITIONAL_WORKS' }
  });

  const PricingAdditionalWorks = useMemo(() => {
    if (dataGetQuoteDetailsAdditionalWorks && dataGetQuoteDetailsAdditionalWorks.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetailsAdditionalWorks.GetQuoteDetails.QuoteDetails);
      return data.reduce((a, c) => a + parseFloat(c.cost), 0);
    }
    return 0;
  }, [dataGetQuoteDetailsAdditionalWorks]);

  /* GraphQL: GetQuoteDetails */
  const { data: dataGetQuoteDetailsExtraLabour } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: 'SPECS', subtype: 'EXTRA_LABOUR' }
  });

  const PricingExtraLabour = useMemo(() => {
    if (dataGetQuoteDetailsExtraLabour && dataGetQuoteDetailsExtraLabour.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetailsExtraLabour.GetQuoteDetails.QuoteDetails);
      return data.reduce((a, c) => a + parseFloat(c.cost), 0);
    }
    return 0;
  }, [dataGetQuoteDetailsExtraLabour]);

  /* GraphQL: GetQuoteDetails */
  const { data: dataGetQuoteDetailsOptionals } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: 'SPECS', subtype: 'OPTIONALS' }
  });

  const PricingOptionals = useMemo(() => {
    if (dataGetQuoteDetailsOptionals && dataGetQuoteDetailsOptionals.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetailsOptionals.GetQuoteDetails.QuoteDetails);
      return data.reduce((a, c) => a + parseFloat(c.cost), 0);
    }
    return 0;
  }, [dataGetQuoteDetailsOptionals]);

  /* GraphQL: GetQuoteDetails */
  const { data: dataGetQuoteDetailsFenceItems } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: 'PROFITLOSS', subtype: 'FENCE_ITEMS' }
  });

  const MaterialsCost = useMemo(() => {
    if (dataGetQuoteDetailsFenceItems && dataGetQuoteDetailsFenceItems.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetailsFenceItems.GetQuoteDetails.QuoteDetails);
      if (data && data.length) {
        data.pop();
        return data.reduce((a, f) => (a += f.total), 0);
      }
    }
    return 0;
  }, [dataGetQuoteDetailsFenceItems]);

  /* GraphQL: GetQuoteDetails */
  const { data: dataGetQuoteDetailsLabourItems } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: 'PROFITLOSS', subtype: 'LABOUR_ITEMS' }
  });

  const LabourCost = useMemo(() => {
    if (dataGetQuoteDetailsLabourItems && dataGetQuoteDetailsLabourItems.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetailsLabourItems.GetQuoteDetails.QuoteDetails);
      if (data && data.length) {
        return data.pop();
      }
    }
    return { labour: 0, total: 0, demoRemoval: { total: 0 }, serviceLocator: { total: 0 } };
  }, [dataGetQuoteDetailsLabourItems]);

  /* Display */
  const reviewTableOne = useMemo(() => {
    let paling = { mainJobType: '', metres: 0 };
    if (dataGetQuoteDetailsPaling && dataGetQuoteDetailsPaling.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetailsPaling.GetQuoteDetails.QuoteDetails);
      if (data && data.length) {
        paling.mainJobType = data[0].height;
        paling.metres = data[0].metres;
      }
    }

    return [
      { label: 'Quote Number', value: quote.QuoteNumber },
      { label: 'Last Update', value: formatDate(quote.QuoteDate) },
      { label: 'Quote Date', value: formatDate(quote.QuoteDate) },
      { label: 'Address', value: quote.Client.Address },
      { label: 'Suburb', value: quote.Client.Suburb },
      { label: 'Cust Contact', value: quote.Client.Name },
      { label: 'Main Job Type', value: paling.mainJobType },
      { label: 'Meters', value: paling.metres },
      { label: 'Job Info', value: '' },
      { label: 'Demo Notes', value: '' },
      { label: 'Key Job Notes', value: paling.mainJobType }
    ];
  }, [quote, dataGetQuoteDetailsPaling]);

  const reviewTableTwo = useMemo(() => {
    return [
      { label: 'Supplier 1' },
      { label: 'Sup 1 $$', value: '' },
      { label: 'Supplier 2' },
      { label: 'Sup 2 $$', value: '' },
      { label: 'Supplier 3' },
      { label: 'Sup 3 $$', value: '' },
      { label: 'Other Sup $$', value: '' },
      { label: 'Total Materials', value: '' },
      { label: 'Material On Qoute', value: Number(875).toFixed(2) },
      { label: 'Material Variance', value: Number(875).toFixed(2) },
      { label: 'Labour On Qoute', value: Number(PricingExtraLabour).toFixed(2) },
      { label: 'Labour Variance', value: Number(355).toFixed(2) }
    ];
  }, [PricingExtraLabour]);

  const reviewTableThree = useMemo(() => {
    return [
      { label: 'Demo By', value: '' },
      { label: 'Demo', value: Number(300).toFixed(2) },
      { label: '3rd Party $$', value: '' },
      { label: 'Fencer 1' },
      { label: 'Fencer 1 $$', value: '' },
      { label: 'Fencer 2' },
      { label: 'Fencer 2 $$', value: '' },
      { label: 'Fencer 3' },
      { label: 'Fencer 3 $$', value: '' },
      { label: 'Fencer 4' },
      { label: 'Fencer 4 $$', value: '' },
      { label: 'Fencers', value: '' },
      { label: 'Actual Labour', value: Number(LabourCost.total).toFixed(2) },
      { label: 'Net Labour (84%)', value: Number(LabourCost.labour).toFixed(2) }
    ];
  }, [LabourCost]);

  const reviewTableFour = useMemo(() => {
    const TotalSales = PricingPailing + PricingAdditionalWorks + PricingExtraLabour + PricingOptionals;
    const AdminCost = 0.17;
    const AdminCostPercentage = AdminCost * 100;
    const TotalCosts =
      MaterialsCost + LabourCost.demoRemoval.total + LabourCost.serviceLocator.total + LabourCost.total + TotalSales * AdminCost;
    const profitPercentage = Math.max(0, TotalSales - TotalCosts) / TotalSales ? Math.max(0, TotalSales - TotalCosts) / TotalSales : 0;
    const TotalAdminCost = TotalSales * AdminCost;
    const TotalProfit = TotalSales - TotalCosts;
    return [
      { label: 'Total Sales', value: Number(TotalSales).toFixed(2) },
      { label: 'Total Materials', value: Number(MaterialsCost).toFixed(2) },
      { label: 'Demo', value: Number(LabourCost.demoRemoval.total).toFixed(2) },
      { label: '3rd Party', value: Number(LabourCost.serviceLocator.total).toFixed(2) },
      { label: 'Total Labour', value: Number(LabourCost.total).toFixed(2) },
      { label: 'Admin Cost', value: Number(TotalAdminCost).toFixed(2) },
      { label: 'Total Costs', value: Number(TotalCosts).toFixed(2) },
      { label: '', value: '' },
      { label: 'Profit', value: Number(TotalProfit).toFixed(2) },
      { label: 'Profit %', value: Number(profitPercentage * 100).toFixed(2) + '%' },
      { label: 'Admin Cost %', value: Number(AdminCostPercentage).toFixed(2) + '%' },
      { label: 'Fencers Claim', value: Number(LabourCost.labour).toFixed(2) },
      { label: 'Actual Labour', value: Number(LabourCost.labour).toFixed(2) },
      { label: '', value: '' }
    ];
  }, [PricingPailing, PricingAdditionalWorks, PricingExtraLabour, PricingOptionals, MaterialsCost, LabourCost]);

  /* Render */
  return (
    <CardContent>
      <Grid container justifyContent={'center'} columnSpacing={3} rowSpacing={8}>
        <Grid item xs={12} lg={5}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
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
                {reviewTableOne.map((row, i) => (
                  <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
            <Table aria-label="simple table">
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
                {reviewTableTwo.map((row, i) => (
                  <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
            <Table aria-label="simple table">
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
                {reviewTableThree.map((row, i) => (
                  <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
            <Table aria-label="simple table">
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
                {reviewTableFour.map((row, i) => (
                  <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
  quoteId: PropTypes.string,
  quote: PropTypes.any
};

export default ReviewTable;
