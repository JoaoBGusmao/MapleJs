import 'dotenv/config';
import Server from './src/server';
import { connectCenter } from './src/center';

const bootServer = (port) => {
  connectCenter();

  Server(port);
};

bootServer(7484);
