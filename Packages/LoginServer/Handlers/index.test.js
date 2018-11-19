import { PacketReader } from 'mapleendian';
import handler from './index';

describe('Packet Handler', () => {
  it('Should return login handler', () => {
    const loginPacket = Buffer.from([0x01, 0x01]);
    const reader = new PacketReader(loginPacket);
    const header = reader.readUInt16();

    const result = handler(header, reader);

    expect(result).toBe(1);
  });
});
