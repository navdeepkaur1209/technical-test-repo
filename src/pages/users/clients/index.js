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
import ListClients from 'graphql/clients/ListClients';

/* Static methods and values */
const formikInitialValues = {
  name: '',
  email: ''
};

const columns = [
  {
    Header: 'Client Id',
    accessor: 'ClientId'
  },
  {
    Header: 'Name',
    accessor: 'Name'
  },
  {
    Header: 'Suburb',
    accessor: 'Suburb'
  },
  {
    Header: 'Email',
    accessor: 'Email'
  },
  {
    Header: 'Phone',
    accessor: 'Phone'
  }
];

/* Component */
const Clients = () => {
  const navigate = useNavigate();
  const editClient = (id) => {
    navigate(createPathFromArray(['clients', id]));
  };

  /* GraphQL: ListClients */
  const { loading, data, refetch } = useGraphQLQuery(ListClients, { variables: { pagination: {} } });

  /* Formik submit */
  const formikSubmit = (values, actions) => {
    actions.setSubmitting(false);
    const { email: Email, name: Name } = values;
    const search = { pagination: { Filters: JSON.stringify({ Email, Name }) } };
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
                    <FormikOutlinedInput id="name" placeholder="Name" formik={props} startAdornment={<SearchOutlined />} />
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
          <Button variant="contained" href="/clients/add">
            Add new client
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ paddingLeft: '0 !important' }}>
        <MainCard content={false}>
          <ScrollX>
            {loading ? (
              'Loading...'
            ) : data && data.ListClients && data.ListClients.Clients ? (
              <PaginationTable columns={columns} data={data.ListClients.Clients} actions={{ edit: { cb: editClient, id: 'ClientId' } }} />
            ) : (
              'No clients'
            )}
          </ScrollX>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Clients;
