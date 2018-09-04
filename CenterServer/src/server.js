import net from 'net';
import handleOperation from './Handlers';

export default (port) => {
  const centerServer = net.createServer();

  centerServer.on('connection', (socket) => {
    console.log('Connection with center accepted');

    socket.on('data', async (data) => {
      const request = JSON.parse(data);
      const { operation } = request.data;

      const databaseResponse = await handleOperation(operation, request.data.data);

      const response = {
        id: request.id,
        data: databaseResponse,
      };

      socket.write(JSON.stringify(response));
    });
  });

  centerServer.listen(port);
};
