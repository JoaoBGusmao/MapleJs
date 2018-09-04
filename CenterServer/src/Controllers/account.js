import md5 from 'md5';
import db from '../Models';

export const nothing = () => {};

export const auth = async (username, password) => {
  try {
    const hashPassword = md5(password);
    const userData = await db.accounts.findOne({
      attributes: ['account_id'],
      where: {
        username,
        password: hashPassword,
      },
    });

    if (userData === null) {
      throw new Error('Account not found');
    }

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
