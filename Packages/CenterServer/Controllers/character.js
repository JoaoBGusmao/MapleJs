import db from '../Models';

export const registerNewCharacter = async (charData) => {
  try {
    const insertCharacter = await db.characters.create({
      name: charData.name,
      account_id: charData.account_id,
      gender: charData.gender,
      face: charData.appearance.face,
      hair: charData.appearance.hair,
      skin: charData.appearance.skin,
    });

    const newCharacterInformation = await db.characters.findOne({
      where: { character_id: insertCharacter.character_id },
    });

    return { success: true, newCharacterInformation };
  } catch (err) {
    return { success: false, failedReason: 'UNKNOWN' };
  }
};

export const getCharactersByAccountId = async ({ accountId }) => {
  try {
    const characters = await db.characters.findAll({
      where: {
        account_id: accountId,
      },
    });

    return { success: true, characters };
  } catch (err) {
    return { success: false };
  }
};

export const getCharacterById = async ({ characterId }) => {
  try {
    const character = await db.characters.findOne({
      where: {
        character_id: characterId,
      },
    });

    if (character === null) {
      throw new Error('Character not found');
    }

    return character;
  } catch (err) {
    return null;
  }
};

export const deleteCharacter = async ({ characterId }) => {
  try {
    await db.characters.destroy({
      where: { character_id: characterId },
    });

    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

export const nameCheck = async ({ name }) => {
  try {
    const userData = await db.characters.findOne({
      attributes: ['character_id'],
      where: {
        name,
      },
    });

    if (userData !== null) {
      return { success: true, failedReason: 'ALREADY_EXISTS' };
    }

    return { success: true };
  } catch (err) {
    return { success: false, failedReason: 'UNKNOWN' };
  }
};
