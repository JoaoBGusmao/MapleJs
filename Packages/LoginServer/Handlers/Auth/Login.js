import { bindActionCreators } from 'redux';
import read from './Login.read';
import { LoginFailed, LoginSuccess } from './Login.write';
import { CenterCommunication } from '../../../Common/Intercommunication/center';
import { LOGIN_RESPONSE } from '../../Base/constants';
import { updateAccount as updateAccountAction } from '../../Base/Redux/Actions/account';
import connect from '../../Base/Redux/connect';

const Login = async ({ reader, client, updateAccount }) => {
  try {
    const data = read(reader);

    const loginResponse = await CenterCommunication({
      operation: 'ACCOUNT/LOGIN_CHECK',
      data,
    });

    if (loginResponse.success) {
      const action = {};
      action[client.sessionId] = loginResponse.account;

      updateAccount({ ...action });
      return client.sendPacket(LoginSuccess(loginResponse.account));
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

const mapActions = dispatch => bindActionCreators({
  updateAccount: updateAccountAction,
}, dispatch);

export default connect(undefined, mapActions)(Login);
