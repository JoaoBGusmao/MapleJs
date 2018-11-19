import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';
import { setCharacterInformation } from '../CharList/send';

export default ({ character }) => {
  const Writer = new PacketWriter(SEND_OPCODES.ADD_NEW_CHAR);
  Writer.write(0);
  setCharacterInformation(Writer, character);

  return Writer.getBufferCopy();
};
