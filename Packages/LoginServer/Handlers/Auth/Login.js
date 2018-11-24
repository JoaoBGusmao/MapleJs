import read from './Login.read';
import { LoginFailed, LoginSuccess } from './Login.write';
import { CenterCommunication } from '../../../Common/Intercommunication/center';
import { LOGIN_RESPONSE } from '../../Base/constants';
import store from '../../Base/Redux/store';
import { updateAccount } from '../../Base/Redux/Actions/account';

export default async (reader, socket) => {
  const client = socket;

  try {
    const data = read(reader);

    const loginResponse = await CenterCommunication({
      operation: 'ACCOUNT/LOGIN_CHECK',
      data,
    });

    if (loginResponse.success) {
      const action = {};
      action[socket.sessionId] = {
        ...loginResponse.account,
      };

      store.dispatch(updateAccount({ ...action }));
      return client.sendPacket(LoginSuccess({ ...loginResponse.account }));
    }

    if (loginResponse.failedReason === 'LOGIN_NOT_FOUND') {
      return client.sendPacket(LoginFailed({ reason: LOGIN_RESPONSE.LOGIN_NOT_FOUND }));
    }

    if (loginResponse.failedReason === 'WRONG_PASSWORD') {
      return client.sendPacket(LoginFailed({ reason: LOGIN_RESPONSE.WRONG_PASSWORD }));
    }

    return client.sendPacket(LoginFailed({ reason: LOGIN_RESPONSE.SYSTEM_FAILURE }));
  } catch (err) {
    console.log(err);
    return client.sendPacket(LoginFailed({ reason: LOGIN_RESPONSE.SYSTEM_FAILURE }));
  }
};
