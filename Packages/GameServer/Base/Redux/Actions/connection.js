import { CONNECTION_CONSTS } from '../../constants';

export const updateConnection = payload => ({ type: CONNECTION_CONSTS.UPDATE_CONNECTION, payload });
export const updateFakePorts = payload => ({ type: CONNECTION_CONSTS.UPDATE_FAKE_PORTS, payload });
