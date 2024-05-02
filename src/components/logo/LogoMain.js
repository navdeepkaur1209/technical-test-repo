// material-ui
import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'config';

import logoDark from 'assets/images/logo-full.png';
import logo from 'assets/images/logo-full.png';

// ==============================|| LOGO SVG ||============================== //

const LogoMain = () => {
  const theme = useTheme();
  return <img src={theme.palette.mode === ThemeMode.DARK ? logoDark : logo} alt="Eastside Fencing" width="180" />;
};

export default LogoMain;
