import 'dotenv/config';
import net from 'net';
import { PacketReader, PacketWriter } from 'mapleendian';
import uid from 'uuid/v1';
import crypto from 'crypto';
import handler from './Handlers/handlerSelector';
import store from './Base/Redux/store';
import { updateConnection, updateFakePorts } from './Base/Redux/Actions/connection';
import { initCenter } from '../Common/Intercommunication/center';
import { initData } from '../Common/Intercommunication/data';
import MapleSocket from '../Common/MapleSocket';
import ExecutionTimeClass from '../Common/ExecutionTime';

global.ExecutionTime = new ExecutionTimeClass();

const LoginServer = (port) => {
  initCenter();
  initData();

  const server = net.createServer();

  server.on('connection', (socket) => {
    socket.setNoDelay(true);
    console.log('New connection started');
    const sessionId = uid();
    const currentSocket = socket;
    const sequence = {
      client: new Uint8Array(crypto.randomBytes(4)),
      server: new Uint8Array(crypto.randomBytes(4)),
    };

    currentSocket.header = true;
    currentSocket.nextBlockLen = 4;
    currentSocket.buffer = Buffer.alloc(0);
    currentSocket.sequence = sequence;
    currentSocket.sessionId = sessionId;

    // Send handshake
    const packet = new PacketWriter();
    packet.writeShort(2 + 2 + '1'.length + 4 + 4 + 1);
    packet.writeShort(83);
    packet.writeShort(1);
    packet.write(49);
    packet.writeArray(currentSocket.sequence.client);
    packet.writeArray(currentSocket.sequence.server);
    packet.write(8);

    const helloResponse = {
      sid: sessionId,
      packet: packet.getBufferCopy(),
    };

    currentSocket.write(JSON.stringify(helloResponse));

    currentSocket.sendPacket = (data) => {
      let buffer = Buffer.alloc(4);
      MapleSocket.generateHeader(buffer, currentSocket.sequence.server, data.length, -(83 + 1));
      const header = buffer;
      buffer = data;
      MapleSocket.encryptData(buffer, currentSocket.sequence.server);

      currentSocket.sequence.server = MapleSocket.morphSequence(currentSocket.sequence.server);

      const ret = Buffer.alloc(buffer.length + 4);
      header.copy(ret, 0, 0);
      buffer.copy(ret, 4, 0);
      currentSocket.write(ret);
    };

    currentSocket.on('data', (receivedData) => {
      currentSocket.pause();
      const parsed = JSON.parse(receivedData);

      if (parsed.plain && parsed.fakePorts) {
        const action = {};
        action[currentSocket.sessionId] = parsed.fakePorts;

        store.dispatch(updateFakePorts({ ...action }));
        currentSocket.resume();
        return;
      }

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

          const incommingPacket = new PacketReader(block);
          updateConnection(currentSocket);
          handler(incommingPacket.opCode, incommingPacket, currentSocket);
        }

        currentSocket.header = !currentSocket.header;
      }
      currentSocket.resume();
    });
  });

  server.listen(port);
};

LoginServer(8484);
