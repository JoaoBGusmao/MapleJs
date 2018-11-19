import dgram from 'dgram';
import handleOperation from './DataProcessor';

const DataServer = (port) => {
  const dataServer = dgram.createSocket('udp4');

  dataServer.on('message', async (data, remote) => {
    const request = JSON.parse(data);
    const { operation } = request.data;

    const dataResponse = await handleOperation(operation, request.data.data);

    const response = {
      id: request.id,
      data: dataResponse,
    };

    const message = Buffer.from(JSON.stringify(response));
    dataServer.send(message, 0, message.length, remote.port, remote.address);
  });

  dataServer.bind(port);
};

DataServer(3535);
