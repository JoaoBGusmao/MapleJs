import { CharList } from './send';
import { CenterCommunication } from '../../center';

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
    const queryData = {
      accountId: 1,
    };

    const getCharacters = await CenterCommunication({
      operation: 'CHARACTER/LIST',
      data: queryData,
    });

    client.write(CharList(getCharacters.characters));
  } catch (err) {
    console.log(err);
    return [];
  }
};
