import read from './SelectWithPIC.read.js';
import { WrongPIC, ServerIP } from './SelectWithPIC.write';
import { getAccount } from '../../Base/Redux/Selectors/account';
import { checkPIC } from '../../Controllers/Account';
import { getFakePorts } from '../../Base/Redux/Selectors/connection';

export default async ({ reader, client }) => {
  try {
    const { PIC, characterId } = read(reader);
    const account = getAccount(client.sessionId);
    const fakePorts = getFakePorts(client.sessionId);

    if (checkPIC(account, PIC)) {
      return client.sendPacket(ServerIP(fakePorts[7575], { characterId }));
    }

    return client.sendPacket(WrongPIC());
  } catch (err) {
    // unknown error
    return [];
  }
};
