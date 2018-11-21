import { combineReducers } from 'redux';
import connectionReducer from './Reducers/connection';
import accountReducer from './Reducers/account';

export default combineReducers({
  connection: connectionReducer,
  accounts: accountReducer,
});
