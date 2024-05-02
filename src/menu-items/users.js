// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { TeamOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = { TeamOutlined, UserOutlined };

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const users = {
  id: 'users',
  title: <FormattedMessage id="users" />,
  type: 'group',
  children: [
    {
      id: 'clients',
      title: <FormattedMessage id="clients" />,
      type: 'item',
      url: '/clients',
      icon: icons.TeamOutlined
    },
    {
      id: 'app-users',
      title: <FormattedMessage id="app-users" />,
      type: 'item',
      url: '/app-users',
      icon: icons.UserOutlined
    }
  ]
};

export default users;
