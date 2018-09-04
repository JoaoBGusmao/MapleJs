import net from 'net';
import uid from 'uuid/v1';

const server = new net.Socket();
const centerQueue = [];

export const connectCenter = () => {
  server.connect(9595, '127.0.0.1');

  server.on('data', (data) => {
    const response = JSON.parse(data);
    const requestOnQueue = centerQueue.find(req => req.id === response.id);
    const { resolve } = requestOnQueue;

    resolve(response.data);
  });
};

export const askCenter = data => new Promise((resolve, reject) => {
  const requestId = uid();

  const request = JSON.stringify({
    id: requestId,
    data,
  });

  centerQueue.push({
    id: requestId,
    resolve,
    reject,
  });

  server.write(request);

  setTimeout(() => {
    reject(new Error('Center Timeout'));
  }, 2000);
});

export default server;
