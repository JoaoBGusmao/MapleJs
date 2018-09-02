import { cond, propEq, T } from 'ramda';
import Login from './Login';
import NoHandler from './NoHandler';

const getHandler = cond([
  [propEq('header', 0x01), ({ reader, socket }) => Login(reader, socket)],
  [T, NoHandler],
]);

export default (header, reader, socket) => getHandler({ header, reader, socket });
