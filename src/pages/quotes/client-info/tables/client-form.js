import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, CardContent, Grid, InputLabel, TextField } from '@mui/material';
import FormikTextField from 'components/FormikTextField';
import { getIn, useFormikContext } from 'formik';

function ClientForm({ formik, index, clientList, disabled }) {
  const { setFieldValue } = useFormikContext();
  const clientOptionItem = useMemo(() => {
    const item = getIn(formik.values, `clients[${index}]`);
    if (item.ClientId.length) {
      const option = clientList.find((c) => c.ClientId == item.ClientId);
      if (option) {
        return { value: option };
      }
    }
    return { value: null };
  }, [index, formik.values, clientList]);

  /* Render */
  return (
    <CardContent>
      <Grid item xs={12} spacing={3} container>
        <Grid item xs={12} spacing={3} container alignItems={'center'}>
          <Grid item md={4} sm={6} xs={12}>
            <InputLabel sx={{ marginBottom: 1.5 }}>Name</InputLabel>
            <Autocomplete
              disablePortal
              {...clientOptionItem}
              options={clientList}
              isOptionEqualToValue={(option, value) => option.ClientId == value.ClientId}
              onChange={(e, value) => {
                ['ClientId', 'Email', 'Address', 'Phone', 'Suburb', 'Attention', 'SendTo'].map((f) => {
                  setFieldValue(
                    `clients[${index}].${f}`,
                    [value && Object.prototype.hasOwnProperty.call(value, f) ? value[f] : '', ''].join('')
                  );
                });
              }}
              disabled={disabled ? true : false}
              getOptionKey={(option) => option.ClientId}
              getOptionLabel={(option) => option.Name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(getIn(formik.errors, `clients[${index}]`)) && Boolean(getIn(formik.touched, `clients[${index}]`))}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <InputLabel sx={{ marginBottom: 1.5 }}>Email</InputLabel>
            <FormikTextField id={`clients[${index}].Email`} placeholder="Email address" formik={formik} disabled />
          </Grid>
        </Grid>
        <Grid item xs={12} spacing={3} container alignItems={'center'}>
          <Grid item md={4} sm={6} xs={12}>
            <InputLabel sx={{ marginBottom: 1.5 }}>Address</InputLabel>
            <FormikTextField id={`clients[${index}].Address`} placeholder="Address" formik={formik} disabled />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <InputLabel sx={{ marginBottom: 1.5 }}>Phone</InputLabel>
            <FormikTextField id={`clients[${index}].Phone`} placeholder="Phone" formik={formik} disabled />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <InputLabel sx={{ marginBottom: 1.5 }}>Suburb</InputLabel>
            <FormikTextField id={`clients[${index}].Suburb`} placeholder="Suburb" formik={formik} disabled />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <InputLabel sx={{ marginBottom: 1.5 }}>Attn</InputLabel>
            <FormikTextField id={`clients[${index}].Attention`} placeholder="Attention To" formik={formik} disabled />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <InputLabel sx={{ marginBottom: 1.5 }}>Send To</InputLabel>
            <FormikTextField id={`clients[${index}].Sendto`} placeholder="Send To" formik={formik} disabled />
          </Grid>
          <FormikTextField id={`clients[${index}].ClientId`} formik={formik} disabled sx={{ visibility: 'hidden' }} />
        </Grid>
      </Grid>
    </CardContent>
  );
}

ClientForm.propTypes = {
  formik: PropTypes.any,
  index: PropTypes.number,
  clientList: PropTypes.any,
  disabled: PropTypes.bool
};

export default ClientForm;
