import recv from './recv';
import { askData } from '../../data';
import { CenterCommunication } from '../../center';
import deleteCharResponse from '../DeleteCharacter/send';

/* Business logic of CreateChar
 * Handler name: CreateCharHandler
 *
 * This handle is responsable to create
 * a new character
 *
 * Received:
 * - name
 * - job
 * - face
 * - hair
 * - hairColor
 * - skincolor
 * - top
 * - bottom
 * - shoes
 * - weapon
 * - gender
 *
 * Expected:
 * - new char entry
 * || error
 */

const checkData = (selection, compareData) => compareData.indexOf(selection) !== -1;

const validadeCharCreation = async ({
  face,
  hair,
  hairColor,
  skinColor,
  topWear,
  bottomWear,
  shoes,
  weapon,
  gender,
}) => {
  try {
    const makeCharInfo = await askData({ operation: 'ETC/GET_MAKE_CHAR_INFO' });
    const genderData = gender === 0 ? makeCharInfo.CharMale : makeCharInfo.CharFemale;

    // TODO: Check for name again

    const hasValidSelection = (
      checkData(face, genderData[0])
      && checkData(hair, genderData[1])
      && checkData(hairColor, genderData[2])
      && checkData(skinColor, genderData[3])
      && checkData(topWear, genderData[4])
      && checkData(bottomWear, genderData[5])
      && checkData(shoes, genderData[6])
      && checkData(weapon, genderData[7]));

    return hasValidSelection;
  } catch (err) {
    return false;
  }
};

export default async (reader, client) => {
  try {
    const newCharData = recv(reader);
    const isValidSelection = await validadeCharCreation(newCharData);
    if (!isValidSelection) {
      return client.write(deleteCharResponse({ cid: 0, state: 9 }));
    }

    newCharData.account_id = client.account.account_id;

    const creationResult = await CenterCommunication({
      operation: 'CHARACTER/NEW',
      data: newCharData,
    });

    console.log(creationResult);

    return [];
  } catch (err) {
    return client.write(deleteCharResponse({ cid: 0, state: 6 }));
  }
};
