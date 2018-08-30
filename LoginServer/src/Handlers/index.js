import { RECEIVE_OPCODES } from '../Base/constants';
import Login from './Login';

export default (header, reader) => {
  if (RECEIVE_OPCODES[header] === 'LOGIN_PASSWORD') {
    Login(reader);
  }
};
