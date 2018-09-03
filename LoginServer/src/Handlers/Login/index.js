import recv from './recv';
import { LoginFailed } from './send';
import { askCenter } from '../../center';

export default async (reader, client) => {
  const data = recv(reader);

  console.log(data);

  console.log('Asking...');
  try {
    const loginResponse = await askCenter({
      model: 'ACCOUNT',
      operation: 'LOGIN_CHECK',
      data,
    });

    console.log(loginResponse);
  } catch (err) {
    // console.log('error', err);
  }
  console.log('got it');

  return client.write(LoginFailed({}));
};
