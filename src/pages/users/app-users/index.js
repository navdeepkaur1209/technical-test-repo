import { useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import PaginationTable from 'components/PaginationTable';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { createPathFromArray } from 'utils/helpers';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import ListUsers from 'graphql/users/ListUsers';
import DeleteUser from 'graphql/users/DeleteUser';

/* Static methods and values */
const columns = [
  {
    Header: 'Name',
    accessor: 'Name'
  },
  {
    Header: 'Email',
    accessor: 'Email'
  },
  {
    Header: 'Role',
    accessor: 'Role'
  }
];

/* Component */
function AppUsers() {
  const dispatch = useDispatch();

  /* GraphQL: ListUsers */
  const { loading, data, refetch } = useGraphQLQuery(ListUsers);

  /* GraphQL: DeleteUser */
  const [mutation, { data: result }] = useGraphQLMutation(DeleteUser);
  const doMutation = (email) => {
    mutation({
      variables: { email: email }
    });
  };

  useEffect(() => {
    if (result && result.DeleteUser) {
      if (result.DeleteUser.Status === 'SUCCESS') {
        dispatch(
          openSnackbar({
            open: true,
            message: result.DeleteUser.Message,
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        refetch();
      }
    }
  }, [result, dispatch, refetch]);

  /* Render */
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} container justifyContent="flex-end">
        <Button variant="contained" href={createPathFromArray(['app-users', 'add'])}>
          Add new user
        </Button>
      </Grid>
      <Grid item xs={12}>
        <MainCard content={false}>
          <ScrollX>
            {loading ? (
              'Loading...'
            ) : data && data.ListUsers && data.ListUsers.Users ? (
              <PaginationTable columns={columns} data={data.ListUsers.Users} actions={{ delete: { cb: doMutation, id: 'Email' } }} />
            ) : (
              'No users'
            )}
          </ScrollX>
        </MainCard>
      </Grid>
    </Grid>
  );
}

export default AppUsers;
