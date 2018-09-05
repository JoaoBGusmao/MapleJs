import db from '../Models';

export const nothing = () => { };

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
