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
  [propEq('header', 0x01), Login],
  [propEq('header', 0x04), ServerList],
  [propEq('header', 0x05), CharacterList],
  [propEq('header', 0x06), ServerStatus],
  [propEq('header', 0x0B), ServerList],
  [propEq('header', 0x1E), SelectCharacterWithPIC],
  [propEq('header', 0x15), NameAvailability],
  [propEq('header', 0x16), CreateCharacter],
  [propEq('header', 0x17), DeleteCharacter],
  [T, NoHandler],
]);

export default (header, reader, client) => getHandler({ header, reader, client });
