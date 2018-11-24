import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';

export default ({ cid, state }) => {
  const Writer = new PacketWriter(SEND_OPCODES.DELETE_CHAR_RESPONSE);
  Writer.writeInt(cid);
  Writer.write(state);

  return Writer.getBufferCopy();
};
