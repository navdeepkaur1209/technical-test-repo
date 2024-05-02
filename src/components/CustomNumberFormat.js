import { useNumericFormat, NumberFormatBase } from 'react-number-format';

function CustomNumberFormat(props) {
  // eslint-disable-next-line react/prop-types
  const { prefix = '', suffix = '', allowEmptyFormatting } = props;
  // console.log(props);
  const { format, ...numberFormatBaseProps } = useNumericFormat(props);
  const _format = (numStr, props) => {
    const formattedValue = format(numStr, props);
    return allowEmptyFormatting && formattedValue === '' ? prefix + suffix : formattedValue;
  };

  return <NumberFormatBase {...numberFormatBaseProps} format={_format} />;
}

export default CustomNumberFormat;
