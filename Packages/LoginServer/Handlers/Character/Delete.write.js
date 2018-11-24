import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';

export default ({ cid, state }) => (
  new PacketWriter(SEND_OPCODES.DELETE_CHAR_RESPONSE)
    .writeInt(cid)
    .write(state)
    .getBufferCopy()
);
