import md5 from 'md5';
import db from '../Models';

export const nothing = () => {};

export const Auth = async ({ username, password }) => {
  try {
    const userData = await db.accounts.findOne({
      attributes: [
        'account_id',
        'username',
        'password',
        'PIC',
        'gender',
        'last_login',
      ],
      where: {
        username,
      },
    });

    if (userData === null) {
      return { success: false, failedReason: 'LOGIN_NOT_FOUND' };
    }

    if (userData.password !== md5(password)) {
      return { success: false, failedReason: 'WRONG_PASSWORD' };
    }

    return { success: true, account: userData };
  } catch (err) {
    return { success: false, failedReason: 'UNKNOWN' };
  }
};
