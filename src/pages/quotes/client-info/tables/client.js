import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import ClientForm from './client-form';

/* Component */
const Client = ({ formik, index, clientList, disabled }) => {
  /* Render */
  return (
    <>
      <Grid item xs={12}>
        <MainCard title="Client Details" content={false}>
          <ClientForm formik={formik} index={index} clientList={clientList} disabled={disabled} />
        </MainCard>
      </Grid>
    </>
  );
};

Client.propTypes = {
  formik: PropTypes.any,
  index: PropTypes.number,
  clientList: PropTypes.any,
  disabled: PropTypes.bool
};

export default Client;
