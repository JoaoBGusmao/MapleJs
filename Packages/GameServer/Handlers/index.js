import { cond, propEq, T } from 'ramda';
import NoHandler from './NoHandler';
import CharacterEnterChannel from './CharacterEnterChannel';

const getHandler = cond([
  [propEq('header', 0x14), ({ reader, socket }) => CharacterEnterChannel(reader, socket)],
  [T, NoHandler],
]);

export default (header, reader, socket) => console.log('incomming header', header) || getHandler({ header, reader, socket });
