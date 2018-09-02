import recv from './recv';
import { LoginFailed } from './send';

export default (reader, client) => {
  const data = recv(reader);

  console.log(data);

  return client.write(LoginFailed({}));
};
