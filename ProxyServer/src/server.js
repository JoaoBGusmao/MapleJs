import net from 'net';
import crypto from 'crypto';
import uid from 'uuid/v1';
import { PacketWriter } from 'mapleendian';
import MapleSocket from './MapleSocket';
// import PacketWriter from './PacketWriter';

export default (port, serverPort) => {
  const proxyServer = net.createServer();

  proxyServer.on('connection', (socket) => {
    const sessionId = uid();
    const currentSocket = socket;
    const sequence = {
      client: new Uint8Array(crypto.randomBytes(4)),
      server: new Uint8Array(crypto.randomBytes(4)),
    };

    const server = new net.Socket();
    server.connect(serverPort, '127.0.0.1');

    currentSocket.header = true;
    currentSocket.nextBlockLen = 4;
    currentSocket.buffer = Buffer.alloc(0);
    currentSocket.sequence = sequence;
    currentSocket.sessionId = sessionId;

    // Send handshake
    const packet = new PacketWriter();
    packet.writeUInt16(2 + 2 + '1'.length + 4 + 4 + 1);
    packet.writeUInt16(83);
    packet.writeString('1');
    packet.writeBytes(currentSocket.sequence.client);
    packet.writeBytes(currentSocket.sequence.server);
    packet.writeUInt8(8);

    const helloResponse = {
      sid: sessionId,
      packet: packet.getBufferCopy(),
    };

    currentSocket.write(JSON.stringify(helloResponse));

    currentSocket.on('data', (receivedData) => {
      currentSocket.pause();

      const parsed = JSON.parse(receivedData);
      const packetData = Buffer.from(parsed.packet);
      const temp = currentSocket.buffer;
      currentSocket.buffer = Buffer.concat([temp, packetData]);

      while (currentSocket.nextBlockLen <= currentSocket.buffer.length) {
        const data = currentSocket.buffer;

        const block = Buffer.alloc(currentSocket.nextBlockLen);
        data.copy(block, 0, 0, block.length);
        currentSocket.buffer = Buffer.alloc(data.length - block.length);
        data.copy(currentSocket.buffer, 0, block.length);

        if (currentSocket.header) {
          currentSocket.nextBlockLen = MapleSocket.getLengthFromHeader(block);
        } else {
          currentSocket.nextBlockLen = 4;
          MapleSocket.decryptData(block, currentSocket.sequence.client);
          currentSocket.sequence.client = MapleSocket.morphSequence(currentSocket.sequence.client);

          const withSession = {
            sid: parsed.sid,
            packet: block,
          };

          server.write(JSON.stringify(withSession));
        }

        currentSocket.header = !currentSocket.header;
      }
      currentSocket.resume();
    });
  });

  proxyServer.listen(port);
};
