import { cond, propEq, T } from 'ramda';
import { RECEIVE_OPCODES } from '../Base/constants';
import Login from './Login';
import NoHandler from './NoHandler';

const getHandler = () => cond([
  [propEq('opcode', 0x01), () => Login],
  [T, () => NoHandler],
]);

export default (header, reader) => {
  const handler = getHandler()({ opcode: header });

  handler(reader);
};
