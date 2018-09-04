import db from '../Models';

export const nothing = () => {};

export const getAccount = async (username) => {
  try {
    const userData = await db.accounts.findOne({
      attributes: ['password', 'last_login'],
      where: {
        username,
      },
    });

    if (userData === null) {
      throw new Error('Account not found');
    }

    return { success: true, account: userData };
  } catch (error) {
    return { success: false, error };
  }
};
