import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';

export const LoginFailed = ({ reason }) => {
  const Writer = new PacketWriter(SEND_OPCODES.LOGIN_STATUS);
  Writer.write(reason);
  Writer.write(0);
  Writer.writeInt(0);

  return Writer.getBufferCopy();
};

export const LoginSuccess = ({
  account_id,
  username,
  gender,
}) => {
  console.log('account', account_id, username, gender);
  const Writer = new PacketWriter(SEND_OPCODES.LOGIN_STATUS);
  Writer.writeInt(0);
  Writer.writeShort(0);
  Writer.writeInt(account_id); // accountid
  Writer.write(gender); // gender
  Writer.write(0); // admin
  Writer.write(0); // admin level
  Writer.write(0); // admin level
  Writer.writeString(username);
  Writer.write(0);
  Writer.write(0); // mute
  Writer.writeDate(0); // mute time
  Writer.writeDate(new Date()); // mute time
  Writer.writeInt(0); // mute time
  Writer.writeShort(2); // mute time

  return Writer.getBufferCopy();
};