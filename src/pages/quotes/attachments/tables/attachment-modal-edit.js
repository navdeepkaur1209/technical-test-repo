import { useState, useRef, useEffect, useCallback } from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { CloudUploadOutlined } from '@ant-design/icons';
import { uploadFileToS3 } from 'utils/helpers';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// Material
import TextField from '@mui/material/TextField';
import { Grid, Button, Alert } from '@mui/material';

// Formik
import { Formik, Form } from 'formik';
import * as yup from 'yup';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import GetAttachment from 'graphql/quotes/GetAttachment';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
//import ListFiles from 'graphql/quotes/ListFiles';
import UpdateAttachment from 'graphql/quotes/UpdateAttachment';
// import DeleteFiles from 'graphql/quotes/DeleteFiles';
import GetAttachmentUploadPermission from 'graphql/quotes/GetAttachmentUploadPermission';

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
  const [uploading, setUploading] = useState(false);
  const formikRef = useRef();
  const dispatch = useDispatch();
  const [files, setFiles] = useState();
  const [fileType, setFileType] = useState();
  const [mutationStatus, setMutationStatus] = useState('');
  const [mutationMessage, setMutationMessage] = useState('');

  /* GraphQL: GetAttachmentUploadPermission */
  const [doGetAttachmentUploadPermission, { data: dataGetAttachmentUploadPermission }] = useGraphQLLazyQuery(
    GetAttachmentUploadPermission,
    {
      variables: { id: quoteId, attachmentId: row['AttachmentId'] }
    }
  );

  const doPostMutation = useCallback(() => {
    callback(true);
  }, [callback]);

  useEffect(() => {
    if (dataGetAttachmentUploadPermission && dataGetAttachmentUploadPermission.GetAttachmentUploadPermission) {
      const { Url, Fields } = dataGetAttachmentUploadPermission.GetAttachmentUploadPermission;
      const files = document.querySelector('#quote-attachment-file');
      const uploads = [];
      for (const file of files.files) {
        uploads.push(uploadFileToS3(Url, JSON.parse(Fields), file));
      }
      doPostMutation(true);
    }
  }, [dataGetAttachmentUploadPermission, quoteId, dispatch, doPostMutation]);

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

  /* GraphQL: UpdateAttachment */
  const [mutationUpdateAttachment, { data: resultUpdateAttachment, reset: resetUpdateAttachment }] = useGraphQLMutation(UpdateAttachment);

  const doUpdateAttachment = useCallback(
    (values) => {
      const attachment = {
        FileExtension: fileType,
        Title: values.title,
        Description: values.description
      };

      if (!isEmpty(row)) {
        mutationUpdateAttachment({
          variables: {
            id: quoteId,
            attachmentId: row['AttachmentId'],
            attachment: attachment
          }
        });
      }
    },
    [row, quoteId, mutationUpdateAttachment, fileType]
  );

  useEffect(() => {
    if (row && resultUpdateAttachment && resultUpdateAttachment.UpdateAttachment) {
      if (resultUpdateAttachment.UpdateAttachment.Status === 'SUCCESS') {
        doGetAttachmentUploadPermission();
        dispatch(
          openSnackbar({
            open: true,
            message: resultUpdateAttachment.UpdateAttachment.Message,
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
      }
      resetUpdateAttachment();
    }
  }, [row, resultUpdateAttachment, resetUpdateAttachment, dispatch, doGetAttachmentUploadPermission]);

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      setUploading(true);
      var files = e.target.files;
      setFileType(files[0].type.split('/').pop());
    }
  };

  /* Formik submit */
  const formikSubmit = (values) => {
    setMutationStatus('');
    setMutationMessage('');
    doUpdateAttachment(values);
  };

  /* Render */
  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={formikInitialValues}
        enableReinitialize
        validationSchema={formikValidationSchema}
        onSubmit={async (values) => {
          formikSubmit(values);
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <Grid container spacing={2} alignItems="center">
              {mutationStatus === 'FAILED' && <Alert severity="error">{mutationMessage}</Alert>}
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
                <input type="file" id="quote-attachment-file" disabled={uploading} onChange={handleFileChange} />
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
