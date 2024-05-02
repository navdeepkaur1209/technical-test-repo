import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CloudUploadOutlined } from '@ant-design/icons';

// Material
import TextField from '@mui/material/TextField';
import { Grid, Button } from '@mui/material';

// Formik
import { Formik, Form } from 'formik';
import * as yup from 'yup';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import GetAttachment from 'graphql/quotes/GetAttachment';

/* Static methods and values */
const formikValidationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const formikInitialValues = {
  title: '',
  description: ''
};

const AttachmentModalEdit = ({ quoteId, row, callback }) => {
  const formikRef = useRef();
  const [files, setFiles] = useState('');

  /* GraphQL: GetAttachment */
  const { data: dataGetAttachment } = useGraphQLQuery(GetAttachment, { variables: { id: quoteId, attachmentId: row['AttachmentId'] } });

  useEffect(() => {
    if (dataGetAttachment && dataGetAttachment.GetAttachment) {
      const data = dataGetAttachment.GetAttachment;
      setFiles(data['Url']);
      if (data) {
        formikRef.current.setFieldValue('title', data['Title']);
        formikRef.current.setFieldValue('description', data['Description']);
      }
    }
  }, [dataGetAttachment]);

  /* Render */
  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={formikInitialValues}
        enableReinitialize
        validationSchema={formikValidationSchema}
        onSubmit={async (values) => {
          // Your form submit logic can be added here if needed
          callback(true);
          console.log(values);
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <Grid container spacing={2} alignItems="center">
              {/* Optional: Show a message based on mutationStatus and mutationMessage */}
              {/* {mutationStatus === 'FAILED' && <Alert severity="error">{mutationMessage}</Alert>} */}
            </Grid>
            <Grid container columnSpacing={3} alignItems="center" mb={4} style={{ display: 'block' }}>
              <Grid item sm={12} xs={12} md={12} style={{ width: '100%', maxWidth: '100%' }}>
                <TextField
                  required
                  label="Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ width: '100%', maxWidth: '100%' }}
                />
              </Grid>
            </Grid>
            <Grid container columnSpacing={3} alignItems="center" mb={4} style={{ display: 'block' }}>
              <Grid item sm={12} xs={12} md={12} style={{ width: '100%', maxWidth: '100%' }}>
                <TextField
                  required
                  label="Description"
                  name="description"
                  multiline
                  value={values.description}
                  rows={8}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ width: '100%', maxWidth: '100%' }}
                />
              </Grid>
            </Grid>
            <Grid container columnSpacing={3} alignItems="center" mb={4}>
              <Grid item sm={12}>
                {/* Optional: Add file input for uploading */}
                {/* <input type="file" id="quote-attachment-file" disabled={uploading} onChange={handleFileChange} /> */}
              </Grid>
              <Grid item xs={12}>
                {files ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h5>{files.split('/').pop()}</h5>
                  </div>
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
            <Grid container columnSpacing={30} alignItems="center">
              <Grid item sm={12} container justifyContent={'flex-end'}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="large"
                  startIcon={<CloudUploadOutlined />}
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

AttachmentModalEdit.propTypes = {
  quoteId: PropTypes.string,
  row: PropTypes.object,
  callback: PropTypes.any
};

export default AttachmentModalEdit;
