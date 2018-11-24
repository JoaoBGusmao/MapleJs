import { cond, propEq, T } from 'ramda';
import { Auth } from './Controllers/Account';
import {
  getCharacterById,
  deleteCharacter,
  nameCheck,
  getCharactersByAccountId,
  registerNewCharacter,
} from './Controllers/Character';

const getHandler = cond([
  [propEq('operation', 'ACCOUNT/LOGIN_CHECK'), ({ data }) => Auth(data)],
  [propEq('operation', 'CHARACTER/NAME_CHECK'), ({ data }) => nameCheck(data)],
  [propEq('operation', 'CHARACTER/NEW'), ({ data }) => registerNewCharacter(data)],
  [propEq('operation', 'CHARACTER/LIST'), ({ data }) => getCharactersByAccountId(data)],
  [propEq('operation', 'CHARACTER/GET'), ({ data }) => getCharacterById(data)],
  [propEq('operation', 'CHARACTER/DELETE'), ({ data }) => deleteCharacter(data)],
  [T, () => {}],
]);

export default (operation, data) => getHandler({ operation, data });
