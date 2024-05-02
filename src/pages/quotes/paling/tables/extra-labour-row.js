import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Grid } from '@mui/material';
import FormikTextField from 'components/FormikTextField';
import FormikSelectField from 'components/FormikSelectField';
import { getIn, useFormikContext } from 'formik';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import ListData from 'graphql/data/ListData';

/* Static methods and values */
const metresRequired = ['CONCRETE', 'DEMOLISH_REMOVE'];
const metresBasedOnFenceHeight = ['DEMOLISH_REMOVE'];

const CalculateCost = (labour, meters, pricing) => {
  if (labour === 'CONCRETE') {
    return meters * pricing.Price + pricing.MinCharge;
  } else {
    return meters * pricing.Price;
  }
};

/* Component */
const ExtraLabourRow = ({ formik, metres, neighbours, index, costings }) => {
  const [dataExtraLabour, setDataExtraLabour] = useState([]);
  const { setFieldValue } = useFormikContext();
  const [isChangeValue, setIsChangeValue] = useState(false);

  /* GraphQL: ListData */
  const { data: dataListData } = useGraphQLQuery(ListData, {
    variables: { datatype: getIn(formik.values, `extralabour[${index}].labour`), pagination: {} }
  });

  useEffect(() => {
    if (dataListData && dataListData.ListData && dataListData.ListData.Data) {
      setDataExtraLabour(() =>
        dataListData.ListData.Data.map((d) => {
          const data = JSON.parse(d.Data || '{}');
          return {
            Key: d.DataId,
            Value: d.DataMainValue,
            Price: Object.prototype.hasOwnProperty.call(data, 'Price') ? data.Price : 0,
            MinCharge: Object.prototype.hasOwnProperty.call(data, 'MinCharge') ? data.MinCharge : 0
          };
        })
      );
    }
  }, [dataListData]);

  /* Set defaults for field values */
  const updateCostShare = useCallback(
    (cost) => {
      const perShare = Math.round((cost / (neighbours + 1)) * 100) / 100;

      let neighboursShare = 0;
      for (let i = 0; i < neighbours; i++) {
        setFieldValue(`extralabour[${index}].neighbours.${i}`, perShare);
        neighboursShare += perShare;
      }
      setFieldValue(`extralabour[${index}].client`, cost - neighboursShare);
    },
    [index, neighbours, setFieldValue]
  );

  useEffect(() => {
    const description = getIn(formik.values, `extralabour[${index}].description`);
    if (description == '' && dataExtraLabour.length) {
      setFieldValue(`extralabour[${index}].description`, dataExtraLabour[0].Value);
    }
  }, [dataExtraLabour, formik.values, index, setFieldValue]);

  useEffect(() => {
    const sharing = getIn(formik.values, `extralabour[${index}].sharing`);
    if (sharing == '' && costings.length) {
      setFieldValue(`extralabour[${index}].sharing`, costings[0].Value);
    }
  }, [costings, formik.values, index, setFieldValue]);

  useEffect(() => {
    if (dataExtraLabour.length) {
      const labour = getIn(formik.values, `extralabour[${index}].labour`);
      if (metresBasedOnFenceHeight.indexOf(labour) >= 0) {
        const description = getIn(formik.values, `extralabour[${index}].description`);
        if (description && isChangeValue) {
          const extraLabour = dataExtraLabour.find((p) => p.Value == description);
          const newMetres = parseInt(getIn(formik.values, `extralabour[${index}].metres`) || metres, 10);
          const cost = CalculateCost(labour, newMetres, extraLabour);
          setFieldValue(`extralabour[${index}].metres`, newMetres);
          setFieldValue(`extralabour[${index}].cost`, cost);
          updateCostShare(cost);
          setIsChangeValue(true);
        }
      }
    }
  }, [dataExtraLabour, formik.values, index, metres, isChangeValue, updateCostShare, setFieldValue]);

  /* Calculates total when fields change */
  const handleChangeCost = useCallback(
    (e) => {
      formik.handleChange(e);
      const cost = e.target.value;
      updateCostShare(cost);
    },
    [updateCostShare, formik]
  );

  const handleChangeDescription = useCallback(
    (e) => {
      const description = e.target.value;
      const labour = getIn(formik.values, `extralabour[${index}].labour`);
      const extraLabour = dataExtraLabour.find((p) => p.Value == description);
      const metres = parseInt(getIn(formik.values, `extralabour[${index}].metres`), 10);
      const cost = CalculateCost(labour, metres, extraLabour);
      formik.handleChange(e);
      setFieldValue(`extralabour[${index}].cost`, cost);
      updateCostShare(cost);
    },
    [dataExtraLabour, formik, index, updateCostShare, setFieldValue]
  );

  const handleChangeMetres = useCallback(
    (e) => {
      const description = getIn(formik.values, `extralabour[${index}].description`);
      const labour = getIn(formik.values, `extralabour[${index}].labour`);
      const extraLabour = dataExtraLabour.find((p) => p.Value == description);
      const metres = e.target.value;
      const cost = CalculateCost(labour, metres, extraLabour);
      formik.handleChange(e);
      setFieldValue(`extralabour[${index}].cost`, cost);
      updateCostShare(cost);
    },
    [dataExtraLabour, formik, index, updateCostShare, setFieldValue]
  );

  /* Render */
  return (
    <>
      {costings && dataExtraLabour.length ? (
        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell align="left">
            <FormikTextField id={`extralabour[${index}].labour`} className="titleWidth" formik={formik} disabled />
          </TableCell>
          <TableCell scope="row" sx={{ maxWidth: 518 }}>
            {metresRequired.indexOf(getIn(formik.values, `extralabour[${index}].labour`)) >= 0 ? (
              <Grid container columnSpacing={2}>
                <Grid item width={'calc(100% - 75px)'}>
                  <FormikSelectField
                    id={`extralabour[${index}].description`}
                    formik={formik}
                    menuItems={dataExtraLabour}
                    menuItemKey="Key"
                    menuItemValue="Value"
                    onChange={handleChangeDescription}
                  />
                </Grid>
                <Grid item width={75}>
                  <FormikTextField
                    id={`extralabour[${index}].metres`}
                    className="text-center"
                    formik={formik}
                    onChange={handleChangeMetres}
                  />
                </Grid>
              </Grid>
            ) : (
              <>
                <FormikSelectField
                  id={`extralabour[${index}].description`}
                  formik={formik}
                  menuItems={dataExtraLabour}
                  menuItemKey="Key"
                  menuItemValue="Value"
                  onChange={handleChangeDescription}
                />
                <FormikTextField id={`extralabour[${index}].metres`} className="quantityWidth" formik={formik} sx={{ display: 'none' }} />
              </>
            )}
          </TableCell>
          <TableCell align="center">
            <FormikSelectField
              id={`extralabour[${index}].sharing`}
              formik={formik}
              menuItems={costings}
              menuItemKey="Key"
              menuItemValue="Value"
            />
          </TableCell>
          <TableCell align="center" className="cost-col">
            <FormikTextField id={`extralabour[${index}].cost`} className="priceFormat" formik={formik} onChange={handleChangeCost} />
          </TableCell>
          <TableCell align="center" className="client-col">
            <FormikTextField id={`extralabour[${index}].client`} className="priceFormat" formik={formik} />
          </TableCell>
          {Array(neighbours)
            .fill(0)
            .map((n, i) => (
              <TableCell key={['neighbour', i + 1].join('')} align="center" className="neigh-col">
                <FormikTextField id={`extralabour[${index}].neighbours.${i}`} className="priceFormat" formik={formik} />
              </TableCell>
            ))}
        </TableRow>
      ) : null}
    </>
  );
};

ExtraLabourRow.propTypes = {
  formik: PropTypes.any,
  metres: PropTypes.number,
  neighbours: PropTypes.number,
  index: PropTypes.number,
  costings: PropTypes.any
};

export default ExtraLabourRow;
