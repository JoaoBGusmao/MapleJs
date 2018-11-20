import deleteCharResponse from './send';
import recv from './recv';
import { getAccount } from '../../Base/Redux/Selectors/account';
import { CenterCommunication } from '../../center';
import { checkPIC } from '../../Controllers/Account';

/* Business logic of DeleteChar
 * Handler name: DeleteCharHandler
 *
 * This handle is responsable to delete
 * a character
 *
 * Received:
 * - pic
 * - cid
 *
 * Expected:
 * - success
 * || wrong pic
 */

export default async (reader, client) => {
  try {
    const { PIC, characterId } = recv(reader);

    const account = getAccount(client.sessionId);
    const character = await CenterCommunication({
      operation: 'CHARACTER/GET',
      data: { characterId },
    });

    if (checkPIC(account, PIC) && character.account_id === account.account_id) {
      const deleteStatus = await CenterCommunication({
        operation: 'CHARACTER/DELETE',
        data: { characterId },
      });

      if (deleteStatus.success) {
        return client.sendPacket(deleteCharResponse({ cid: characterId, state: 0 }));
      }

      return client.sendPacket(deleteCharResponse({ cid: characterId, state: 6 }));
    }

    return client.sendPacket(deleteCharResponse({ cid: characterId, state: 20 }));
  } catch (err) {
    return client.sendPacket(deleteCharResponse({ cid: 0, state: 6 }));
  }
};
