import { cond, propEq, T } from 'ramda';
import Login from './Auth/Login';
import NoHandler from './NoHandler';
import ServerList from './Server/List';
import ServerStatus from './Server/Status';
import CharacterList from './Character/List';
import NameAvailability from './Character/NameAvailability';
import CreateCharacter from './Character/Create';
import DeleteCharacter from './Character/Delete';
import SelectCharacterWithPIC from './Character/SelectWithPIC';

const getHandler = cond([
  [propEq('header', 0x01), ({ reader, socket }) => Login(reader, socket)],
  [propEq('header', 0x04), ({ reader, socket }) => ServerList(reader, socket)],
  [propEq('header', 0x05), ({ reader, socket }) => CharacterList(reader, socket)],
  [propEq('header', 0x06), ({ reader, socket }) => ServerStatus(reader, socket)],
  [propEq('header', 0x0B), ({ reader, socket }) => ServerList(reader, socket)],
  [propEq('header', 0x1E), ({ reader, socket }) => SelectCharacterWithPIC(reader, socket)],
  [propEq('header', 0x15), ({ reader, socket }) => NameAvailability(reader, socket)],
  [propEq('header', 0x16), ({ reader, socket }) => CreateCharacter(reader, socket)],
  [propEq('header', 0x17), ({ reader, socket }) => DeleteCharacter(reader, socket)],
  [T, NoHandler],
]);

export default (header, reader, socket) => getHandler({ header, reader, socket });
