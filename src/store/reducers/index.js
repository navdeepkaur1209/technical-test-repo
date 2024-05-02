// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import snackbar from './snackbar';
import quotes from './quotes';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  snackbar,
  quotes
});

export default reducers;
