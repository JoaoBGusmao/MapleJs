import { cond, propEq, T } from 'ramda';
import getLoginResponse from './Account/login';
import { nameCheck, newCharacter } from './Character/accountCreation';
import characterList from './Character/characterList';

const getHandler = cond([
  [propEq('operation', 'ACCOUNT/LOGIN_CHECK'), ({ data }) => getLoginResponse(data)],
  [propEq('operation', 'CHARACTER/NAME_CHECK'), ({ data }) => nameCheck(data)],
  [propEq('operation', 'CHARACTER/NEW'), ({ data }) => newCharacter(data)],
  [propEq('operation', 'CHARACTER/LIST'), ({ data }) => characterList(data)],
  [T, () => {}],
]);

export default (operation, data) => getHandler({ operation, data });
