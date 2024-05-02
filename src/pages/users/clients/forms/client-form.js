import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Alert } from '@mui/material';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import ClientFormVertical from './client-form-vertical';
import ClientFormHorizontal from './client-form-horizontal';
import { createPathFromArray } from 'utils/helpers';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import ListData from 'graphql/data/ListData';
import GetClient from 'graphql/clients/GetClient';
import AddClient from 'graphql/clients/AddClient';
import UpdateClient from 'graphql/clients/UpdateClient';

/* Static methods and values */
const formikValidationSchema = yup.object({
  name: yup.string().min(3, 'Name should be minimum 3 characters length').required('Name is required'),
  phone: yup.string().min(3, 'Phone should be minimum 9 numbers').required('Phone is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  suburb: yup.string().required('Suburb is required')
});

const formikInitialValues = {
  name: '',
  email: '',
  phone: '',
  suburb: '',
  address: '',
  attention: '',
  sendto: ''
};

/* Component */
function ClientForm({ index, layout, clientId, formsRef, callback }) {
  const [mutationStatus, setMutationStatus] = useState('');
  const [mutationMessage, setMutationMessage] = useState('');
  const [clientLoaded, setClientLoaded] = useState(false);
  const formikRef = useRef();
  const navigate = useNavigate();

  const cancel = () => {
    navigate(createPathFromArray(['clients']));
  };

  /* GraphQL: ListData */
  const { data: dataListData } = useGraphQLQuery(ListData, {
    variables: { datatype: 'SUBURBS', pagination: {} }
  });

  /* GraphQL: AddClient and UpdateClient */
  const [mutationAddClient, { data: resultAddClient, reset: resetAddClient }] = useGraphQLMutation(AddClient);
  const [mutationUpdateClient, { data: resultUpdateClient, reset: resetUpdateClient }] = useGraphQLMutation(UpdateClient);

  const doMutation = useCallback(
    (values) => {
      const client = {
        Name: values.name,
        Email: values.email,
        Address: values.address,
        Suburb: values.suburb,
        Phone: values.phone,
        Attention: values.attention,
        SendTo: values.sendto
      };

      if (clientId) {
        mutationUpdateClient({
          variables: {
            id: clientId,
            client
          }
        });
      } else {
        mutationAddClient({
          variables: {
            client
          }
        });
      }
    },
    [clientId, mutationAddClient, mutationUpdateClient]
  );

  const doPostMutation = useCallback(
    (mutationResult) => {
      setMutationStatus(mutationResult.Status);
      setMutationMessage(mutationResult.Message);
      callback(mutationResult);
    },
    [callback]
  );

  useEffect(() => {
    if (!clientId && resultAddClient && resultAddClient.AddClient) {
      doPostMutation(resultAddClient.AddClient);
      resetAddClient();
    } else if (clientId && resultUpdateClient && resultUpdateClient.UpdateClient) {
      doPostMutation(resultUpdateClient.UpdateClient);
      resetUpdateClient();
    }
  }, [clientId, resultAddClient, resultUpdateClient, resetAddClient, resetUpdateClient, doPostMutation]);

  /* GraphQL: GetClient */
  const [doGetClient, { data: dataGetClient }] = useGraphQLLazyQuery(GetClient, { variables: { id: clientId } });

  useEffect(() => {
    if (!clientLoaded && dataGetClient && dataGetClient.GetClient) {
      formikRef.current.setFieldValue('name', dataGetClient.GetClient.Name);
      formikRef.current.setFieldValue('email', dataGetClient.GetClient.Email);
      formikRef.current.setFieldValue('phone', dataGetClient.GetClient.Phone);
      formikRef.current.setFieldValue('suburb', dataGetClient.GetClient.Suburb);
      formikRef.current.setFieldValue('address', dataGetClient.GetClient.Address);
      formikRef.current.setFieldValue('attention', dataGetClient.GetClient.Attention);
      formikRef.current.setFieldValue('sento', dataGetClient.GetClient.SendTo);
      setClientLoaded(true);
    }
  }, [dataGetClient, clientLoaded, setClientLoaded, formikRef]);

  // GetClient needs to be called only after ListData is loaded, so that results of GetClient can set correct suburbs in the form.
  useEffect(() => {
    if (dataListData && dataListData.ListData && clientId) {
      doGetClient();
    }
  }, [clientId, dataListData, doGetClient]);

  /* Formik submit */
  const formikSubmit = (values) => {
    setMutationStatus('');
    setMutationMessage('');
    doMutation(values);
  };

  /* Render */
  return (
    <Formik
      innerRef={formikRef}
      initialValues={formikInitialValues}
      validationSchema={formikValidationSchema}
      onSubmit={async (values) => {
        formikSubmit(values);
      }}
    >
      {(props) => (
        <Form>
          <Grid container spacing={2} alignItems="center">
            {mutationStatus === 'FAILED' && <Alert severity="error">{mutationMessage}</Alert>}
          </Grid>
          {layout == 'vertical' ? (
            <ClientFormVertical
              clientId={clientId}
              formik={props}
              suburbs={dataListData && dataListData.ListData ? dataListData.ListData.Data : null}
              cancel={cancel}
            />
          ) : (
            <ClientFormHorizontal
              index={index}
              formik={props}
              suburbs={dataListData && dataListData.ListData ? dataListData.ListData.Data : null}
              formsRef={formsRef}
              callback={callback}
            />
          )}
        </Form>
      )}
    </Formik>
  );
}

ClientForm.propTypes = {
  index: PropTypes.number,
  layout: PropTypes.string,
  clientId: PropTypes.string,
  formsRef: PropTypes.any,
  callback: PropTypes.any
};

export default ClientForm;
