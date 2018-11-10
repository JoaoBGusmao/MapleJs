import { PacketWriter } from 'mapleendian';
import { SEND_OPCODES } from '../../Base/constants';

export default ({ name, result }) => {
  const Writer = new PacketWriter(SEND_OPCODES.CHAR_NAME_REQUEST);
  Writer.writeString(name);
  Writer.write(result);

  return Writer.getBufferCopy();
};
