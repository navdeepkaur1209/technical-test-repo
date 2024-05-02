import { useEffect, useMemo, useState } from 'react';
import { get } from 'lodash';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { DeleteFilled, DownloadOutlined, EditFilled, PlusSquareFilled, CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

// Material
import { CardContent, Grid, InputLabel, Typography, Button } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import ListAttachments from 'graphql/quotes/ListAttachments';
import DeleteAttachment from 'graphql/quotes/DeleteAttachment';

//Child components
import AttachmentModalEdit from './attachment-modal-edit';
import AttachmentModalAdd from './attachment-modal-add';

const styleBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  border: '2px solid #ccc',
  boxShadow: 24,
  p: 4
};

const AttachmentList = ({ quoteId }) => {
  const [attachments, setAttachments] = useState([]);
  const [row, setRow] = useState();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpen(true);
    setEdit(true);
    setRow();
  };
  const handleOpenAdd = () => {
    setOpen(true);
    setEdit(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRow = (row) => {
    setRow(row);
  };

  /* GraphQL: ListAttachments */
  const { data: dataListAttachments, refetch: refetchListAttachments } = useGraphQLQuery(ListAttachments, {
    variables: { id: quoteId }
  });

  useMemo(() => {
    if (dataListAttachments && dataListAttachments.ListAttachments) {
      setAttachments(dataListAttachments.ListAttachments);
    }
  }, [dataListAttachments]);

  /* GraphQL: DeleteAttachment */
  const [mutationDeleteAttachment, { data: resultDeleteAttachment }] = useGraphQLMutation(DeleteAttachment);

  const doMutationDeleteAttachment = (attachmentId) => {
    if (attachmentId.length) {
      mutationDeleteAttachment({
        variables: {
          id: quoteId,
          attachmentId: attachmentId
        }
      });
    }
  };

  useEffect(() => {
    if (resultDeleteAttachment && resultDeleteAttachment.DeleteAttachment.Status === 'SUCCESS') {
      refetchListAttachments();
      dispatch(
        openSnackbar({
          open: true,
          message: resultDeleteAttachment.DeleteAttachment.Message,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
  }, [resultDeleteAttachment, refetchListAttachments, dispatch]);

  const doCallback = () => {
    setOpen(false);
    refetchListAttachments();
  };

  /* Render */
  return (
    <CardContent>
      <Grid container columnSpacing={3} alignItems="center" mb={4}>
        <Grid item sm={6}>
          <Typography variant="h4">Attachment list</Typography>
        </Grid>
        <Grid item sm={6} container justifyContent={'flex-end'}>
          <Button variant="contained" color="secondary" size="large" startIcon={<PlusSquareFilled />} onClick={handleOpenAdd}>
            New Attachment
          </Button>
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          <Box sx={styleBox}>
            <Grid container columnSpacing={3} alignItems="center" mb={4}>
              <Grid item sm={6}>
                {edit ? (
                  <Typography id="transition-modal-title" variant="h3" component="h2">
                    Update attachment
                  </Typography>
                ) : (
                  <Typography id="transition-modal-title" variant="h3" component="h2">
                    Add Attachment
                  </Typography>
                )}
              </Grid>
              <Grid item sm={6} container justifyContent={'flex-end'}>
                <IconButton onClick={handleClose}>
                  <CloseOutlined />
                </IconButton>
              </Grid>
            </Grid>
            {edit ? (
              <AttachmentModalEdit quoteId={quoteId} row={row} callback={doCallback} />
            ) : (
              <AttachmentModalAdd quoteId={quoteId} callback={doCallback} />
            )}
          </Box>
        </Fade>
      </Modal>
      <Grid container columnSpacing={3} rowSpacing={8}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width={75}>
                    <InputLabel>S/No.</InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel>Title</InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel>Description</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel>Type</InputLabel>
                  </TableCell>
                  <TableCell align="center">
                    <InputLabel>Created By</InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel sx={{ visibility: 'hidden' }}>Actions</InputLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attachments.map((data, key) => (
                  <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" align="center">
                      <Typography variant="h6">{key + 1}</Typography>
                    </TableCell>
                    <TableCell sx={{ paddingLeft: '12px !important' }}>{get(data, 'Title')}</TableCell>
                    <TableCell>{get(data, 'Description')}</TableCell>
                    <TableCell align="center">{get(data, 'FileExtension')}</TableCell>
                    <TableCell align="center">{get(data['User'], 'Name')}</TableCell>
                    <TableCell>
                      <IconButton color="success" sx={{ marginLeft: '0px !important' }}>
                        <Button
                          onClick={() => {
                            handleOpenEdit();
                            handleRow(data);
                          }}
                        >
                          <EditFilled />
                        </Button>
                      </IconButton>
                      <IconButton color="success" sx={{ marginLeft: '10px !important' }}>
                        <Button onClick={() => doMutationDeleteAttachment(get(data, 'AttachmentId'))}>
                          <DeleteFilled />
                        </Button>
                      </IconButton>
                      <IconButton color="success" sx={{ marginLeft: '10px !important' }}>
                        <Button type="link" target="_blank" href={get(data, 'Url')} startIcon={<DownloadOutlined />} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body1" mt={2}>
            The above table is autogenerated from the Quote template
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  );
};

AttachmentList.propTypes = {
  quoteId: PropTypes.string
};

export default AttachmentList;
