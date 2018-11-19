import { CenterCommunication } from '../../center';
import charNameResponse from './send';
import recv from './recv';
import { NAME_CHECK_RESPONSE } from '../../Base/constants';

/* Business logic of NameCheck
 * Handler name: CheckCharNameHandler
 *
 * This handle is responsable to verify
 * if a character name is available
 *
 * Received:
 * - name to check
 *
 * Expected:
 * - Is the name is available or note
 */

const getResultCode = (result) => {
  if (result.success && result.failedReason === undefined) {
    return NAME_CHECK_RESPONSE.AVAILABLE;
  }

  if (result.failedReason !== undefined && result.failedReason === 'ALREADY_EXISTS') {
    return NAME_CHECK_RESPONSE.ALREADY_IN_USE;
  }

  return NAME_CHECK_RESPONSE.UNKNOWN_ERROR;
};

export default async (reader, client) => {
  const data = recv(reader);

  try {
    // TODO: check can use this name

    const nameCheckResponse = await CenterCommunication({
      operation: 'CHARACTER/NAME_CHECK',
      data,
    });

    const result = getResultCode(nameCheckResponse);

    return client.write(charNameResponse({ name: data.name, result }));
  } catch (err) {
    return client.write(charNameResponse({
      name: data.name,
      result: NAME_CHECK_RESPONSE.UNKNOWN_ERROR,
    }));
  }
};
