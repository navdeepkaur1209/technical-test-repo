import PropTypes from 'prop-types';
import { TableRow, TableCell, Grid, IconButton } from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import FormikSelectField from 'components/FormikSelectField';

/* Component */
const ClientRequestsRow = ({ formik, index, clientRequests, helpers }) => {
  /* Render */
  return (
    <>
      {clientRequests ? (
        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell scope="row">
            <Grid item xs={12} spacing={2} container>
              <Grid item width={68}>
                <IconButton color="error" onClick={() => helpers.remove(index)}>
                  <CloseOutlined />
                </IconButton>
              </Grid>
              <Grid item width={'calc(100% - 68px)'}>
                <FormikSelectField
                  id={`clientrequests[${index}].description`}
                  formik={formik}
                  menuItems={clientRequests}
                  menuItemKey="Key"
                  menuItemValue="Value"
                />
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
};

ClientRequestsRow.propTypes = {
  formik: PropTypes.any,
  index: PropTypes.number,
  clientRequests: PropTypes.any,
  helpers: PropTypes.any
};

export default ClientRequestsRow;
