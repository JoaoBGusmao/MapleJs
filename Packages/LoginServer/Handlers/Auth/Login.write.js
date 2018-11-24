import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';

export const LoginFailed = ({ reason }) => (
  new PacketWriter(SEND_OPCODES.LOGIN_STATUS)
    .write(reason)
    .write(0)
    .writeInt(0)
    .getBufferCopy()
);

export const LoginSuccess = ({
  account_id,
  username,
  gender,
}) => (
  new PacketWriter(SEND_OPCODES.LOGIN_STATUS)
    .writeInt(0)
    .writeShort(0)
    .writeInt(account_id) // accountid
    .write(gender) // gender
    .write(0) // admin
    .write(0) // admin level
    .write(0) // admin level
    .writeString(username)
    .write(0)
    .write(0) // mute
    .writeDate(0) // mute time
    .writeDate(new Date()) // mute time
    .writeInt(0) // mute time
    .writeShort(2) // mute time
    .getBufferCopy()
);
