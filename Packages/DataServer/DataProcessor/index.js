import { cond, propEq, T } from 'ramda';
import { getMakeCharInfo } from './Etc';
import { getMap } from './Map';

const getHandler = cond([
  [propEq('operation', 'ETC/GET_MAKE_CHAR_INFO'), getMakeCharInfo],
  [propEq('operation', 'MAP/GET_MAP'), getMap],
  [T, () => {}],
]);

export default (operation, data) => getHandler({ operation, data });
