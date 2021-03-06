import { CONNECTION_CONSTS } from '../../constants';

const initialState = {
  connectedClients: {},
  fakePorts: {},
};

const updateConnection = (state, action) => {
  const connection = action.payload;
  const newConnection = {};
  newConnection[connection.sid] = connection;

  return {
    ...state,
    connectedClients: {
      ...state.connectedClients,
      ...newConnection,
    },
  };
};

const updateFakePorts = (state, action) => ({
  ...state,
  fakePorts: {
    ...state.fakePorts,
    ...action.payload,
  },
});

const connectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECTION_CONSTS.UPDATE_CONNECTION:
      return updateConnection(state, action);
    case CONNECTION_CONSTS.UPDATE_FAKE_PORTS:
      return updateFakePorts(state, action);
    default:
      return state;
  }
};

export default connectionReducer;
