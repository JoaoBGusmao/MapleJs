import 'dotenv/config';
import Server from './src/server';

const bootServer = (port) => {
  // Connection with center

  Server(port);
};

bootServer(7484);
