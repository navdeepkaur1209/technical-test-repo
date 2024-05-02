import PropTypes from 'prop-types';
import { Grid, IconButton } from '@mui/material';
import MainCard from 'components/MainCard';
import ClientForm from './client-form';
import { CloseOutlined } from '@ant-design/icons';

/* Component */
const Neighbour = ({ formik, index, clientList, helpers }) => {
  /* Render */
  return (
    <>
      <Grid item xs={12}>
        {/* Neighbour */}
        <MainCard
          title={`Neighbour ${index}`}
          content={false}
          secondary={
            <IconButton
              color="error"
              onClick={() => {
                helpers.remove(index);
              }}
            >
              <CloseOutlined />
            </IconButton>
          }
        >
          <ClientForm formik={formik} index={index} clientList={clientList} disabled={false} />
        </MainCard>
      </Grid>
    </>
  );
};

Neighbour.propTypes = {
  formik: PropTypes.any,
  index: PropTypes.number,
  clientList: PropTypes.any,
  helpers: PropTypes.any
};

export default Neighbour;
