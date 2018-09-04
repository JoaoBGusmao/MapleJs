import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';

export const ServerList = () => {
  const Writer = new PacketWriter(SEND_OPCODES.SERVER_LIST);
  // Writer.

  return Writer.getBufferCopy();
};

export const nothing = () => { };
