import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Grid, Typography } from '@mui/material';
import FormikTextField from 'components/FormikTextField';
import { useFormikContext } from 'formik';

/* Component */
const FenceItemsTotal = ({ formik, setProfitLoss }) => {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    const posts = Math.ceil(
      formik.values.fences.filter((f) => f.item == 'POSTS').reduce((a, f) => (a += parseFloat(f.qty ? f.qty : 0)), 0) +
        parseFloat(formik.values.fences[0]?.qty) / 2.7
    );
    const materials = formik.values.fences.reduce((a, f) => (a += f.total), 0);
    setFieldValue(`total.posts`, posts);
    setFieldValue(`total.materials`, materials);
    setProfitLoss({ posts: posts, materials: materials });
  }, [formik.values.fences, setFieldValue, setProfitLoss]);

  /* Render */
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item width={120}>
            <Typography variant="h6" fontWeight={700}>
              Posts Required
            </Typography>
          </Grid>
          <Grid item width={70}>
            <FormikTextField id={`total.posts`} formik={formik} disabled />
          </Grid>
        </Grid>
      </TableCell>
      <TableCell component="th" scope="row"></TableCell>
      {/* <TableCell align="center"></TableCell> */}
      <TableCell align="right" colSpan={2}>
        <Typography variant="h6">Total Fence Material</Typography>
      </TableCell>
      <TableCell align="center">
        <FormikTextField id={`total.materials`} className="priceFormat" formik={formik} disabled />
      </TableCell>
    </TableRow>
  );
};

FenceItemsTotal.propTypes = {
  formik: PropTypes.any,
  setProfitLoss: PropTypes.any
};

export default FenceItemsTotal;
