import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { CardContent, Box, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import MainCard from 'components/MainCard';
import { uploadFileToS3 } from 'utils/helpers';
import { PlusSquareFilled } from '@ant-design/icons';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import ListFiles from 'graphql/quotes/ListFiles';
import GetFilesUploadPermission from 'graphql/quotes/GetFilesUploadPermission';
import DeleteFiles from 'graphql/quotes/DeleteFiles';

import imgthumbnail from 'assets/images/icons/img-thumbnail.png';

/* Static methods and values */
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: '1px solid #bfbfbf',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
}));

const ItemPhoto = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0),
  display: 'flex',
  gap: '15px',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  boxShadow: 'none',
  background: 'none'
}));

/* Component */
const PhotosTable = ({ quoteId }) => {
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const dispatch = useDispatch();
  const [deleteImg, setDeleteImg] = useState(false);
  const [open, setOpen] = useState(false);
  const [imgLightbox, setImgLightbox] = useState(null);
  const fileInputRef = useRef(null);
  /* GraphQL: ListFiles */
  const { data: dataListFiles, refetch: refetchListFiles } = useGraphQLQuery(ListFiles, { variables: { id: quoteId, fileType: 'PHOTOS' } });

  useEffect(() => {
    if (dataListFiles && dataListFiles.ListFiles && dataListFiles.ListFiles.length > 0) {
      setPhotos(dataListFiles.ListFiles);
      setDeleteImg(true);
    } else {
      const newImageUrls = [];
      for (let i = 0; i < 10; i++) {
        newImageUrls.push(imgthumbnail);
      }
      setPhotos(newImageUrls);
      setDeleteImg(false);
    }
  }, [dataListFiles]);

  const handleClickOpen = (e) => {
    setOpen(true);
    setImgLightbox(e.target);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /* GraphQL: GetFilesUploadPermission */
  const [doGetFilesUploadPermission, { data: dataGetFilesUploadPermission }] = useGraphQLLazyQuery(GetFilesUploadPermission, {
    variables: { id: quoteId, fileType: 'PHOTOS' }
  });

  useEffect(() => {
    if (dataGetFilesUploadPermission && dataGetFilesUploadPermission.GetFilesUploadPermission) {
      const { Url, Fields } = dataGetFilesUploadPermission.GetFilesUploadPermission;
      const photos = document.querySelector('#quote-site-plan-photos');
      const uploads = [];
      for (const photo of photos.files) {
        uploads.push(uploadFileToS3(Url, JSON.parse(Fields), photo));
      }

      Promise.all(uploads).then(() => {
        dispatch(
          openSnackbar({
            open: true,
            message: 'File uploaded',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        setUploading(false);
        refetchListFiles();
      });
    }
  }, [dataGetFilesUploadPermission, quoteId, dispatch, refetchListFiles]);

  const onPhotosSelected = (e) => {
    if (e.target.files.length) {
      console.log(e.target.files.length);
      setUploading(true);
      doGetFilesUploadPermission();
    }
  };

  /* GraphQL: DeleteFiles */
  const [mutationDeleteFiles, { data: resultDeleteFiles }] = useGraphQLMutation(DeleteFiles);

  const doMutationDeleteFiles = (photo) => {
    const filename = photo.substring(photo.lastIndexOf('/') + 1);
    if (filename.length) {
      mutationDeleteFiles({
        variables: {
          id: quoteId,
          fileType: 'PHOTOS',
          files: [filename]
        }
      });
    }
  };

  useEffect(() => {
    if (resultDeleteFiles && resultDeleteFiles.DeleteFiles.Status === 'SUCCESS') {
      refetchListFiles();
      dispatch(
        openSnackbar({
          open: true,
          message: resultDeleteFiles.DeleteFiles.Message,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
  }, [resultDeleteFiles, refetchListFiles, dispatch]);

  /* Render */
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MainCard content={false}>
        <CardContent>
          <Grid item xs={12} container>
            <Grid item xs={6}>
              <h2 style={{ margin: '0' }}>PHOTOS</h2>
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="secondary" startIcon={<PlusSquareFilled />} onClick={() => fileInputRef.current.click()}>
                Add Photo
              </Button>
            </Grid>
            <Grid container style={{ marginTop: '15px' }}>
              <Grid item xs={12}>
                <ItemPhoto>
                  {photos.map((imageSrc, index) =>
                    deleteImg ? (
                      <div key={index} style={{ width: 'calc(20% - 12px)', height: '100%', position: 'relative' }}>
                        <img
                          src={imageSrc}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                          aria-hidden="true"
                          onClick={handleClickOpen}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => doMutationDeleteFiles(imageSrc)}
                          style={{
                            minWidth: '20px',
                            height: '20px',
                            width: '20px',
                            margin: '0px',
                            padding: '0px',
                            position: 'absolute',
                            right: '5px',
                            top: '5px'
                          }}
                        >
                          X
                        </Button>
                      </div>
                    ) : (
                      <div key={index} style={{ width: 'calc(20% - 12px)', height: '100%', position: 'relative' }}>
                        <img key={index} src={imageSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )
                  )}
                </ItemPhoto>
              </Grid>
              <Grid item xs={12} style={{ visibility: 'hidden' }}>
                <Item>
                  <input
                    id="quote-site-plan-photos"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={onPhotosSelected}
                    disabled={uploading}
                    ref={fileInputRef}
                  />
                  <span>Click here to select or click new photos</span>
                </Item>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </MainCard>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent style={{ padding: '5px' }}>
          <img src={imgLightbox?.src} alt={imgLightbox?.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </DialogContent>
        <DialogActions style={{ padding: '5px' }}>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

PhotosTable.propTypes = {
  quoteId: PropTypes.string
};

export default PhotosTable;
