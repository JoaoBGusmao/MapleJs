import { cond, propEq, T } from 'ramda';
import Login from './Login';
import NoHandler from './NoHandler';
import ServerList from './ServerList';
import ServerStatus from './ServerStatus';
import CharList from './CharList';
import NameCheck from './NameCheck';
import CreateCharacter from './CreateCharacter';

const getHandler = cond([
  [propEq('header', 0x01), ({ reader, socket }) => Login(reader, socket)],
  [propEq('header', 0x05), ({ reader, socket }) => CharList(reader, socket)],
  [propEq('header', 0x06), ({ reader, socket }) => ServerStatus(reader, socket)],
  [propEq('header', 0x0B), ({ reader, socket }) => ServerList(reader, socket)],
  [propEq('header', 0x15), ({ reader, socket }) => NameCheck(reader, socket)],
  [propEq('header', 0x16), ({ reader, socket }) => CreateCharacter(reader, socket)],
  [T, NoHandler],
]);

export default (header, reader, socket) => console.log('incomming header', header) || getHandler({ header, reader, socket });
