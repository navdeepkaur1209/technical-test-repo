// material-ui
import { useTheme } from '@mui/material/styles';

import logoIconDark from 'assets/images/logo-icon.png';
import logoIcon from 'assets/images/logo-icon.png';
import { ThemeMode } from 'config';

// ==============================|| LOGO ICON SVG ||============================== //

const LogoIcon = () => {
  const theme = useTheme();
  return <img src={theme.palette.mode === ThemeMode.DARK ? logoIconDark : logoIcon} alt="Eastside Fencing" width="40" />;
};

export default LogoIcon;
