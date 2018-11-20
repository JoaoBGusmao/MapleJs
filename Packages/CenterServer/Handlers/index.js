import { cond, propEq, T } from 'ramda';
import getLoginResponse from './Account/login';
import { nameCheck, newCharacter } from './Character/accountCreation';
import characterList from './Character/characterList';
import { getCharacterById, deleteCharacter } from '../Controllers/character';

const getHandler = cond([
  [propEq('operation', 'ACCOUNT/LOGIN_CHECK'), ({ data }) => getLoginResponse(data)],
  [propEq('operation', 'CHARACTER/NAME_CHECK'), ({ data }) => nameCheck(data)],
  [propEq('operation', 'CHARACTER/NEW'), ({ data }) => newCharacter(data)],
  [propEq('operation', 'CHARACTER/LIST'), ({ data }) => characterList(data)],
  [propEq('operation', 'CHARACTER/GET'), ({ data }) => getCharacterById(data)],
  [propEq('operation', 'CHARACTER/DELETE'), ({ data }) => deleteCharacter(data)],
  [T, () => {}],
]);

export default (operation, data) => getHandler({ operation, data });
