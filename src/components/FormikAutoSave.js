import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import _ from 'lodash';
import { Button } from '@mui/material';

function FormikAutoSaveDebug() {
  //console.log('FormikAutoSave', ...arguments);
}

const FormikAutoSave = ({ debounceMs = 1000, formName = '', autoSave = true, skipInitialDebounces = 5 }) => {
  const formik = useFormikContext();
  const [isSaved, setIsSaved] = useState(null);
  const [debouncesSkipped, setDebouncesSkipped] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(
    _.debounce(() => {
      FormikAutoSaveDebug(formName, 'debouncedSubmit');
      return formik.submitForm().then(() => setIsSaved(true));
    }, debounceMs),
    [formName, formik.submitForm, debounceMs]
  );

  useEffect(() => {
    FormikAutoSaveDebug(formName, 'saving form');
    setDebouncesSkipped((d) => {
      FormikAutoSaveDebug(d, skipInitialDebounces);
      return d <= skipInitialDebounces ? d + 1 : d;
    });

    setIsSaved(false);
    if (autoSave) {
      debouncedSubmit();
    }
  }, [formName, autoSave, skipInitialDebounces, debouncedSubmit, formik.values]);

  useEffect(() => {
    FormikAutoSaveDebug(formName, 'check skipped', debouncesSkipped);
    if (debouncesSkipped <= skipInitialDebounces) {
      FormikAutoSaveDebug(formName, 'cancelled');
      debouncedSubmit.cancel();
    }
  }, [formName, debouncesSkipped, skipInitialDebounces, debouncedSubmit]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncesSkipped(skipInitialDebounces + 1);
    }, debounceMs + 2000);

    return () => clearTimeout(timeoutId);
  }, [debounceMs, skipInitialDebounces]);

  return (
    <Button variant="contained" color="primary" onClick={() => formik.submitForm()} disabled={autoSave && isSaved}>
      Save
    </Button>
  );
};

FormikAutoSave.propTypes = {
  debounceMs: PropTypes.number,
  autoSave: PropTypes.bool,
  formName: PropTypes.string,
  skipInitialDebounces: PropTypes.number
};

export default FormikAutoSave;
