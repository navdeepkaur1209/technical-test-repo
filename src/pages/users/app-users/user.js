import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, InputLabel, Alert } from '@mui/material';
import MainCard from 'components/MainCard';
import FormikTextField from 'components/FormikTextField';
import FormikSelectField from 'components/FormikSelectField';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { createPathFromArray } from 'utils/helpers';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import ListUserRoles from 'graphql/users/ListUserRoles';
import AddUser from 'graphql/users/AddUser';

/* Static methods and values */
const formikValidationErrorMessage = (str) => {
  return `Your password must have at least 1 ${str} character`;
};

const formikValidationSchema = yup.object({
  name: yup.string().min(3, 'Name should be minimum 3 characters length').required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  role: yup.string().required('Role is required'),
  password: yup
    .string()
    .min(12, 'Password should be minimum 12 characters length')
    .required('Password is required')
    .matches(/[0-9]/, formikValidationErrorMessage('digit'))
    .matches(/[a-z]/, formikValidationErrorMessage('lowercase'))
    .matches(/[A-Z]/, formikValidationErrorMessage('uppercase'))
    .matches(/[`~!@#$%^&*()\-_=+[{\]}|;:'",<.>/?]/, formikValidationErrorMessage('special'))
});

const formikInitialValues = {
  name: '',
  email: '',
  password: '',
  role: ''
};

/* Component */
function AppUserForm() {
  const [mutationStatus, setMutationStatus] = useState('');
  const [mutationMessage, setMutationMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* GraphQL: LoadUserRoles */
  const { loading, data } = useGraphQLQuery(ListUserRoles);

  /* GraphQL: AddUser */
  const [mutation, { data: result }] = useGraphQLMutation(AddUser);
  const doMutation = (values) => {
    mutation({
      variables: values
    });
  };

  useEffect(() => {
    if (result && result.AddUser) {
      setMutationStatus(result.AddUser.Status);
      setMutationMessage(result.AddUser.Message);

      if (result.AddUser.Status === 'SUCCESS') {
        dispatch(
          openSnackbar({
            open: true,
            message: result.AddUser.Message,
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        navigate(createPathFromArray(['app-users']));
      }
    }
  }, [result, dispatch, navigate]);

  /* Formik submit */
  const formikSubmit = (values, actions) => {
    actions.setSubmitting(true);
    setMutationStatus('');
    setMutationMessage('');
    doMutation(values);
  };

  /* Render */
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6}>
        <MainCard title="Add new user">
          <Formik
            initialValues={formikInitialValues}
            validationSchema={formikValidationSchema}
            onSubmit={(values, actions) => formikSubmit(values, actions)}
          >
            {(props) => (
              <Form>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    {mutationStatus === 'FAILED' && <Alert severity="error">{mutationMessage}</Alert>}
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Name</InputLabel>
                    <FormikTextField id="name" placeholder="Full name of user" formik={props} />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Email</InputLabel>
                    <FormikTextField id="email" placeholder="User email address" formik={props} />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Password</InputLabel>
                    <FormikTextField id="password" placeholder="Login password" formik={props} />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Role</InputLabel>
                    <FormikSelectField
                      id="role"
                      formik={props}
                      menuItems={!loading && data ? data.ListUserRoles : null}
                      menuItemKey="Role"
                    />
                  </Grid>
                  <Grid item xs={12} container justifyContent="flex-end">
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => navigate(createPathFromArray(['app-users']))}
                      sx={{ mr: 2 }}
                      disabled={
                        // eslint-disable-next-line
                        props.isSubmitting
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={
                        // eslint-disable-next-line
                        props.isSubmitting
                      }
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </MainCard>
      </Grid>
    </Grid>
  );
}

export default AppUserForm;
