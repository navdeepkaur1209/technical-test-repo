import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CloudUploadOutlined } from '@ant-design/icons';
import TextField from '@mui/material/TextField';
import { Grid, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { uploadFileToS3 } from 'utils/helpers';

// GraphQL.
import AddAttachment from 'graphql/quotes/AddAttachment';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import GetAttachmentUploadPermission from 'graphql/quotes/GetAttachmentUploadPermission';

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
  const [file, setFile] = useState();
  const formikRef = useRef();
  console.log(quoteId);

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      setFileSelected(true);
      setFile(e.target.files[0]);
    }
  };

  const [mutationAddAttachment, { data: resultAddAttachment }] = useGraphQLMutation(AddAttachment);

  const [getUploadPermissions, { data: resultUploadPermissions }] = useGraphQLLazyQuery(GetAttachmentUploadPermission, {
    variables: { id: quoteId, attachmentId: '' }
  });

  useEffect(() => {
    if (resultUploadPermissions && resultUploadPermissions.GetAttachmentUploadPermission) {
      const data = resultUploadPermissions.GetAttachmentUploadPermission;
      if (data.Url) {
        uploadFileToS3(data.Url, JSON.parse(data.Fields), file);
        callback(true);
      }
    }
  }, [resultUploadPermissions, file, callback]);

  useEffect(() => {
    if (resultAddAttachment && resultAddAttachment.AddAttachment) {
      if (resultAddAttachment.AddAttachment.Status === 'SUCCESS') {
        getUploadPermissions({
          variables: {
            id: quoteId,
            attachmentId: resultAddAttachment.AddAttachment.Id
          }
        });
      }
    }
  }, [resultAddAttachment, getUploadPermissions, quoteId]);

  const handleSubmit = (values) => {
    mutationAddAttachment({
      variables: {
        id: quoteId,
        attachment: {
          FileExtension: file?.name.split('.').pop(),
          Title: values.title,
          Description: values.description
        }
      }
    });
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={formikInitialValues}
      enableReinitialize
      validationSchema={formikValidationSchema}
      onSubmit={async (values) => {
        handleSubmit(values);
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
