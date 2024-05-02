import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { CardContent, Box, Grid, TextareaAutosize } from '@mui/material';
import MainCard from 'components/MainCard';
import FormikAutoSave from 'components/FormikAutoSave';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

// GraphQL.
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import GetFencerNotes from 'graphql/quotes/GetFencerNotes';
import UpdateFencerNotes from 'graphql/quotes/UpdateFencerNotes';

/* Static methods and values */
const formikValidationSchema = yup.object().shape({
  notes: yup.string().required('Notes is required')
});

const formikInitialValues = {
  notes: ''
};

/* Component */
const FencerNotesTable = ({ quoteId }) => {
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const formikRef = useRef();
  const dispatch = useDispatch();

  /* GraphQL: GetFencerNotes */
  const { data: dataGetFencerNotes } = useGraphQLQuery(GetFencerNotes, { variables: { id: quoteId } });

  useEffect(() => {
    if (dataGetFencerNotes && dataGetFencerNotes.GetFencerNotes) {
      const data = JSON.parse(dataGetFencerNotes.GetFencerNotes.QuoteDetails);
      if (data) {
        formikRef.current.setFieldValue('notes', data.FencerNotes);
      }
      setDetailsLoaded(true);
    }
  }, [dataGetFencerNotes, setDetailsLoaded, formikRef]);

  /* GraphQL: UpdateFencerNotes */
  const [mutationUpdateFencerNotes, { data: resultUpdateFencerNotes }] = useGraphQLMutation(UpdateFencerNotes);

  const doMutationUpdateFencerNotes = (values) => {
    console.log(values);
    mutationUpdateFencerNotes({
      variables: {
        id: quoteId,
        notes: values.notes
      }
    });
  };

  useEffect(() => {
    if (resultUpdateFencerNotes && resultUpdateFencerNotes.UpdateFencerNotes.Status === 'SUCCESS') {
      dispatch(
        openSnackbar({
          open: true,
          message: resultUpdateFencerNotes.UpdateFencerNotes.Message,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
  }, [resultUpdateFencerNotes, dispatch]);

  /* Render */
  return (
    <Box sx={{ flexGrow: 1 }} style={{ margin: '20px 0', paddingBottom: '10px' }}>
      <MainCard content={false}>
        <CardContent>
          <Formik
            innerRef={formikRef}
            initialValues={formikInitialValues}
            enableReinitialize
            validationSchema={formikValidationSchema}
            onSubmit={async (values) => {
              doMutationUpdateFencerNotes(values);
            }}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <Grid item xs={12} container>
                  <h2 style={{ marginTop: '0' }}>FENCER NOTES</h2>
                  <TextareaAutosize
                    id="notes"
                    name="notes"
                    minRows={10}
                    placeholder="Fencer notes"
                    value={values.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ width: '100%', borderRadius: '6px', padding: '10px', border: '1px solid #bfbfbf' }}
                  />
                </Grid>

                <Grid item xs={12} justifyContent={'flex-end'} display={'flex'} style={{ margin: '10px 0px 0px 0' }}>
                  {detailsLoaded ? <FormikAutoSave formName="OptionalItems" /> : null}
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </MainCard>
    </Box>
  );
};

FencerNotesTable.propTypes = {
  quoteId: PropTypes.string
};

export default FencerNotesTable;
