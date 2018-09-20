import { combineReducers } from 'redux';
import connectionReducer from './Reducers/connection';

export default combineReducers({
  connection: connectionReducer,
});
