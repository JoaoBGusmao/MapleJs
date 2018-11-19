import 'dotenv/config';
import net from 'net';
import { PacketReader } from 'mapleendian';
import handler from './Handlers';
import store from './Base/Redux/store';
import { updateConnection } from './Base/Redux/Actions/connection';
import { initCenter } from './center';
import { initData } from './data';

const LoginServer = (port) => {
  initCenter();
  initData();

  const server = net.createServer();

  server.on('connection', (connection) => {
    const socket = connection;
    console.log('New connection started');

    socket.on('data', (receivedData) => {
      const data = JSON.parse(receivedData);
      const buffer = Buffer.from(data.packet);
      const incommingPacket = new PacketReader(buffer);
      socket.sid = data.sid;

      store.dispatch(updateConnection(socket));

      handler(incommingPacket.opCode, incommingPacket, socket);
    });
  });

  server.listen(port);
};

LoginServer(7484);
