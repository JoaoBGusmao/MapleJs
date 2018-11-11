import recv from './recv';
import { askData } from '../../data';
import { CenterCommunication } from '../../center';
import deleteCharResponse from '../DeleteCharacter/send';
import addNewCharacter from './send';

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
 * - skin
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
  skin,
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
      && checkData(skin, genderData[3])
      && checkData(topWear, genderData[4])
      && checkData(bottomWear, genderData[5])
      && checkData(shoes, genderData[6])
      && checkData(weapon, genderData[7]));

    return hasValidSelection;
  } catch (err) {
    return false;
  }
};

const normalizeCharData = charData => ({
  account_id: charData.account_id,
  name: charData.name,
  gender: charData.gender,
  appearance: {
    face: charData.face,
    hair: charData.hair + charData.hairColor,
    skin: charData.skin,
  },
  equips: {
    shoes: charData.shoes,
    weapon: charData.weapon,
  },
});

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
      data: normalizeCharData(newCharData),
    });

    if (!creationResult.success) {
      throw new Error('Fail creating character');
    }

    return client.write(addNewCharacter({
      character: creationResult.newCharacterInformation,
    }));
  } catch (err) {
    return client.write(deleteCharResponse({ cid: 0, state: 6 }));
  }
};
