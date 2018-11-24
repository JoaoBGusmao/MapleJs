import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';

export const ServerList = () => (
  new PacketWriter(SEND_OPCODES.SERVER_LIST)
    .writeUInt8(1)
    .writeString('BMS Orion')
    .writeUInt8(0)
    .writeString('Event message')
    .writeUInt16(100)
    .writeUInt16(100)
    .writeUInt8(0)
    .getBufferCopy()
);

export const nothing = () => {};
