import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';

export default ({ name, result }) => (
  new PacketWriter(SEND_OPCODES.CHARACTER_NAME_REQUEST)
    .writeString(name)
    .write(result)
    .getBufferCopy()
);
