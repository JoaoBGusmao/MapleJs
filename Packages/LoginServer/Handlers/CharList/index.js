import { CharList } from './send';
import { CenterCommunication } from '../../../Common/Intercommunication/center';
import { getAccount } from '../../Base/Redux/Selectors/account';

/* Business logic of CharList
 * Handler name: CharListRequestHandler
 *
 * This handle is responsable to show the
 * list of players in a world
 *
 * Received:
 * - nothing
 *
 * Expected:
 * - char list
 */

export default async (reader, client) => {
  try {
    const account = getAccount(client.sessionId);
    const queryData = {
      accountId: account.account_id,
    };

    const getCharacters = await CenterCommunication({
      operation: 'CHARACTER/LIST',
      data: queryData,
    });

    client.sendPacket(CharList(account, getCharacters.characters));
  } catch (err) {
    console.log(err);
    return [];
  }
};
