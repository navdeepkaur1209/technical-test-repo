import PropTypes from 'prop-types';
import LabourItemsSummaryTotal from './labour-items-summary-total';
import LabourItemsSummaryDemoRemoval from './labour-items-summary-demo-removal';
import LabourItemsSummaryServiceLocator from './labour-items-summary-service-locator';

/* Component */
const LabourItemsSummary = ({ quoteId, formik, setProfitLoss }) => {
  /* Render */
  return (
    <>
      <LabourItemsSummaryTotal formik={formik} setProfitLoss={setProfitLoss} />
      <LabourItemsSummaryDemoRemoval formik={formik} setProfitLoss={setProfitLoss} />
      <LabourItemsSummaryServiceLocator quoteId={quoteId} formik={formik} setProfitLoss={setProfitLoss} />
    </>
  );
};

LabourItemsSummary.propTypes = {
  quoteId: PropTypes.string,
  formik: PropTypes.any,
  setProfitLoss: PropTypes.any
};

export default LabourItemsSummary;
