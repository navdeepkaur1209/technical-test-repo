import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import ClientForm from './forms/client-form';
import { createPathFromArray } from 'utils/helpers';

function Client() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clientId } = useParams();

  const doCallback = (mutationResult) => {
    if (mutationResult && mutationResult.Status === 'SUCCESS') {
      dispatch(
        openSnackbar({
          open: true,
          message: mutationResult.Message,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      navigate(createPathFromArray(['clients']));
    }
  };

  /* Render */
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6}>
        <MainCard title={clientId ? 'Update client' : 'Add new client'}>
          <ClientForm layout="vertical" clientId={clientId} callback={doCallback} />
        </MainCard>
      </Grid>
    </Grid>
  );
}

export default Client;
