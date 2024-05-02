import PropTypes from 'prop-types';
import { OutlinedInput } from '@mui/material';

function FormikOutlinedInput({ id, placeholder, formik, ...rest }) {
  return <OutlinedInput fullWidth id={id} placeholder={placeholder} value={formik.values[id]} onChange={formik.handleChange} {...rest} />;
}

FormikOutlinedInput.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  formik: PropTypes.object
};

export default FormikOutlinedInput;
