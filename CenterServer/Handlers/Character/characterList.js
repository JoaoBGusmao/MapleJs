import { getCharactersByAccountId } from '../../Controllers/character';

export default async ({ accountId }) => {
  try {
    const characters = await getCharactersByAccountId(accountId);

    return { success: true, characters };
  } catch (error) {
    return { success: false, error };
  }
};
