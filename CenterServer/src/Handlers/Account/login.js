import { auth } from '../../Controllers/account';

export default async ({ username, password }) => {
  try {
    const doAuth = await auth(username, password);

    if (!doAuth.success) {
      throw new Error('Account not found');
    }

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
