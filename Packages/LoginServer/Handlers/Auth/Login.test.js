import { LoginFailed, LoginSuccess } from './Login.write';
import { LOGIN_RESPONSE } from '../../Base/constants';
import { normalAccount } from '../../Mocks/Account';

describe('Login', () => {
  it('Test login packet: Wrong password', () => {
    const loginFailedPacket = LoginFailed({ reason: LOGIN_RESPONSE.WRONG_PASSWORD });

    expect([...loginFailedPacket]).toEqual([0, 0, 4, 0, 0, 0, 0, 0]);
  });

  it('Test login packet: Login not found', () => {
    const loginFailedPacket = LoginFailed({ reason: LOGIN_RESPONSE.LOGIN_NOT_FOUND });

    expect([...loginFailedPacket]).toEqual([0, 0, 5, 0, 0, 0, 0, 0]);
  });

  it('Test login packet: System failure', () => {
    const loginFailedPacket = LoginFailed({ reason: LOGIN_RESPONSE.SYSTEM_FAILURE });

    expect([...loginFailedPacket]).toEqual([0, 0, 6, 0, 0, 0, 0, 0]);
  });

  it('Test login packet: Success', () => {
    const loginFailedPacket = LoginSuccess({ ...normalAccount });
    const response = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
      0, 0, 0, 0, 0, 0, 5, 0, 67, 104, 117, 99, 107,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 2, 0];

    expect([...loginFailedPacket]).toEqual(response);
  });
});
