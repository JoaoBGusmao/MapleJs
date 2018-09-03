import net from 'net';
import crypto from 'crypto';
import uid from 'uuid/v1';
import { PacketWriter } from 'mapleendian';
import MapleSocket from './MapleSocket';

const realServer = (serverPort) => {
  const server = new net.Socket();
  let intervalConnect = false;

  const connect = port => server.connect(port, '127.0.0.1');

  const launchIntervalConnect = (port) => {
    if (intervalConnect !== false) {
      return;
    }
    intervalConnect = setInterval(() => connect(port), 5000);
  };

  const clearIntervalConnect = () => {
    if (!intervalConnect) {
      return;
    }

    clearInterval(intervalConnect);
    intervalConnect = false;
  };

  server.on('connect', () => {
    clearIntervalConnect();
  });

  server.on('close', () => {
    console.log('connection closed with real server.');
    launchIntervalConnect(serverPort);
  });

  server.on('error', () => {
    console.log('connection failed with real server.');
    launchIntervalConnect(serverPort);
  });

  connect(serverPort);

  return server;
};

export default (port, serverPort) => {
  const proxyServer = net.createServer();

  proxyServer.on('connection', (socket) => {
    console.log('Proxy connection accepted');
    const sessionId = uid();
    const currentSocket = socket;
    const sequence = {
      client: new Uint8Array(crypto.randomBytes(4)),
      server: new Uint8Array(crypto.randomBytes(4)),
    };

    const server = realServer(serverPort);

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

      console.log('received', Date.now());

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

    server.on('data', (data) => {
      let buffer = Buffer.alloc(4);
      MapleSocket.generateHeader(buffer, currentSocket.sequence.server, data.length, -(83 + 1));
      currentSocket.write(buffer);

      buffer = data;
      MapleSocket.encryptData(buffer, currentSocket.sequence.server);

      currentSocket.sequence.server = MapleSocket.morphSequence(currentSocket.sequence.server);

      console.log('sent', Date.now());
      currentSocket.write(buffer);
    });
  });

  proxyServer.listen(port);
};
