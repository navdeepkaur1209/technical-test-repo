import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CardContent, InputLabel, OutlinedInput, Box, Grid, Tab, Tabs } from '@mui/material';
import MainCard from 'components/MainCard';
import { createPathFromArray, formatDate } from 'utils/helpers';

/* Component */
const QuoteFormHeader = ({ tabValue, quoteId, quote }) => {
  const navigate = useNavigate();

  const goToTab = (tab) => {
    navigate(createPathFromArray(['quotes', quoteId, tab]));
  };

  /* Render */
  return (
    <Grid container spacing={3}>
      {quote ? (
        <Grid item xs={12}>
          <MainCard content={false}>
            <CardContent>
              <Grid item xs={12} spacing={3} container>
                <Grid item xl={9} lg={8} xs={12} spacing={3} container>
                  <Grid item md={4} sm={6} xs={12}>
                    <InputLabel sx={{ marginBottom: 1.5 }}>Full Name</InputLabel>
                    <OutlinedInput
                      fullWidth
                      placeholder={quote.Client.Name}
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#262626',
                          opacity: 1
                        }
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <InputLabel sx={{ marginBottom: 1.5 }}>Email Address</InputLabel>
                    <OutlinedInput
                      fullWidth
                      placeholder={quote.Client.Email}
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#262626'
                        }
                      }}
                      disabled
                      type="email"
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <InputLabel sx={{ marginBottom: 1.5 }}>Property Address</InputLabel>
                    <OutlinedInput
                      fullWidth
                      placeholder={quote.Client.Address}
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#262626'
                        }
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <InputLabel sx={{ marginBottom: 1.5 }}>Suburb</InputLabel>
                    <OutlinedInput
                      fullWidth
                      placeholder={quote.Client.Suburb}
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#262626'
                        }
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <InputLabel sx={{ marginBottom: 1.5 }}>Phone Number</InputLabel>
                    <OutlinedInput
                      fullWidth
                      placeholder={quote.Client.Phone}
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#262626'
                        }
                      }}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid item xl={3} lg={4} container rowSpacing={3}>
                  <Grid item xs={12}>
                    <InputLabel sx={{ marginBottom: 1.5 }}>Quote Number</InputLabel>
                    <OutlinedInput
                      fullWidth
                      placeholder={['Q', quote.QuoteNumber].join('')}
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#262626'
                        }
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel sx={{ marginBottom: 1.5 }}>Date</InputLabel>
                    <OutlinedInput
                      fullWidth
                      placeholder={formatDate(quote.QuoteDate)}
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#262626'
                        }
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id="demo-multiple-name-label" sx={{ marginBottom: 1.5 }}>
                      Created By
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      placeholder={quote.User.Name}
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#262626'
                        }
                      }}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
      ) : null}

      {/* Tabs */}
      <Grid item xs={12}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} aria-label="Quote tabs">
              <Tab label="Client Info" value="1" onClick={() => goToTab('')} />
              <Tab label="Paling" value="2" onClick={() => goToTab('main')} />
              <Tab label="Fence Pricing" value="3" onClick={() => goToTab('fence-pricing')} />
              <Tab label="Profit / Loss" value="4" onClick={() => goToTab('profit-loss')} />
              <Tab label="Site Plan" value="5" onClick={() => goToTab('site-plan')} />
              <Tab label="Review" value="6" onClick={() => goToTab('review')} />
              <Tab label="Supplier Order" value="7" onClick={() => goToTab('supplier-order')} />
              <Tab label="Fencer Job Card" value="8" onClick={() => goToTab('fencer-job-card')} />
              <Tab label="Attachments" value="9" onClick={() => goToTab('attachments')} />
            </Tabs>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

QuoteFormHeader.propTypes = {
  tabValue: PropTypes.string,
  quoteId: PropTypes.string,
  quote: PropTypes.any
};

export default QuoteFormHeader;
