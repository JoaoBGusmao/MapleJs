import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';
import { setCharacterInformation } from './Character.write';

export default ({ character }) => {
  const Writer = new PacketWriter(SEND_OPCODES.ADD_NEW_CHARACTER);
  Writer.write(0);
  setCharacterInformation(Writer, character);

  return Writer.getBufferCopy();
};
