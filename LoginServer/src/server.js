import net from 'net';
import { PacketReader } from 'mapleendian';
import handler from './Handlers';

export default (port) => {
  const server = net.createServer();

  server.on('connection', (socket) => {
    console.log('New connection started');

    socket.on('data', (receivedData) => {
      const data = JSON.parse(receivedData);
      const buffer = Buffer.from(data.packet);
      const incommingPacket = new PacketReader(buffer);
      handler(incommingPacket.readUInt16(), incommingPacket);
    });
  });

  server.listen(port);
};
