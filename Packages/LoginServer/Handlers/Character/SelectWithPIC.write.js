import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';

export const WrongPIC = () => {
  const Writer = new PacketWriter(SEND_OPCODES.CHECK_SPW_RESULT);
  Writer.write(0);

  return Writer.getBufferCopy();
};

export const ServerIP = (fakeServerPort, { characterId }) => {
  const Writer = new PacketWriter(SEND_OPCODES.SERVER_IP);
  Writer.writeShort(0);
  Writer.writeArray([127, 0, 0, 1]);
  Writer.writeShort(fakeServerPort);
  Writer.writeInt(characterId);
  Writer.writeArray([0, 0, 0, 0, 0]);

  return Writer.getBufferCopy();
};
