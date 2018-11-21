import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';

export const WrongPIC = () => {
  const Writer = new PacketWriter(SEND_OPCODES.CHECK_SPW_RESULT);
  Writer.write(0);

  return Writer.getBufferCopy();
};

export const ServerIP = ({ characterId }) => {
  const Writer = new PacketWriter(SEND_OPCODES.SERVER_IP);
  Writer.write(0);
  Writer.write([127, 0, 0, 1]);
  Writer.writeShort(7575);
  Writer.writeInt(characterId);
  Writer.write([0, 0, 0, 0, 0]);

  return Writer.getBufferCopy();
};
