import { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Grid, InputLabel } from '@mui/material';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import FormikTextField from 'components/FormikTextField';

const formikValidationSchema = yup.object().shape({
  posts: yup.object().shape({
    fence: yup.number().min(0, 'Min value 0').required('Total fence posts is required'),
    starter: yup.number().min(0, 'Min value 0').required('Total starter posts is required'),
    total: yup.number().min(0, 'Min value 0').required('Total posts is required')
  })
});

/* Component */
const TotalPostsCalculationTable = ({ quoteId, currentProduct, starterPosts }) => {
  const formikRef = useRef();
  const rowInitialValue = useMemo(() => {
    const fence = Math.ceil(parseInt(currentProduct.metres, 10) / 2.7);
    const starter = starterPosts.reduce((a, p) => a + parseInt(p.metres, 10), 0);

    return {
      fence: fence,
      starter: starter,
      total: fence + starter
    };
  }, [currentProduct, starterPosts]);

  /* Render */
  return (
    <Grid item xs={12} key={quoteId}>
      <TableContainer component={Paper}>
        <Formik
          innerRef={formikRef}
          initialValues={{ posts: rowInitialValue }}
          enableReinitialize
          validationSchema={formikValidationSchema}
        >
          {(props) => (
            <Form>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <InputLabel>Fence Posts</InputLabel>
                    </TableCell>
                    <TableCell align="left">
                      <InputLabel>Starter Posts</InputLabel>
                    </TableCell>
                    <TableCell align="left">
                      <InputLabel>Total Posts</InputLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell scope="row" align="left">
                      <FormikTextField id={`posts.fence`} className="text-center" formik={props} disabled sx={{ width: 100 }} />
                    </TableCell>
                    <TableCell align="left">
                      <FormikTextField id={`posts.starter`} className="text-center" formik={props} disabled sx={{ width: 100 }} />
                    </TableCell>
                    <TableCell align="left">
                      <FormikTextField id={`posts.total`} className="text-center" formik={props} disabled sx={{ width: 100 }} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Form>
          )}
        </Formik>
      </TableContainer>
    </Grid>
  );
};

TotalPostsCalculationTable.propTypes = {
  quoteId: PropTypes.string,
  currentProduct: PropTypes.any,
  starterPosts: PropTypes.any
};

export default TotalPostsCalculationTable;
