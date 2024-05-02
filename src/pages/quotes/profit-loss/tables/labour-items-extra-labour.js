import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ExtraLabourRow from './labour-items-extra-labour-row';
import { EXTRA_LABOUR_TYPES } from 'utils/helpers';
import { useFormikContext, FieldArray } from 'formik';

// GraphQL.
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';

/* Static methods and values */
const QuoteDetailsType = 'SPECS';
const QuoteDetailsDescription = 'Extra Labour';
const QuoteDetailsSubType = QuoteDetailsDescription.toUpperCase().split(' ').join('_');

/* Component */
const ExtraLabourTable = ({ quoteId, formik }) => {
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const { setFieldValue } = useFormikContext();

  /* GraphQL: GetQuoteDetails */
  const [doGetQuoteDetails, { data: dataGetQuoteDetails }] = useGraphQLLazyQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: QuoteDetailsType, subtype: QuoteDetailsSubType }
  });

  useEffect(() => {
    if (!detailsLoaded && dataGetQuoteDetails && dataGetQuoteDetails.GetQuoteDetails) {
      const data = JSON.parse(dataGetQuoteDetails.GetQuoteDetails.QuoteDetails);
      if (data.length) {
        setFieldValue(
          'extralabour',
          data.map((row) => {
            return {
              labour: row.labour,
              description: row.description,
              qty: row.cost,
              cost: 84,
              total: row.cost * 0.84
            };
          })
        );
      }

      setDetailsLoaded(true);
    }
  }, [dataGetQuoteDetails, detailsLoaded, setDetailsLoaded, setFieldValue]);

  useEffect(() => {
    doGetQuoteDetails();
  }, [doGetQuoteDetails]);

  /* Render */
  return (
    <FieldArray
      name="extralabour"
      render={() => {
        return (
          <>
            {
              // eslint-disable-next-line
              formik.values.extralabour && formik.values.extralabour.length > 0
                ? // eslint-disable-next-line
                formik.values.extralabour.filter((labour) => EXTRA_LABOUR_TYPES.indexOf(labour.labour) >= 0).map((labour, index) => {
                      return <ExtraLabourRow formik={formik} key={index} index={index} />;
                    })
                : null
            }
          </>
        );
      }}
    />
  );
};

ExtraLabourTable.propTypes = {
  quoteId: PropTypes.string,
  formik: PropTypes.any
};

export default ExtraLabourTable;
