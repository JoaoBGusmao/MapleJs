import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';

export const ServerList = () => {
  const Writer = new PacketWriter(SEND_OPCODES.SERVER_LIST);
  Writer.writeUInt8(1);
  Writer.writeString('BMS Orion');
  Writer.writeUInt8(0);
  Writer.writeString('Event message');
  Writer.writeUInt16(100);
  Writer.writeUInt16(100);
  Writer.writeUInt8(0);

  return Writer.getBufferCopy();
};

export const nothing = () => { };
