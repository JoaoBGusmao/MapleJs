import CharacterList from './List.write';
import { CenterCommunication } from '../../../Common/Intercommunication/center';
import { getAccount } from '../../Base/Redux/Selectors/account';

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

    client.sendPacket(CharacterList(account, getCharacters.characters));
  } catch (err) {
    console.log(err);
  }
};
