// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { FileTextOutlined, CalendarOutlined, UnorderedListOutlined, FileDoneOutlined } from '@ant-design/icons';

// icons
const icons = { FileTextOutlined, CalendarOutlined, UnorderedListOutlined, FileDoneOutlined };

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const menu = {
  id: 'menu',
  title: <FormattedMessage id="menu" />,
  type: 'group',
  children: [
    {
      id: 'jobs',
      title: <FormattedMessage id="jobs" />,
      type: 'item',
      url: '/jobs',
      icon: icons.FileTextOutlined
    },
    {
      id: 'schedules',
      title: <FormattedMessage id="schedules" />,
      type: 'item',
      url: '/schedules',
      icon: icons.CalendarOutlined
    },
    {
      id: 'supplier-orders',
      title: <FormattedMessage id="supplier-orders" />,
      type: 'item',
      url: '/supplier-orders',
      icon: icons.UnorderedListOutlined
    },
    {
      id: 'job-sheets',
      title: <FormattedMessage id="job-sheets" />,
      type: 'item',
      url: '/job-sheets',
      icon: icons.FileDoneOutlined
    }
  ]
};

export default menu;
