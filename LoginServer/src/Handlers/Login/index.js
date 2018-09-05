import recv from './recv';
import { LoginFailed, LoginSuccess } from './send';
import { askCenter } from '../../center';
import { LOGIN_RESPONSE } from '../../Base/constants';

/* Business logic of LOGIN
 * Handler name: LoginPasswordHandler
 *
 * This handle is responsable to determine the
 * abillity of someone to get into the game
 *
 * Received:
 * - login (string)
 * - password (string)
 *
 * Expected:
 * - Login failed with code 3 if banned ip or banned mac
 * - Tempban response if temporarily banned from the game
 * - Permaban respinse if permanently banned from the game
 * - Login failed if password or username invalid
 * - Authentication successful if everything is right
 * - Authentication failed with status 7 (maybe unknown error)
 */

export default async (reader, client) => {
  try {
    const data = recv(reader);

    const loginResponse = await askCenter({
      operation: 'ACCOUNT/LOGIN_CHECK',
      data,
    });

    if (loginResponse.success) {
      return client.write(LoginSuccess());
    }

    if (loginResponse.failedReason === 'LOGIN_NOT_FOUND') {
      return client.write(LoginFailed({ reason: LOGIN_RESPONSE.LOGIN_NOT_FOUND }));
    }

    if (loginResponse.failedReason === 'WRONG_PASSWORD') {
      return client.write(LoginFailed({ reason: LOGIN_RESPONSE.WRONG_PASSWORD }));
    }

    return client.write(LoginFailed({ reason: LOGIN_RESPONSE.SYSTEM_FAILURE }));
  } catch (err) {
    return client.write(LoginFailed({ reason: LOGIN_RESPONSE.SYSTEM_FAILURE }));
  }
};
