import { cond, propEq, T } from 'ramda';
import { getLoginResponse } from './Account/login';

const getHandler = cond([
  [propEq('operation', 'ACCOUNT/LOGIN_CHECK'), ({ data }) => getLoginResponse(data)],
  [T, () => {}],
]);

export default (operation, data) => getHandler({ operation, data });
