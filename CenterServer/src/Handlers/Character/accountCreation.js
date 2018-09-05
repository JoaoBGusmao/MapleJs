import { characterExists } from '../../Controllers/character';

export const nameCheck = async ({ name }) => {
  try {
    const exists = await characterExists(name);
    if (exists.error !== undefined) {
      throw new Error('Check error');
    }

    if (exists.success && exists.exist) {
      return { success: true, failedReason: 'ALREADY_EXISTS' };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const nothing = () => {};
