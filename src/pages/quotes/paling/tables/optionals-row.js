import PropTypes from 'prop-types';
import { TableRow, TableCell, Grid } from '@mui/material';
import FormikTextField from 'components/FormikTextField';
import FormikSelectField from 'components/FormikSelectField';
import { getIn } from 'formik';

/* Static methods and values */

/* Component */
const OptionalsRow = ({ formik, neighbours, index, optionsPrice }) => {
  /* Calculates total when fields change */
  const handleChangeDescription = (e) => {
    const description = e.target.value;
    const optionPrice = optionsPrice.find((p) => p.Value == description);
    const metres = parseInt(getIn(formik.values, `optionals[${index}].metres`), 10);
    formik.handleChange(e);
    formik.setFieldValue(`optionals[${index}].add`, metres * optionPrice.Price);
    formik.setFieldValue(`optionals[${index}].permetre`, optionPrice.Price);
  };

  const handleChangeMetres = (e) => {
    const description = getIn(formik.values, `optionals[${index}].description`);
    const optionPrice = optionsPrice.find((p) => p.Value == description);
    const metres = e.target.value;
    formik.handleChange(e);
    formik.setFieldValue(`optionals[${index}].add`, metres * optionPrice.Price);
    formik.setFieldValue(`optionals[${index}].permetre`, optionPrice.Price);
  };

  const metresRequired = () => {
    const description = getIn(formik.values, `optionals[${index}].description`);
    const optionPrice = optionsPrice.find((p) => p.Value == description);
    return optionPrice && optionPrice.Price > 0;
  };

  /* Render */
  return (
    <>
      {optionsPrice.length ? (
        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell align="center">
            <FormikTextField id={`optionals[${index}].sn`} className={'srwidth'} formik={formik} disabled />
          </TableCell>
          <TableCell scope="row">
            {metresRequired() ? (
              <Grid container columnSpacing={3}>
                <Grid item maxWidth={740} width={'calc(100% - 75px)'}>
                  <FormikSelectField
                    id={`optionals[${index}].description`}
                    formik={formik}
                    menuItems={optionsPrice}
                    menuItemKey="Key"
                    menuItemValue="Value"
                    onChange={handleChangeDescription}
                  />
                </Grid>
                <Grid item width={75}>
                  <FormikTextField
                    id={`optionals[${index}].metres`}
                    formik={formik}
                    onChange={handleChangeMetres}
                    sx={{ width: 50, input: { textAlign: 'center' } }}
                  />
                </Grid>
              </Grid>
            ) : (
              <>
                <FormikSelectField
                  id={`optionals[${index}].description`}
                  formik={formik}
                  menuItems={optionsPrice}
                  menuItemKey="Key"
                  menuItemValue="Value"
                  onChange={handleChangeDescription}
                  sx={{ maxWidth: 790 }}
                />
                <FormikTextField id={`optionals[${index}].metres`} formik={formik} sx={{ display: 'none' }} />
              </>
            )}
            <FormikTextField id={`optionals[${index}].permetre`} formik={formik} sx={{ display: 'none' }} />
          </TableCell>
          <TableCell align="center">
            <FormikTextField id={`optionals[${index}].add`} className="addWidth" formik={formik} />
          </TableCell>
          <TableCell align="center" className="cost-col">
            <FormikTextField id={`optionals[${index}].cost`} className="priceFormat" formik={formik} />
          </TableCell>
          <TableCell align="center" className="client-col">
            <FormikTextField id={`optionals[${index}].client`} className="priceFormat" formik={formik} />
          </TableCell>
          {Array(neighbours)
            .fill(0)
            .map((n, i) => (
              <TableCell key={['neighbour', i + 1].join('')} align="center" className="neigh-col">
                <FormikTextField id={`optionals[${index}].neighbours.${i}`} className="priceFormat" formik={formik} />
              </TableCell>
            ))}
        </TableRow>
      ) : null}
    </>
  );
};

OptionalsRow.propTypes = {
  formik: PropTypes.any,
  neighbours: PropTypes.number,
  index: PropTypes.number,
  optionsPrice: PropTypes.any
};

export default OptionalsRow;
