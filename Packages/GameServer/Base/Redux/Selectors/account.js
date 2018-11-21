import store from '../store';

export const nothing = () => null;

export const getAccount = (id) => {
  const { accounts } = store.getState();

  return accounts[id];
};
