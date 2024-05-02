import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@mui/material';
import { getIn } from 'formik';

function FormikSelectField({ id, className, placeholder, formik, menuItems, menuItemKey, menuItemValue, menuItemDisplay, ...rest }) {
  const selectValue = getIn(formik.values, id);
  const formValue = selectValue && selectValue.length ? selectValue : '--select--';

  return (
    <TextField
      fullWidth
      id={id}
      className={className}
      name={id}
      select
      value={formValue}
      onChange={formik.handleChange}
      error={Boolean(getIn(formik.errors, id)) && getIn(formik.touched, id)}
      helperText={getIn(formik.errors, id) && getIn(formik.touched, id) ? getIn(formik.errors, id) : null}
      {...rest}
    >
      <MenuItem key="0" value={'--select--'} disabled>
        {placeholder ? placeholder : '-- Select --'}
      </MenuItem>
      {menuItems
        ? menuItems.map((menu) => (
            <MenuItem key={menu[menuItemKey]} value={menu[menuItemValue ? menuItemValue : menuItemKey]}>
              {menu[menuItemDisplay ? menuItemDisplay : menuItemValue ? menuItemValue : menuItemKey]}
            </MenuItem>
          ))
        : null}
    </TextField>
  );
}

FormikSelectField.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  formik: PropTypes.object,
  menuItems: PropTypes.array,
  menuItemKey: PropTypes.string,
  menuItemValue: PropTypes.string,
  menuItemDisplay: PropTypes.string,
  children: PropTypes.any
};

export default FormikSelectField;
