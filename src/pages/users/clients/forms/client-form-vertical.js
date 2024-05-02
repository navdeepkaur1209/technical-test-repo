import PropTypes from 'prop-types';
import { Grid, Button, InputLabel } from '@mui/material';
import FormikTextField from 'components/FormikTextField';
import FormikSelectField from 'components/FormikSelectField';

function ClientFormVertical({ clientId, formik, suburbs, cancel }) {
  /* Render */
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <InputLabel>Name</InputLabel>
        <FormikTextField id="name" placeholder="Full name" formik={formik} />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Email</InputLabel>
        <FormikTextField id="email" placeholder="Email address" formik={formik} />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Phone</InputLabel>
        <FormikTextField id="phone" placeholder="Phone" formik={formik} />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Suburb</InputLabel>
        <FormikSelectField id="suburb" formik={formik} menuItems={suburbs} menuItemKey="DataId" menuItemValue="DataMainValue" />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Address</InputLabel>
        <FormikTextField id="address" placeholder="Address" formik={formik} />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Attention To</InputLabel>
        <FormikTextField id="attention" placeholder="Attention To" formik={formik} />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Send To</InputLabel>
        <FormikTextField id="sendto" placeholder="Send To" formik={formik} />
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
        <Button
          color="secondary"
          variant="contained"
          onClick={cancel}
          sx={{ mr: 2 }}
          disabled={
            // eslint-disable-next-line
            formik.isSubmitting
          }
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={
            // eslint-disable-next-line
            formik.isSubmitting
          }
        >
          {clientId ? 'Update' : 'Add'}
        </Button>
      </Grid>
    </Grid>
  );
}

ClientFormVertical.propTypes = {
  clientId: PropTypes.string,
  formik: PropTypes.any,
  suburbs: PropTypes.any,
  cancel: PropTypes.any
};

export default ClientFormVertical;
