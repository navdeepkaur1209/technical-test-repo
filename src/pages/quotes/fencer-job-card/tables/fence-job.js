import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { CardContent, Grid, InputLabel, Typography } from '@mui/material';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import GetJobCard from 'graphql/quotes/GetJobCard';
import GetQuotePdfLink from 'graphql/quotes/GetQuotePdfLink';

const FenceJobTable = ({ quoteId, reload }) => {
  const [jobCard, setJobCard] = useState([]);

  /* GraphQL: GetJobCard */
  const {
    loading: loadingGetJobCard,
    data: dataGetJobCard,
    refetch: refetchGetJobCard
  } = useGraphQLQuery(GetJobCard, {
    variables: { id: quoteId }
  });

  useEffect(() => {
    if (dataGetJobCard && dataGetJobCard.GetJobCard) {
      const jobs = JSON.parse(dataGetJobCard.GetJobCard.QuoteDetails);
      if (jobs && jobs.length) {
        setJobCard(jobs);
      }
    }
  }, [dataGetJobCard]);

  /* GraphQL: GetQuotePdfLink */
  const [doGetQuotePdfLink, { data: dataGetQuotePdfLink }] = useGraphQLLazyQuery(GetQuotePdfLink, {
    variables: { id: quoteId, filetype: 'FencerJobCard' }
  });

  useEffect(() => {
    if (dataGetQuotePdfLink && dataGetQuotePdfLink.GetQuotePdfLink) {
      if (dataGetQuotePdfLink.GetQuotePdfLink.Url) {
        window.open(dataGetQuotePdfLink.GetQuotePdfLink.Url, '_blank', 'noreferrer');
      }
    }
  }, [dataGetQuotePdfLink]);

  useEffect(() => {
    refetchGetJobCard();
  }, [refetchGetJobCard, reload]);

  const downloadFencerJobCard = () => {
    doGetQuotePdfLink();
  };

  /* Render */
  return (
    <CardContent>
      <Grid container columnSpacing={3} rowSpacing={8}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>
                    <InputLabel sx={{ visibility: 'hidden' }}>PRODUCT</InputLabel>
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    <InputLabel>Contractor</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel>Employee</InputLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableHead>
                <TableRow>
                  <TableCell width={75}>
                    <InputLabel>S/No.</InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel>PRODUCT</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel>QTY</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel>COST</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel>TOTAL</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel>Exc GST & Super</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel>Exc Super</InputLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingGetJobCard ? (
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" align="center">
                      <Typography variant="h6">Loading...</Typography>
                    </TableCell>
                  </TableRow>
                ) : jobCard.length ? (
                  jobCard.map((job, idx) => (
                    <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" align="center">
                        <Typography variant="h6">{idx + 1}</Typography>
                      </TableCell>
                      <TableCell sx={{ paddingLeft: '12px !important' }}>{job.product}</TableCell>
                      <TableCell align="center">{job.qty}</TableCell>
                      <TableCell align="center">{Number(job.cost).toFixed(2)}</TableCell>
                      <TableCell align="center">{Number(job.total).toFixed(2)}</TableCell>
                      <TableCell align="center">{Number(job.contractor).toFixed(2)}</TableCell>
                      <TableCell align="center">{Number(job.employee).toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" align="center">
                      <Typography variant="h6">No job card</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body1" mt={2}>
            Job Card PDF must be printed on paper. Issuing the Fencer an electronoc copy of the PDF will expose customer pricing to the
            Fencer.
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ paddingTop: '15px !important', textAlign: 'right' }}>
          {loadingGetJobCard ? null : jobCard.length ? (
            <Button variant="contained" color="primary" size="large" onClick={() => downloadFencerJobCard()}>
              Download Fencer JOB CARD
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </CardContent>
  );
};

FenceJobTable.propTypes = {
  quoteId: PropTypes.string,
  reload: PropTypes.number
};

export default FenceJobTable;
