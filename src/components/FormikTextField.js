import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { getIn } from 'formik';
import CustomNumberFormat from './CustomNumberFormat';
import { checkNumber } from 'utils/helpers';
import { useState } from 'react';

function FormikTextField({ id, className, placeholder, formik, children, ...rest }) {
  const [priceFormat, setPriceFormat] = useState(true);
  const handlePriceOnFOcus = () => {
    setPriceFormat(false);
  };
  const handlePriceOnBlur = (e) => {
    formik.handleBlur(e);
    setPriceFormat(true);
  };
  if (className === 'priceFormat') {
    return (
      <TextField
        fullWidth
        id={id}
        className={className}
        name={id}
        placeholder={placeholder}
        value={priceFormat ? Number(getIn(formik.values, id)).toFixed(2) : getIn(formik.values, id)}
        onChange={formik.handleChange}
        onBlur={handlePriceOnBlur}
        onFocus={handlePriceOnFOcus}
        error={Boolean(getIn(formik.errors, id)) && getIn(formik.touched, id)}
        // helperText={getIn(formik.errors, id) && getIn(formik.touched, id) ? getIn(formik.errors, id) : null}
        {...rest}
      >
        {children}
      </TextField>
    );
  } else if (className === 'percentageFormat') {
    return (
      <CustomNumberFormat
        id={id}
        className={`custom-number-input priceWidth ${Boolean(getIn(formik.errors, id)) && getIn(formik.touched, id) ? 'number-error' : ''}`}
        allowemptyformatting="true"
        value={getIn(formik.values, id)}
        suffix={checkNumber(getIn(formik.values, id)) === 'integer' ? '.00 %' : '0 %'}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        {...rest}
      />
    );
  } else {
    return (
      <TextField
        fullWidth
        id={id}
        className={className}
        name={id}
        placeholder={placeholder}
        value={className === 'labourFormat' ? Number(getIn(formik.values, id)).toFixed(2) : getIn(formik.values, id)}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(getIn(formik.errors, id)) && getIn(formik.touched, id)}
        // helperText={getIn(formik.errors, id) && getIn(formik.touched, id) ? getIn(formik.errors, id) : null}
        {...rest}
      >
        {children}
      </TextField>
    );
  }
}

FormikTextField.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  formik: PropTypes.object,
  children: PropTypes.any
};

export default FormikTextField;
