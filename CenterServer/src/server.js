import net from 'net';

export default (port) => {
  const centerServer = net.createServer();

  centerServer.on('connection', (socket) => {
    console.log('Connection with center accepted');

    socket.on('data', async (data) => {
      const request = JSON.parse(data);
      const { operation } = request;

      // await handleOperation(operation, request.data);

      const response = {
        id: request.id,
        data: 'nothing here',
      };

      socket.write(JSON.stringify(response));
    });
  });

  centerServer.listen(port);
};
