import net from 'net';
import uid from 'uuid/v1';

const server = new net.Socket();
const dataQueue = [];

export const connectData = () => {
  server.connect(3535, '127.0.0.1');

  server.on('data', (data) => {
    const response = JSON.parse(data);
    const requestOnQueue = dataQueue.find(req => req.id === response.id);
    const { resolve } = requestOnQueue;

    resolve(response.data);
  });
};

export const askData = data => new Promise((resolve, reject) => {
  const requestId = uid();

  const request = JSON.stringify({
    id: requestId,
    data,
  });

  dataQueue.push({
    id: requestId,
    resolve,
    reject,
  });

  server.write(request);

  setTimeout(() => {
    reject(new Error('DataServer Timeout'));
  }, 2000);
});

export default server;
