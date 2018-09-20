import db from '../Models';

export const registerNewCharacter = async (charData) => {
  try {
    await db.characters.create({
      name: charData.name,
      account_id: charData.account_id,
    });

    return { sucess: true };
  } catch (error) {
    return { success: false, error };
  }
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
