import store from '../store';

export const nothing = () => null;

export const getFakePorts = (id) => {
  const { connection } = store.getState();

  return connection.fakePorts[id];
};
