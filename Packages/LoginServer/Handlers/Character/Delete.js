import deleteCharResponse from './Delete.write';
import read from './Delete.read';
import { getAccount } from '../../Base/Redux/Selectors/account';
import { CenterCommunication } from '../../../Common/Intercommunication/center';
import { checkPIC } from '../../Controllers/Account';

export default async ({ reader, client }) => {
  try {
    const { PIC, characterId } = read(reader);

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
