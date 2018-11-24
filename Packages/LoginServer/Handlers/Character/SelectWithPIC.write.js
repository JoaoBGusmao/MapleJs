import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';

export const WrongPIC = () => (
  new PacketWriter(SEND_OPCODES.CHECK_SPW_RESULT)
    .write(0)
    .getBufferCopy()
);

export const ServerIP = (fakeServerPort, { characterId }) => (
  new PacketWriter(SEND_OPCODES.SERVER_IP)
    .writeShort(0)
    .writeArray([127, 0, 0, 1])
    .writeShort(fakeServerPort)
    .writeInt(characterId)
    .writeArray([0, 0, 0, 0, 0])
    .getBufferCopy()
);
