import md5 from 'md5';
import { getAccount } from '../../Controllers/account';

export default async ({ username, password }) => {
  try {
    const doAuth = await getAccount(username);

    if (!doAuth.success) {
      return { success: false, failedReason: 'LOGIN_NOT_FOUND' };
    }

    if (doAuth.account.password !== md5(password)) {
      return { success: false, failedReason: 'WRONG_PASSWORD' };
    }

    return { success: true, account: doAuth.account };
  } catch (error) {
    return { success: false, error };
  }
};
