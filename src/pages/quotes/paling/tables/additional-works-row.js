import PropTypes from 'prop-types';
import { TableRow, TableCell, Grid, IconButton } from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import FormikTextField from 'components/FormikTextField';
import FormikSelectField from 'components/FormikSelectField';
import { getIn } from 'formik';

/* Component */
const AdditionalWorksRow = ({ formik, neighbours, index, optionsPrice, helpers }) => {
  /* Calculates total when fields change */
  const handleChangeDescription = (e) => {
    const description = e.target.value;
    const optionPrice = optionsPrice.find((p) => p.Value == description);
    const metres = parseInt(getIn(formik.values, `additionalworks[${index}].metres`), 10);
    formik.handleChange(e);
    formik.setFieldValue(`additionalworks[${index}].cost`, metres * optionPrice.Price);
  };

  const handleChangeMetres = (e) => {
    const description = getIn(formik.values, `additionalworks[${index}].description`);
    const optionPrice = optionsPrice.find((p) => p.Value == description);
    const metres = e.target.value;
    formik.handleChange(e);
    formik.setFieldValue(`additionalworks[${index}].cost`, metres * optionPrice.Price);
  };

  /* Render */
  return (
    <>
      {optionsPrice ? (
        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell width={'100%'} scope="row">
            <Grid item xs={12} spacing={2} container>
              <Grid item width={68}>
                <IconButton color="error" onClick={() => helpers.remove(index)}>
                  <CloseOutlined />
                </IconButton>
              </Grid>
              <Grid item width={'calc(100% - 68px)'}>
                <FormikSelectField
                  id={`additionalworks[${index}].description`}
                  formik={formik}
                  menuItems={optionsPrice}
                  menuItemKey="Key"
                  menuItemValue="Value"
                  onChange={handleChangeDescription}
                />
              </Grid>
            </Grid>
          </TableCell>
          <TableCell align="center">
            <FormikTextField id={`additionalworks[${index}].metres`} className="priceWidth" formik={formik} onChange={handleChangeMetres} />
          </TableCell>
          <TableCell align="center" className="cost-col">
            <FormikTextField id={`additionalworks[${index}].cost`} className="priceFormat" formik={formik} disabled />
          </TableCell>
          <TableCell align="center" className="client-col">
            <FormikTextField id={`additionalworks[${index}].client`} className="priceFormat" formik={formik} />
          </TableCell>
          {Array(neighbours)
            .fill(0)
            .map((n, i) => (
              <TableCell key={['neighbour', i + 1].join('')} align="center" className="neigh-col">
                <FormikTextField id={`additionalworks[${index}].neighbours.${i}`} className="priceFormat" formik={formik} />
              </TableCell>
            ))}
        </TableRow>
      ) : null}
    </>
  );
};

AdditionalWorksRow.propTypes = {
  formik: PropTypes.any,
  neighbours: PropTypes.number,
  index: PropTypes.number,
  optionsPrice: PropTypes.any,
  helpers: PropTypes.any
};

export default AdditionalWorksRow;
