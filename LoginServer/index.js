import 'dotenv/config';
import Server from './src/server';
import { initCenter } from './src/center';
import { connectData } from './src/data';

const bootServer = (port) => {
  initCenter();
  connectData();

  Server(port);
};

bootServer(7484);
