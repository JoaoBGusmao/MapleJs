import { cond, propEq, T } from 'ramda';
import { getMakeCharInfo } from './Etc';

const getHandler = cond([
  [propEq('operation', 'ETC/GET_MAKE_CHAR_INFO'), ({ data }) => getMakeCharInfo(data)],
  [T, () => {}],
]);

export default (operation, data) => {
  getHandler({ operation, data });
};
