import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CardContent, Grid, InputLabel, Typography } from '@mui/material';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';

/* Component */
const ProfitLossTable = ({ quoteId, profitLossFenceItems, profitLossLabourItems, profitLossGateItems }) => {
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
    } else {
      return 0;
    }
  }, [dataGetQuoteDetailsPaling]);

  /* GraphQL: GetQuoteDetails */
  const { data: dataGetQuoteDetailsAdditionalWorks } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: 'SPECS', subtype: 'ADDITIONAL_WORKS' }
  });

  const PricingAdditionalWorks = useMemo(() => {
    if (dataGetQuoteDetailsAdditionalWorks && dataGetQuoteDetailsAdditionalWorks.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetailsAdditionalWorks.GetQuoteDetails.QuoteDetails);
      return data.reduce((a, c) => a + parseFloat(c.cost), 0);
    } else {
      return 0;
    }
  }, [dataGetQuoteDetailsAdditionalWorks]);

  /* GraphQL: GetQuoteDetails */
  const { data: dataGetQuoteDetailsExtraLabour } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: 'SPECS', subtype: 'EXTRA_LABOUR' }
  });

  const PricingExtraLabour = useMemo(() => {
    if (dataGetQuoteDetailsExtraLabour && dataGetQuoteDetailsExtraLabour.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetailsExtraLabour.GetQuoteDetails.QuoteDetails);
      return data.reduce((a, c) => a + parseFloat(c.cost), 0);
    } else {
      return 0;
    }
  }, [dataGetQuoteDetailsExtraLabour]);

  /* GraphQL: GetQuoteDetails */
  const { data: dataGetQuoteDetailsOptionals } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: 'SPECS', subtype: 'OPTIONALS' }
  });

  /* Profit and loss calculations */
  const costs = useMemo(
    () => [
      { label: 'Demo', value: profitLossLabourItems && profitLossLabourItems.demoRemoval ? profitLossLabourItems.demoRemoval.total : 0 },
      {
        label: '3rd Party',
        value: profitLossLabourItems && profitLossLabourItems.serviceLocator ? profitLossLabourItems.serviceLocator.total : 0
      },
      { label: 'Labour', value: profitLossLabourItems && profitLossLabourItems.total ? profitLossLabourItems.total : 0 },
      { label: 'Fence Material', value: profitLossFenceItems && profitLossFenceItems.materials ? profitLossFenceItems.materials : 0 },
      {
        label: 'Gate Costs',
        value: profitLossGateItems && profitLossGateItems.length ? profitLossGateItems.reduce((a, g) => (a += g.total), 0) : 0
      },
      { label: 'Metal Fence', value: 0 }
    ],
    [profitLossFenceItems, profitLossLabourItems, profitLossGateItems]
  );

  const PricingOptionals = useMemo(() => {
    if (dataGetQuoteDetailsOptionals && dataGetQuoteDetailsOptionals.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetailsOptionals.GetQuoteDetails.QuoteDetails);
      return data.reduce((a, c) => a + parseFloat(c.cost), 0);
    } else {
      return 0;
    }
  }, [dataGetQuoteDetailsOptionals]);

  const profitLossCharge = useMemo(
    () => PricingPailing + PricingAdditionalWorks + PricingExtraLabour + PricingOptionals,
    [PricingPailing, PricingAdditionalWorks, PricingExtraLabour, PricingOptionals]
  );

  const profitLossTotalCosts = useMemo(() => costs.reduce((a, c) => (a += c.value), 0), [costs]);
  const demoCosts = useMemo(() => costs.filter((c) => c.label == 'Demo').reduce((a, c) => (a += c.value), 0), [costs]);

  const profitLost = useMemo(() => {
    const TotalCost = profitLossTotalCosts;
    const Charge = profitLossCharge;
    const Profit = Charge - TotalCost;
    const MarginCost = Charge == demoCosts ? 0 : Math.round((Profit / (Charge - demoCosts)) * 100 * 100) / 100;
    const MarginTotalCost = Charge == 0 ? 0 : Math.round((Profit / Charge) * 100 * 100) / 100;
    const Actual = Math.round((MarginCost - MarginTotalCost) * 100) / 100;

    return [
      { label: 'Total Cost', value: Number(TotalCost).toFixed(2) },
      { label: 'Charge', value: Number(Charge).toFixed(2) },
      { label: 'Profit', value: Number(Profit).toFixed(2) },
      { label: 'Margin Cost', value: MarginCost + '%' },
      { label: 'Margin Total Cost', value: MarginTotalCost + '%' },
      { label: 'Actual', value: Number(Actual).toFixed(2) + '%' }
    ];
  }, [profitLossTotalCosts, profitLossCharge, demoCosts]);

  /* Render */
  return (
    <CardContent>
      <Grid container justifyContent={'center'} spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" textAlign={'center'}>
            Profit Loss
          </Typography>
        </Grid>
        <Grid item xs={12} lg={5}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <InputLabel sx={{ visibility: 'hidden' }}>Item</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel sx={{ visibility: 'hidden' }}>price</InputLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {costs.map((row) => (
                  <TableRow key={row.label} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Typography variant="h6">{row.label}</Typography>
                    </TableCell>
                    <TableCell>{Number(row.value).toFixed(2)}</TableCell>
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
                  <TableCell>
                    <InputLabel sx={{ visibility: 'hidden' }}>Item</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel sx={{ visibility: 'hidden' }}>price</InputLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profitLost.map((row) => (
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

ProfitLossTable.propTypes = {
  quoteId: PropTypes.string,
  profitLossFenceItems: PropTypes.any,
  profitLossLabourItems: PropTypes.any,
  profitLossGateItems: PropTypes.any
};

export default ProfitLossTable;
