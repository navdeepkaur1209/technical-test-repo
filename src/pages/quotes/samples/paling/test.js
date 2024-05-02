import { CardContent, Grid, TextField, InputLabel, Button, MenuItem } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import MainCard from 'components/MainCard';
import { Formik, Form, FieldArray, getIn } from 'formik';
import * as yup from 'yup';

/* eslint-disable */
/* Static methods and values */
const formikInitialValues = {
  additionalworks: [ {
    description: '',
    meters: 0
  }, {
    description: 'BBB BBB',
    meters: 20
  }]
};

const formikValidationSchema = yup.object().shape({
  additionalworks: yup.array()
    .of(yup.object().shape({
      description: yup.string().required('Description is required'),
      meters: yup.number().min(1, 'Min value 1').max(100, 'Max value 100').required('Height is required between 1 and 100')
    }))
});

const menuItems = [
  { key: 'aaa', value: 'AAA AAA'},
  { key: 'bbb', value: 'BBB BBB'},
  { key: 'ccc', value: 'CCC CCC'},
  { key: 'ddd', value: 'DDD DDD'}
];

/* Component */
const Testing = () => {
  /* Render */
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={12}>
            <MainCard content={false}>
              <CardContent>
                <Formik
                  initialValues={formikInitialValues}
                  validationSchema={formikValidationSchema}
                  onSubmit={async (values) => {
                    console.log(values);
                  }}
                >
                  {(props) => (
                    <Form>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">
                              <InputLabel>DESCRIPTION</InputLabel>
                            </TableCell>
                            <TableCell align="center">
                              <InputLabel>METRES</InputLabel>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <FieldArray
                            name="additionalworks"
                            render={(arrayHelpers) => (<>
                              {props.values.additionalworks && props.values.additionalworks.length > 0 ? (
                                props.values.additionalworks.map((additionalwork, index) => {
                                  //const descriptionId = `additionalworks.${index}.description`;
                                  const metersId = `additionalworks.${index}.meters`;
                                  //const descriptionError = Boolean(getIn(props.errors, descriptionId)) && getIn(props.touched, descriptionId);
                                  //const descriptionMessage = getIn(props.errors, descriptionId) && getIn(props.touched, descriptionId) ? getIn(props.errors, descriptionId) : null;
                                  const metersError = Boolean(getIn(props.errors, metersId)) && getIn(props.touched, metersId);
                                  const metersMessage = getIn(props.errors, metersId) && getIn(props.touched, metersId) ? getIn(props.errors, metersId) : null;

                                  return (
                                    <TableRow key={`additionalworks${index}`}>
                                      <TableCell align="left">
                                        <TextField
                                          fullWidth
                                          id={`additionalworks.${index}.description`}
                                          name={`additionalworks.${index}.description`}
                                          value={additionalwork.description == '' ? '--select--' : additionalwork.description}
                                          select
                                          onChange={props.handleChange}
                                          onBlur={props.handleBlur}
                                          error={Boolean(getIn(props.errors, `additionalworks.${index}.description`)) && getIn(props.touched, `additionalworks.${index}.description`)}
                                          helperText={getIn(props.errors, `additionalworks.${index}.description`) && getIn(props.touched, `additionalworks.${index}.description`) ? getIn(props.errors, `additionalworks.${index}.description`) : null}
                                        >
                                          <MenuItem key="0" value={'--select--'} disabled>
                                            -- Select --
                                          </MenuItem>
                                          {menuItems
                                            ? menuItems.map((menu) => (
                                                <MenuItem key={menu.key} value={menu.value}>
                                                  {menu.value}
                                                </MenuItem>
                                              ))
                                            : null}
                                        </TextField>
                                      </TableCell>
                                      <TableCell align="left">
                                        <TextField                                      
                                          fullWidth
                                          id={`additionalworks.${index}.meters`}
                                          name={`additionalworks.${index}.meters`}
                                          value={additionalwork.meters}
                                          onChange={props.handleChange}
                                          onBlur={props.handleBlur}
                                          error={metersError}
                                          helperText={metersMessage}
                                        ></TextField>
                                      </TableCell>
                                      <TableCell align="left">
                                        <Button variant="contained" color="secondary" onClick={() => arrayHelpers.remove(index) }>
                                          REMOVE
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  );
                                })
                              ) : null}
                            </>)}
                          />
                          <TableRow>
                            <TableCell align="left">
                              <Grid item xs={12} justifyContent={'end'} sx={{ display: 'flex' }}>
                                <Button variant="contained" color="secondary" type="submit">
                                  SAVE
                                </Button>
                              </Grid>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Testing;
