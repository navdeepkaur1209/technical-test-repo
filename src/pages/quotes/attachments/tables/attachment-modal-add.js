import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { CloudUploadOutlined } from '@ant-design/icons';
import TextField from '@mui/material/TextField';
import { Grid, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

// GraphQL.
// import AddAttachment from 'graphql/quotes/AddAttachment';
// import useGraphQLMutation from 'hooks/useGraphQLMutation';
// import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
// import GetAttachmentUploadPermission from 'graphql/quotes/GetAttachmentUploadPermission';

const formikValidationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const formikInitialValues = {
  title: '',
  description: ''
};

const AttachmentModalAdd = ({ quoteId, callback }) => {
  const [fileSelected, setFileSelected] = useState(false);
  const formikRef = useRef();
  console.log(quoteId);

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      setFileSelected(true);
    }
  };

  return (
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
          <Grid container spacing={2} alignItems="center"></Grid>
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
              <input type="file" id="quote-attachment-file" onChange={handleFileChange} />
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
                disabled={isSubmitting || !fileSelected}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

AttachmentModalAdd.propTypes = {
  quoteId: PropTypes.string,
  callback: PropTypes.any
};

export default AttachmentModalAdd;
