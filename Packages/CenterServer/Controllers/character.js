import db from '../Models';

export const registerNewCharacter = async (charData) => {
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

  return newCharacterInformation;
};

export const characterExists = async (name) => {
  try {
    const userData = await db.characters.findOne({
      attributes: ['character_id'],
      where: {
        name,
      },
    });

    if (userData === null) {
      return { success: true, exist: false };
    }

    return { success: true, exist: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const getCharactersByAccountId = async (accountId) => {
  const characterList = await db.characters.findAll({
    where: {
      account_id: accountId,
    },
  });

  return characterList;
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
