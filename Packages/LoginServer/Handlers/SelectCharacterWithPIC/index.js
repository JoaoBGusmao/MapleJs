import recv from './recv';
import { WrongPIC, ServerIP } from './send';
import { getAccount } from '../../Base/Redux/Selectors/account';
import { checkPIC } from '../../Controllers/Account';

export default async (reader, client) => {
  try {
    const { PIC, characterId, macs } = recv(reader);
    const account = getAccount(client.sessionId);

    if (checkPIC(account, PIC)) {
      return client.sendPacket(ServerIP({ characterId }));
    }

    return client.sendPacket(WrongPIC());
  } catch (err) {
    // unknown error
  }
};
