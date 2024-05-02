// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = { DashboardOutlined };

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const navigation = {
  id: 'navigation',
  title: <FormattedMessage id="navigation" />,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined
    }
  ]
};

export default navigation;
