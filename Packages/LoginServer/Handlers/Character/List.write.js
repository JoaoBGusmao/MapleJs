import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';
import { setCharacterInformation } from './Character.write';

export default (account, characters) => {
  const Writer = new PacketWriter(SEND_OPCODES.CHARACTER_LIST);
  Writer.write(0);
  Writer.write(characters.length);
  characters.forEach(character => setCharacterInformation(Writer, character));
  Writer.write(account.PIC === '' ? 0 : 1);
  Writer.writeInt(3);

  return Writer.getBufferCopy();
};
