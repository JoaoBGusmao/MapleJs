import { cond, propEq, T } from 'ramda';
import getLoginResponse from './Account/login';
import { nameCheck } from './Character/accountCreation';

const getHandler = cond([
  [propEq('operation', 'ACCOUNT/LOGIN_CHECK'), ({ data }) => getLoginResponse(data)],
  [propEq('operation', 'CHARACTER/NAME_CHECK'), ({ data }) => nameCheck(data)],
  [T, () => {}],
]);

export default (operation, data) => getHandler({ operation, data });
