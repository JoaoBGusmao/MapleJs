import 'dotenv/config';
import Server from './src/server';
import { initCenter } from './src/center';
import { initData } from './src/data';

const bootServer = (port) => {
  initCenter();
  initData();

  Server(port);
};

bootServer(7484);
