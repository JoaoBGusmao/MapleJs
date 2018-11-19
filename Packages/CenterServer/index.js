import 'dotenv/config';
import dgram from 'dgram';
import handleOperation from './Handlers';

const CenterServer = (port) => {
  const centerServer = dgram.createSocket('udp4');

  centerServer.on('message', async (data, remote) => {
    const request = JSON.parse(data);
    const { operation } = request.data;

    const databaseResponse = await handleOperation(operation, request.data.data);

    const response = {
      id: request.id,
      data: databaseResponse,
    };

    const message = Buffer.from(JSON.stringify(response));
    centerServer.send(message, 0, message.length, remote.port, remote.address);
  });

  centerServer.bind(port);
};

CenterServer(9595);
