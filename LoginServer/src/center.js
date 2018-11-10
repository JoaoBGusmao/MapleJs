import dgram from 'dgram';
import uid from 'uuid/v1';

const server = dgram.createSocket('udp4');
const centerQueue = [];

export const initCenter = () => {
  server.on('message', (data) => {
    const response = JSON.parse(data);
    const requestOnQueue = centerQueue.find(req => req.id === response.id);
    const { resolve } = requestOnQueue;

    resolve(response.data);
  });
};

export const CenterCommunication = data => new Promise((resolve, reject) => {
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

  const message = Buffer.from(request);
  server.send(message, 0, message.length, 9595, '127.0.0.1');

  setTimeout(() => {
    reject(new Error('Center Timeout'));
  }, 2000);
});

export default server;
