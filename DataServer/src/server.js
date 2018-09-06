import net from 'net';
import handleOperation from './DataProcessor';

export default (port) => {
  const dataServer = net.createServer();

  dataServer.on('connection', (socket) => {
    console.log('Connection with data accepted');

    socket.on('data', async (data) => {
      const request = JSON.parse(data);
      const { operation } = request.data;

      const dataResponse = await handleOperation(operation, request.data.data);

      const response = {
        id: request.id,
        data: dataResponse,
      };

      socket.write(JSON.stringify(response));
    });
  });

  dataServer.listen(port);
};
