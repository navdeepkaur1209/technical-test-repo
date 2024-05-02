import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { SearchOutlined } from '@ant-design/icons';
import PaginationTable from 'components/PaginationTable';
import FormikOutlinedInput from 'components/FormikOutlinedInput';
import { Formik, Form } from 'formik';
import { createPathFromArray } from 'utils/helpers';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import ListQuotes from 'graphql/quotes/ListQuotes';

/* Static methods and values */
const formikInitialValues = {
  number: '',
  email: ''
};

const columns = [
  {
    Header: 'Quote Id',
    accessor: 'QuoteId'
  },
  {
    Header: 'Quote Number',
    accessor: 'QuoteNumber'
  },
  {
    Header: 'Client',
    accessor: 'Client.Name'
  },
  {
    Header: 'Address',
    accessor: 'Client.Address'
  },
  {
    Header: 'Email',
    accessor: 'Client.Email'
  },
  {
    Header: 'Phone',
    accessor: 'Client.Phone'
  },
  {
    Header: 'STATUS',
    accessor: 'QuoteStatus'
  }
];

const Jobs = () => {
  const navigate = useNavigate();
  const editQuote = (id) => {
    navigate(createPathFromArray(['quotes', id]));
  };

  /* GraphQL: ListQuotes */
  const { loading, data, refetch } = useGraphQLQuery(ListQuotes, { variables: { pagination: {} } });

  /* Formik submit */
  const formikSubmit = (values, actions) => {
    actions.setSubmitting(false);
    const { number: QuoteNumber, email: Email } = values;
    const search = { pagination: { Filters: JSON.stringify({ Email, QuoteNumber }) } };
    refetch(search);
  };

  /* Render */
  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12} container justifyContent={'space-between'} alignItems={'center'} rowSpacing={3}>
        <Formik initialValues={formikInitialValues} onSubmit={(values, actions) => formikSubmit(values, actions)}>
          {(props) => (
            <Grid item lg={6} sm={8}>
              <Form>
                <Grid item xs={12} container alignItems={'center'} spacing={3}>
                  <Grid item sm={5} xs={12}>
                    <FormikOutlinedInput id="number" placeholder="Quote number" formik={props} startAdornment={<SearchOutlined />} />
                  </Grid>
                  <Grid item sm={5} xs={12}>
                    <FormikOutlinedInput id="email" placeholder="Email" formik={props} startAdornment={<SearchOutlined />} />
                  </Grid>
                  <Grid item sm={2} xs={12}>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      disabled={
                        // eslint-disable-next-line
                      props.isSubmitting
                      }
                    >
                      Filter
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Grid>
          )}
        </Formik>
        <Grid item sm={'auto'} xs={12}>
          <Button variant="contained" href="/quotes/add">
            Add new quote
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ paddingLeft: '0 !important' }}>
        <MainCard content={false}>
          <ScrollX>
            {loading ? (
              'Loading...'
            ) : data && data.ListQuotes && data.ListQuotes.Quotes ? (
              <PaginationTable columns={columns} data={data.ListQuotes.Quotes} actions={{ edit: { cb: editQuote, id: 'QuoteId' } }} />
            ) : (
              'No quotes'
            )}
          </ScrollX>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Jobs;
