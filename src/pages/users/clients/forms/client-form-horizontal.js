import PropTypes from 'prop-types';
import { Button, CardContent, Grid, InputLabel } from '@mui/material';
import FormikTextField from 'components/FormikTextField';
import FormikSelectField from 'components/FormikSelectField';

function ClientFormHorizontal({ index, formik, suburbs, formsRef }) {
  /* Render */
  return (
    <>
      <CardContent>
        <Grid item xs={12} spacing={3} container>
          <Grid item xs={12} spacing={3} container alignItems={'center'}>
            <Grid item md={4} sm={6} xs={12}>
              <InputLabel sx={{ marginBottom: 1.5 }}>Name</InputLabel>
              <FormikTextField id="name" placeholder="Full name" formik={formik} />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <InputLabel sx={{ marginBottom: 1.5 }}>Email</InputLabel>
              <FormikTextField id="email" placeholder="Email address" formik={formik} />
            </Grid>
          </Grid>
          <Grid item xs={12} spacing={3} container alignItems={'center'}>
            <Grid item md={4} sm={6} xs={12}>
              <InputLabel sx={{ marginBottom: 1.5 }}>Address</InputLabel>
              <FormikTextField id="address" placeholder="Address" formik={formik} />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <InputLabel sx={{ marginBottom: 1.5 }}>Phone</InputLabel>
              <FormikTextField id="phone" placeholder="Phone" formik={formik} />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <InputLabel sx={{ marginBottom: 1.5 }}>Suburb</InputLabel>
              <FormikSelectField id="suburb" formik={formik} menuItems={suburbs} menuItemKey="DataId" menuItemValue="DataMainValue" />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <InputLabel sx={{ marginBottom: 1.5 }}>Attn</InputLabel>
              <FormikTextField id="attention" placeholder="Attention To" formik={formik} />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <InputLabel sx={{ marginBottom: 1.5 }}>Send To</InputLabel>
              <FormikTextField id="sendto" placeholder="Send To" formik={formik} />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Button
        ref={(element) => {
          if (element) {
            formsRef.current[index] = element;
          }
        }}
        style={{ display: 'none' }}
        variant="contained"
        type="submit"
        disabled={
          // eslint-disable-next-line
          formik.isSubmitting
        }
      ></Button>
    </>
  );
}

ClientFormHorizontal.propTypes = {
  index: PropTypes.number,
  formik: PropTypes.any,
  suburbs: PropTypes.any,
  formsRef: PropTypes.any
};

export default ClientFormHorizontal;
