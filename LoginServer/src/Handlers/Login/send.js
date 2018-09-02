import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';

export const LoginFailed = ({ reason }) => {
  const Writer = new PacketWriter(SEND_OPCODES.LOGIN_STATUS);
  Writer.writeUInt16(4);
  Writer.writeUInt32(0);
  // Writer.writeUInt32(0);

  return Writer.getBufferCopy();
};

export const nothing = () => {};
