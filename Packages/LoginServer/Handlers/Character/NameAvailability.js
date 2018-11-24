import { CenterCommunication } from '../../../Common/Intercommunication/center';
import nameAvailabilityResponse from './NameAvailability.write.js';
import read from './NameAvailability.read';
import { NAME_CHECK_RESPONSE } from '../../Base/constants';

const getResultCode = (result) => {
  if (result.success && result.failedReason === undefined) {
    return NAME_CHECK_RESPONSE.AVAILABLE;
  }

  if (result.failedReason !== undefined && result.failedReason === 'ALREADY_EXISTS') {
    return NAME_CHECK_RESPONSE.ALREADY_IN_USE;
  }

  return NAME_CHECK_RESPONSE.UNKNOWN_ERROR;
};

export default async ({ reader, client }) => {
  const data = read(reader);

  try {
    // TODO: check can use this name

    const nameCheckResponse = await CenterCommunication({
      operation: 'CHARACTER/NAME_CHECK',
      data,
    });

    const result = getResultCode(nameCheckResponse);

    return client.sendPacket(nameAvailabilityResponse({ name: data.name, result }));
  } catch (err) {
    return client.sendPacket(nameAvailabilityResponse({
      name: data.name,
      result: NAME_CHECK_RESPONSE.UNKNOWN_ERROR,
    }));
  }
};
