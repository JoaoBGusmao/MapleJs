import { LoginFailed } from './send';
import { askCenter } from '../../center';

/* Business logic of ServerList
 * Handler name: ServerListRequestHandler
 *
 * This handle is responsable to tell the client
 * all worlds that can be connected
 *
 * Received:
 * - nothing
 *
 * Expected:
 * - A world list
 * - End of server list
 * - Selected world (or world with more characters)
 * - Recommended list
 */

export default async (reader, client) => {
  try {
    // This handle wont be fully done now

    // return client.write(LoginFailed({ reason: LOGIN_RESPONSE.WRONG_PASSWORD }));
  } catch (err) {
    // return client.write(LoginFailed({ reason: LOGIN_RESPONSE.SYSTEM_FAILURE }));
  }
};
