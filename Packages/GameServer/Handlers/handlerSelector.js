import { cond, propEq, T } from 'ramda';
import NoHandler from './NoHandler';
import CharacterEnterChannel from './Character/EnterChannel';

const getHandler = cond([
  [propEq('header', 0x14), CharacterEnterChannel],
  [T, NoHandler],
]);

export default (header, reader, client) => getHandler({ header, reader, client });
