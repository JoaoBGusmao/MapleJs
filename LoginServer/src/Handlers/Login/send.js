import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';

export const LoginFailed = ({ reason }) => {
  const Writer = new PacketWriter(SEND_OPCODES.LOGIN_STATUS);
  Writer.writeUInt16(reason);
  Writer.writeUInt32(0);
  // Writer.writeUInt32(0);

  return Writer.getBufferCopy();
};

export const LoginSuccess = () => {
  const Writer = new PacketWriter(SEND_OPCODES.LOGIN_STATUS);
  Writer.writeUInt32(0);
  Writer.writeUInt16(0);
  Writer.writeUInt32(1); // accountid
  Writer.writeUInt8(1); // gender
  Writer.writeUInt8(0); // admin
  Writer.writeUInt8(0); // admin level
  Writer.writeUInt8(0); // admin level
  Writer.writeString('gmchuck');
  Writer.writeUInt8(0);
  Writer.writeUInt8(0); // mute
  Writer.writeDate(0); // mute time
  Writer.writeDate(new Date()); // mute time
  Writer.writeUInt32(0); // mute time
  Writer.writeUInt16(2); // mute time

  return Writer.getBufferCopy();
};
