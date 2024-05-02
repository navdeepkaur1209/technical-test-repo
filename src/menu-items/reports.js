// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { BarChartOutlined } from '@ant-design/icons';

// icons
const icons = { BarChartOutlined };

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const reports = {
  id: 'reports',
  title: <FormattedMessage id="reports" />,
  type: 'group',
  children: [
    {
      id: 'reports',
      title: <FormattedMessage id="reports" />,
      type: 'item',
      url: '/reports',
      icon: icons.BarChartOutlined
    }
  ]
};

export default reports;
