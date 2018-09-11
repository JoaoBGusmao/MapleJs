import 'dotenv/config';
import Server from './src/server';
import { connectCenter } from './src/center';
import { connectData } from './src/data';

const bootServer = (port) => {
  connectCenter();
  connectData();

  Server(port);
};

bootServer(7484);
