import { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Grid, InputLabel } from '@mui/material';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import FormikTextField from 'components/FormikTextField';

const formikValidationSchema = yup.object().shape({
  cement: yup.object().shape({
    bags: yup.number().min(0, 'Min value 0').required('Rate is required')
  })
});

/* Component */
const CementCalculationTable = ({ quoteId, currentProduct, starterPosts }) => {
  const formikRef = useRef();
  const rowInitialValue = useMemo(() => {
    const fence = Math.ceil(parseInt(currentProduct.metres, 10) / 2.7);
    const starter = starterPosts.reduce((a, p) => a + parseInt(p.metres, 10), 0);

    return {
      bags: Math.ceil((fence + starter) / 2)
    };
  }, [currentProduct, starterPosts]);

  /* Render */
  return (
    <Grid item xs={12} key={quoteId}>
      <TableContainer component={Paper}>
        <Formik
          innerRef={formikRef}
          initialValues={{ cement: rowInitialValue }}
          enableReinitialize
          validationSchema={formikValidationSchema}
        >
          {(props) => (
            <Form>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <InputLabel>Total bags</InputLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell scope="row" align="left">
                      <FormikTextField id={`cement.bags`} className="text-center" formik={props} disabled sx={{ width: 100 }} />
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

CementCalculationTable.propTypes = {
  quoteId: PropTypes.string,
  currentProduct: PropTypes.any,
  starterPosts: PropTypes.any
};

export default CementCalculationTable;
